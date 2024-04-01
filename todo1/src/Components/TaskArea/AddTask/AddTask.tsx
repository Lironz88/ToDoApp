import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import jwtAxios from '../../../service/jwtAxios';
import globals from '../../../service/globals';
import notify, { ErrMsg, SccMsg } from '../../../service/NotificationService'; 
import './AddTask.css'; 
import { TaskModel } from '../../../models/TaskModel';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<TaskModel>();
  const [urgency, setUrgency] = useState('');

  const handleUrgencyChange = (event: SelectChangeEvent) => {
    setUrgency(event.target.value as string);
  };

  const send = async (task: TaskModel) => {
    try {
      const response = await jwtAxios.post(globals.urls.addTask, task);
      console.log('Task Added:', response.data);
      notify.success(SccMsg.TASK_ADD);
      navigate("/Main"); 
    } catch (error) {
      notify.error(ErrMsg.TASK_ADD);
    }
  };

  const goBack = () => {
    navigate("/Main");
};

  return (
    <div className="AddTask SolidBox">
      <Typography variant="h4" className="HeadLine">Add Task</Typography>
      <form onSubmit={handleSubmit(send)}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <span>{errors.title.message}</span>}
        <br /><br />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <span>{errors.description.message}</span>}
        <br /><br />

        <FormControl fullWidth>
          <InputLabel id="urgency-label">Urgency</InputLabel>
          <Select
            labelId="urgency-label"
            value={urgency}
            label="Urgency"
            {...register("urgency", { required: "Urgency is required" })}
            onChange={handleUrgencyChange}
          >
            {[1, 2, 3, 4, 5].map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.urgency && <span>{errors.urgency.message}</span>}
        <br /><br />
        Start Date And Time
        <TextField
          type="datetime-local"
          variant="outlined"
          fullWidth
          {...register("startDate", { required: "Start date is required" })}
        />
        {errors.startDate && <span>{errors.startDate.message}</span>}
        <br /><br />
        End Date And Time
        <TextField
          type="datetime-local"
          variant="outlined"
          fullWidth
          {...register("endDate", { required: "End date is required" })}
        />
        {errors.endDate && <span>{errors.endDate.message}</span>}
        <br /><br />

        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">Add Task</Button>
        </ButtonGroup>
      </form>
      <br />
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
    </div>
  );
};

export default AddTask;
