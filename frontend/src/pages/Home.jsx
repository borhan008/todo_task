import React, { useEffect, useState } from 'react'
import { Typography, Box, Button, Container, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import api from '../service/api';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Home() {
  const [dueDate, setDueDate] = useState("");
  const [task, setTask] = useState([]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!dueDate) {
      return;
    }
    const res = await api.get(`/todo/get?dueDate=${dueDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(res.data.todos);
    setTask(res.data.todos);
  };

  const handleMarkAsCompleted = async(todo) => {
    if(todo?._id){
     try {
      const res = await api.post(`/todo/update/${todo._id}`, {
        status: 'Completed',
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res.data);
      setTask(task.filter(task => task._id !== todo._id));
    } catch (error) {
      console.log(error);
     }
    }
    if(todo?.googleTaskID){
      console.log(todo);
     try {
      const res = await api.post(`/todo/update/google/${todo.taskListID}/${todo.googleTaskID}`, {
        status: 'Completed',
        id: todo.googleTaskID,
        taskListID: todo.taskListID,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTask(task.filter(task => task.googleTaskID !== todo.googleTaskID));
    } catch (error) {
      console.log(error);
     }
    }
  };

  const handleDelete = async(todo) => {
    if(todo?._id){
      try {
        const res = await api.delete(`/todo/delete/${todo._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res.data);
        setTask(task.filter(task => task._id !== todo._id));
      } catch (error) {
        console.log(error);
      }
    }
    if(todo?.googleTaskID){
      try {
        const res = await api.delete(`/todo/delete/google/${todo.taskListID}/${todo.googleTaskID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res.data);
        setTask(task.filter(task => task.googleTaskID !== todo.googleTaskID));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (

      <Container maxWidth="md">

        <Typography variant="h6" >
          Tasks
        </Typography>

       <Box component="form" onSubmit={handleSubmit} className='flex my-4 gap-4'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                inputProps={{
                  size: 'small',
                }}
                label="Due Date" 
                onChange={(newDate) => 
                  setDueDate(newDate.format('YYYY-MM-DD')) 
                }
                required
              />
            </LocalizationProvider>
            <Button type="submit" variant="contained" color="primary">Search</Button>
       </Box>


       {task.length > 0  && <>
        <Typography variant="h6">
            Due Tasks of {dueDate}
          </Typography>
        {task.map((todo) => (<>
          
          <Box key={todo._id || todo.googleTaskID} 
          className='py-4 px-2 flex justify-between hover:bg-gray-100'
          sx={
            {
              borderBottom: '1px solid #000',
             
            }
          }
          >
            <div>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography variant="body1">{todo.description}</Typography>
            </div>
            <div>
              <IconButton onClick={() => handleMarkAsCompleted(todo)}>
                <TaskAltIcon/>
              </IconButton>
              <IconButton onClick={() => handleDelete(todo)}>
                <DeleteIcon/>
              </IconButton>
            </div>
           
          </Box>
          </>
       ))}
       </>
       }
  
    </Container>
  )
}
