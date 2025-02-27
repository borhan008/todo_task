const { google } = require("googleapis");
const Todo = require("../models/todo");
const User = require("../models/user");

const dotenv = require("dotenv");
const generateAccessToken = require("../utilities/generateAccessToken");
dotenv.config();

const getTodos = async (req, res) => {
  try {
    let dueDate = req.query.dueDate;

    let todos = await Todo.find(
      { userId: req.user._id, status: "Pending", dueDate: dueDate },
      {
        title: 1,
        description: 1,
        dueDate: 1,
        status: 1,
        _id: 1,
        googleTaskID: 1,
        taskListID: 1,
      }
    );

    if (req.user.googleId) {
      const accessToken = await generateAccessToken(req.user.refreshToken);
      if (accessToken) {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({
          access_token: accessToken,
        });
        const tasks = await google.tasks({
          version: "v1",
          auth: auth,
        });
        const taskLists = await tasks.tasklists.list();
        const tasksData = [];
        const dueDateConversion = new Date(dueDate);
        const startOfDay = new Date(dueDateConversion);
        startOfDay.setDate(dueDateConversion.getDate());
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(dueDateConversion);
        endOfDay.setDate(dueDateConversion.getDate() + 1);
        endOfDay.setUTCHours(23, 59, 59, 999);

        for (const taskList of taskLists.data.items) {
          const allTasks = await tasks.tasks.list({
            tasklist: taskList.id,
            showCompleted: false,
            dueMin: startOfDay,
            dueMax: endOfDay,
          });
          for (const task of allTasks.data.items) {
            if (
              todos.find(
                (todo) =>
                  todo.googleTaskID === task.id &&
                  todo.taskListID === taskList.id
              )
            ) {
            } else {
              tasksData.push({
                title: task.title,
                description: task.notes,
                dueDate: task.due,
                status: task.status,
                googleTaskID: task.id,
                taskListID: taskList.id,
              });
            }
          }
        }
        todos = [...todos, ...tasksData];
      }
    }

    return res.status(200).json({
      message: "Todos fetched successfully",
      todos: todos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Error while getting todos" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    let googleTaskID = null,
      taskListID = null;
    if (req.user.googleId) {
      const accessToken = await generateAccessToken(req.user.refreshToken);
      if (accessToken) {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({
          access_token: accessToken,
        });
        const tasks = await google.tasks({
          version: "v1",
          auth: auth,
        });

        const taskLists = await tasks.tasklists.list({
          maxResults: 1,
        });
        taskListID = taskLists.data.items[0].id;
        const task = await tasks.tasks.insert({
          tasklist: taskListID,
          requestBody: {
            title: title,
            notes: description,
            due: new Date(dueDate).toISOString(),
            status: "needsAction",
          },
        });
        googleTaskID = task.data.id;
      }
    }
    console.log(googleTaskID, taskListID);
    const todo = await Todo.create({
      title,
      description,
      dueDate,
      status,
      userId: req.user._id,
      googleTaskID: googleTaskID,
      taskListID: taskListID,
    });

    return res
      .status(200)
      .json({ message: "Todo created successfully", todo: todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Error while creating todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const findTodo = await Todo.findById(id);

    if (!findTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    console.log(findTodo);
    findTodo.status = status;
    await findTodo.save();

    return res
      .status(200)
      .json({ message: "Todo updated successfully", todo: findTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Error while updating todo" });
  }
};

const updateGoogleTodo = async (req, res) => {
  try {
    const { id, taskListID } = req.params;
    const { status } = req.body;
    if (req.user.googleId) {
      const accessToken = await generateAccessToken(req.user.refreshToken);
      if (accessToken) {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({
          access_token: accessToken,
        });
        const tasks = await google.tasks({
          version: "v1",
          auth,
        });
        console.log(taskListID, id);
        const task = await tasks.tasks.get({
          tasklist: taskListID,
          task: id,
        });
        const updatedTask = await tasks.tasks.update({
          tasklist: taskListID,
          task: id,
          requestBody: {
            ...task.data,
            status: "completed",
            completed: new Date().toISOString(),
          },
        });
        console.log(updatedTask);
      }
    }
    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Error while updating todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const findTodo = await Todo.findById(id);
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Error while deleting todo" });
  }
};

const deleteGoogleTodo = async (req, res) => {
  try {
    const { id, taskListID } = req.params;

    const auth = new google.auth.OAuth2();
    const accessToken = await generateAccessToken(req.user.refreshToken);
    auth.setCredentials({
      access_token: accessToken,
    });
    const tasks = await google.tasks({
      version: "v1",
      auth,
    });
    const deletedTodo = await tasks.tasks.delete({
      tasklist: taskListID,
      task: id,
    });

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Error while deleting todo" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  updateGoogleTodo,
  deleteTodo,
  deleteGoogleTodo,
};
