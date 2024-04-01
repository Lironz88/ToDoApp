import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify, { ErrMsg, SccMsg } from "../../../service/NotificationService";
import jwtAxios from "../../../service/jwtAxios";
import globals from "../../../service/globals";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useDispatch } from "../../../redux/useDispatch";
import { loginUser } from "../../../redux/AuthState";
import "./AddCustomer.css";
import { UserModel } from "../../../models/UserModel";

function AddUser(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();
    
    const send = async (userData: UserModel) => {
        try {
            const payload = {
                name: userData.name,
                email: userData.email.toLowerCase(), 
                password: userData.password.toLowerCase(), 
            };
            await jwtAxios.post(globals.urls.register, payload);
            notify.success(SccMsg.USER_SCC);
            navigate("/Login");;
        } catch (err) {
            console.error(err);
            notify.error(ErrMsg.ADD_USER);
        }
    };

    return (
        <div className="SolidBox"> 
            <Typography variant="h3" className="headline">Add Customer</Typography>
            <form onSubmit={handleSubmit(send)}>
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    fullWidth
                    {...register("name", { required: "Missing name" })} />
                <span>{errors.name?.message}</span>
                <br /><br />

                <TextField 
                    label="Email" 
                    variant="outlined" 
                    fullWidth
                    {...register("email", { required: "Missing Email" })} />
                <span>{errors.email?.message}</span>
                <br /><br />

                <TextField 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    fullWidth
                    {...register("password", { required: "Missing password" })} />
                <span>{errors.password?.message}</span>
                <br /><br />

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Add Customer</Button>
                </ButtonGroup>
            </form>
            <Button 
                variant="contained" 
                color="error" 
                style={{ marginTop: '10px' }} 
                onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
}

export default AddUser;
