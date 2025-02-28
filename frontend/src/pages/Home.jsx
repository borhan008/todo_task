import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Container, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import api from "../service/api";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "./Loading";
import { toast } from "react-hot-toast";
export default function Home() {
  const [dueDate, setDueDate] = useState("");
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/todo/get?dueDate=${dueDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.todos);
      setTask(res.data.todos);
      setLoading(false);
      toast.success(`${res.data.todos.length} tasks found for ${dueDate}`);
    } catch (error) {
      setLoading(true);
      toast.error("Something went wrong");
    }
  };

  const handleMarkAsCompleted = async (todo) => {
    if (todo?._id) {
      setLoading(true);
      try {
        const res = await api.post(
          `/todo/update/${todo._id}`,
          {
            status: "Completed",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        setTask(task.filter((task) => task._id !== todo._id));
        setLoading(false);
        toast.success("Task marked as completed in ToDos");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong in ToDos");
      }
    }
    if (todo?.googleTaskID) {
      console.log(todo);
      setLoading(true);
      try {
        const res = await api.post(
          `/todo/update/google/${todo.taskListID}/${todo.googleTaskID}`,
          {
            status: "Completed",
            id: todo.googleTaskID,
            taskListID: todo.taskListID,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTask(task.filter((task) => task.googleTaskID !== todo.googleTaskID));
        setLoading(false);
        toast.success("Task marked as completed in Google Tasks");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong in Google Tasks");
      }
    }
  };

  const handleDelete = async (todo) => {
    if (todo?._id) {
      setLoading(true);
      try {
        const res = await api.delete(`/todo/delete/${todo._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setLoading(false);
        setTask(task.filter((task) => task._id !== todo._id));
        toast.success("Task deleted from ToDos");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong in ToDos");
      }
    }
    if (todo?.googleTaskID) {
      setLoading(true);
      try {
        const res = await api.delete(
          `/todo/delete/google/${todo.taskListID}/${todo.googleTaskID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        setLoading(false);
        setTask(task.filter((task) => task.googleTaskID !== todo.googleTaskID));
        toast.success("Task deleted from Google Tasks");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong in Google Tasks");
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="md">
          <Typography variant="h6">Tasks</Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex my-4 gap-4"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputProps={{
                  size: "small",
                }}
                label="Due Date"
                onChange={(newDate) => setDueDate(newDate.format("YYYY-MM-DD"))}
                required
              />
            </LocalizationProvider>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Box>

          {task.length > 0 && (
            <>
              <Typography variant="h6">Due Tasks of {dueDate}</Typography>
              {task.map((todo) => (
                <>
                  <Box
                    key={todo._id || todo.googleTaskID}
                    className="py-4 px-2 flex justify-between hover:bg-gray-100"
                    sx={{
                      borderBottom: "1px solid #000",
                    }}
                  >
                    <div>
                      <Typography variant="h6">{todo.title}</Typography>
                      <Typography variant="body1">
                        {todo.description}
                      </Typography>
                    </div>
                    <div>
                      <IconButton onClick={() => handleMarkAsCompleted(todo)}>
                        <TaskAltIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(todo)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Box>
                </>
              ))}
            </>
          )}
        </Container>
      )}
    </>
  );
}
