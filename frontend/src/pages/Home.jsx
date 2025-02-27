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
          className='my-4 flex justify-between'
          sx={
            {
              borderBottom: '1px solid #000',
             
            }
          }
          >
            <div>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography variant="body1">{todo.description}</Typography>
            <Typography variant="body1">Time : {new Date(todo.dueDate).toLocaleTimeString()}</Typography>
            <Typography variant="body1">Status : {todo.status}</Typography>

            </div>
            <div>
              <IconButton>
                <TaskAltIcon/>
              </IconButton>
              <IconButton>
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
