import React, { useEffect, useState } from "react";
import "./GetAllTasksPage.css";
import { TaskModel } from "../../../models/TaskModel";
import jwtAxios from "../../../service/jwtAxios";
import notify, { ErrMsg, SccMsg } from "../../../service/NotificationService";
import globals from "../../../service/globals";
import Single from "../Single/Single";
import { TextField } from "@mui/material";
import { store } from "../../../redux/store";
import { downloadTask } from "../../../redux/TaskState";

const GetAllTasksPage = (): JSX.Element => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [searchText, setSearchText] = useState("");
    const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const getUserType = store.getState().authState.userType;
                const apiUrl = getUserType === "ADMIN" ? globals.urls.getAllTasks : globals.urls.getUserTasks;
                const response = await jwtAxios.get<TaskModel[]>(apiUrl);
                store.dispatch(downloadTask(response.data));
                setTasks(response.data || []);
            } catch (error) {
                notify.error(ErrMsg.UNEXPECTED_ERROR);
            }
        };

        fetchTasks();
    }, [refreshKey]); 

    const handleDelete = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    };

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="GetAllTasksPage">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField 
                    label="Search Tasks" 
                    variant="outlined" 
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ width: 300 }}
                />
            </div>
            {filteredTasks.length > 0 ? 
                filteredTasks.map(item => 
                    <Single key={item.id} task={item} onDelete={handleDelete} />
                ) : 
                <p>No tasks available.</p>}
        </div>
    );
};

export default GetAllTasksPage;
