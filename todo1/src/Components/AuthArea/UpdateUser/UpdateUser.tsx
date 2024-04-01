// UpdateUser.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { UserModel } from "../../../models/UserModel";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../service/jwtAxios";
import globals from "../../../service/globals";
import notify, { ErrMsg, SccMsg } from "../../../service/NotificationService";

function UpdateUser() {
    const location = useLocation();
    const navigate = useNavigate();
    const userFromState = location.state?.user as UserModel | undefined;

    const [user, setUser] = useState<UserModel | undefined>(userFromState);
    const { register, handleSubmit } = useForm<UserModel>();

    useEffect(() => {
        if (!user) {
            navigate(-1);
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const send = (data: UserModel) => {
        try{ const response = jwtAxios.put(globals.urls.updateUser, user);
        notify.success(SccMsg.USER_UPDATE_SUCCESS);
        navigate("/Main"); 
      } catch (error) {
        notify.error(ErrMsg.USER_UPDATE_FAILED);
      }
    };

    if (!user) {
        return <div>Loading...</div>; 
    }

  const goBack = () => {
    navigate("/Main");
};

    return (
        <div className="SingleCustomer SolidBox">
            <form onSubmit={handleSubmit(send)} className="update-form">
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    fullWidth
                /><br /><br />
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                /><br /><br />
                <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    fullWidth
                /><br /><br />
                <Button type="submit" variant="contained" color="primary">
                    Update User
                </Button>
            </form>
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
        </div>
    );
}

export default UpdateUser;
