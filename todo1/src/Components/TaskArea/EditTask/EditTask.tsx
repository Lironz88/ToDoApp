// UpdateTask.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import { TaskModel } from '../../../models/TaskModel';
import jwtAxios from '../../../service/jwtAxios';
import globals from '../../../service/globals';
import notify, { ErrMsg, SccMsg } from '../../../service/NotificationService';
import './EditTask.css';
import { format } from 'date-fns';

function UpdateTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const [task, setTask] = useState<TaskModel | undefined>(location.state?.task);

    useEffect(() => {
        if (!task) {
            console.error("Task data is missing");
            navigate(-1); 
        }
    }, [task, navigate]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : prevTask));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name;
        const value = parseInt(event.target.value, 10);
        setTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : prevTask));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (task) {
            const updatedTaskWithUserId = {
                ...task
            };

            try {
                const response = await jwtAxios.put(`${globals.urls.updateTask}`, updatedTaskWithUserId);
                notify.success(SccMsg.Task_UPDATE);
                navigate("/Main");
            } catch (error) {
                notify.error(ErrMsg.USER_UPDATE_FAILED);
            }
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className='Single Box'>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Title: {task.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Start Date: {task.startDate ? format(new Date(task.startDate), 'PPPp') : ''}
                </Typography>
                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    multiline
                    rows={4}
                    value={task.description || ''}
                    onChange={handleInputChange}
                    fullWidth
                /><br /><br />
                <TextField
                    label="End Date"
                    variant="outlined"
                    name="endDate"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={task.endDate || ''}
                    onChange={handleInputChange}
                    fullWidth
                /><br /><br />
                <FormControl fullWidth>
                    <InputLabel id="urgency-label">Urgency</InputLabel>
                    <Select
                        labelId="urgency-label"
                        value={task.urgency.toString()}
                        label="Urgency"
                        onChange={handleSelectChange}
                        name="urgency"
                    >
                        {[1, 2, 3, 4, 5].map((urgencyValue) => (
                            <MenuItem key={urgencyValue} value={urgencyValue.toString()}>{urgencyValue}</MenuItem>
                        ))}
                    </Select>
                </FormControl><br /><br />
                <Button type="submit" variant="contained" color="primary">
                    Update Task
                </Button>
            </form>
            <Button variant="contained" color="error" style={{ marginTop: '10px' }} onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
}

export default UpdateTask;
