import { Container, Paper, Select, TextField, Button, Typography, Box, MenuItem, Divider, InputLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import api from "../service/api";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


export default function AddTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/todo/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4">Add Task</Typography>

        <Typography variant="body2" component="p" className="mb-4" >
          Evert field is required
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />
        <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="Due Date" 
              onChange={(newDate) => 
                setFormData({ ...formData, dueDate: newDate ? newDate.format('YYYY-MM-DD') : '' }) 
              }
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              name="status"
              labelId="status-label"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              fullWidth
            >
              <MenuItem value="Pending" >Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
