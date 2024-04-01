// SingleUser.tsx
import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../models/UserModel";
import "./SingleUser.css";

interface SingleUserProps {
    user: UserModel;
}

function SingleUser({ user }: SingleUserProps): JSX.Element {
    const navigate = useNavigate();

    const updateUser = () => {
        navigate("/userUpdate", { state: { user } }); 
    };

    return (
        <div className="SingleCustomer SolidBox">
            <h2 style={{ textAlign: "center" }}>{user.id}</h2>
            <hr />
            {user.name}<br /><br />
            {user.email}<br /><br />
            {user.password}<br /><br />
            <ButtonGroup variant="contained" fullWidth>
                <Button color="warning" onClick={updateUser}>Edit User</Button>
            </ButtonGroup>
        </div>
    );
}

export default SingleUser;
