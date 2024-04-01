import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { Button } from "@mui/material";
import GetAllTasksPage from "../GetAllTasksPage/GetAllTasksPage";
import { store } from "../../../redux/store";

function LandingPage(): JSX.Element {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const currentUserType = store.getState().authState.userType;
        console.log('User Type:', currentUserType); 
        setUserType(currentUserType || '');
    }, []);

    const addTask = () => {
        navigate("/AddTask");
    };

    const getUserDetails = () => {
        navigate("/Details");
    };

    const buttonStyle = {
        width: '330px'
    };

    return (
        <div className="LandingPage">
            <br/>
            <Button variant="outlined" className="blackButton" sx={buttonStyle} onClick={addTask}>Add a Task</Button>
            {userType === 'CUSTOMER' && (
                <Button variant="outlined" className="blackButton" sx={buttonStyle} onClick={getUserDetails}>User Details</Button>
            )}
            <br/><br/>
            <GetAllTasksPage/>
        </div>
    );
}

export default LandingPage;
