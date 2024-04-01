// Single.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskModel } from '../../../models/TaskModel';
import './Single.css';
import { Button } from '@mui/material';
import jwtAxios from "../../../service/jwtAxios"; 
import globals from '../../../service/globals';
import notify, { ErrMsg, SccMsg } from '../../../service/NotificationService';

interface SingleTaskProps {
    task: TaskModel;
    onDelete: () => void; // No arguments expected
}

function Single({ task, onDelete }: SingleTaskProps): JSX.Element {
    const navigate = useNavigate();

    const formatDateAndHour = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            hour12: true,
        }).format(date);
    };

    const updateTask = (): void => {
        navigate('/taskUpdate', { state: { task } });
    };

    const completeTask = async (): Promise<void> => {
        const isConfirmed = window.confirm("Are you sure you finished the task?");
        if (!isConfirmed) return;

        try {
            await jwtAxios.delete(`${globals.urls.deleteTask}/${task.id}`);
            notify.success(SccMsg.TASK_COMPLETED);
            onDelete(); 
        } catch (error) {
            console.error("Failed to delete task:", error);
            notify.error(ErrMsg.TASK_NOT_COMPLETED);
        }
    };

    return (
        <div className='Single Box'>
            <h3 className='Container' style={{ textAlign: 'center' }}>{task.title}</h3>
            <div className='Container'>
                <b>Urgency: {task.urgency}</b><br />
                <b>Start Date: {formatDateAndHour(task.startDate)}</b><br />
                <b>End Date: {formatDateAndHour(task.endDate)}</b><br />
                <b>Description: {task.description}</b><br />
            </div><br />
            <Button className="blackButton" onClick={updateTask}>Edit Task</Button>
            <Button color='primary' onClick={completeTask}>Mark as Complete</Button>
            <hr />
        </div>
    );
}

export default Single;
