import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "../../../redux/useDispatch";
import { loginUser } from "../../../redux/AuthState";
import jwtAxios from "../../../service/jwtAxios";
import notify, { ErrMsg } from "../../../service/NotificationService";
import "./Login.css";
import globals from "../../../service/globals";
import axios from "axios";

interface LoginDetails {
  clientType: 'ADMIN' | 'CUSTOMER' | ''; 
  email: string;
  pass: string;
}

function Login(): JSX.Element {
  const { register, handleSubmit, formState: { errors }, control } = useForm<LoginDetails>({
    defaultValues: {
      clientType: '', 
      email: '',
      pass: ''
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const send = async (details: LoginDetails) => {
    const loginDetails = {
      ...details,
      email: details.email.toLowerCase(),
      pass: details.pass.toLowerCase(),
    };
    try {
      const response = await jwtAxios.post(globals.urls.login, loginDetails);
      const token = response.headers['Authorization'] || response.headers['authorization'];
      console.log("Received token:", token);
      dispatch(loginUser(token));
      navigate("/Main"); 
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        notify.error(ErrMsg.WRONG_LOGIN);
      } else {
        notify.error(ErrMsg.UNEXPECTED_ERROR);
      }
    }
  };

  return (
    <div className="login SolidBox">
      <Typography variant="h3" className="HeadLine">Login</Typography>
      <br /><br />
      <form onSubmit={handleSubmit(send)}>
        <Controller
          name="clientType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="clientType-label">Client Type</InputLabel>
              <Select
                {...field}
                labelId="clientType-label"
                label="Client Type"
                value={field.value || ''} 
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <br /><br />
        <TextField 
          label="Email" 
          variant="outlined"  
          className="TextBox" 
          fullWidth 
          {...register("email", {
            required: "Missing Email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          })}
        />
        <Typography variant="caption" color="error">{errors.email?.message}</Typography>
        <br /><br />
        <TextField 
          label="Password" 
          variant="outlined" 
          className="TextBox" 
          type="password" 
          fullWidth 
          autoComplete="current-password"
          {...register("pass", {
            required: "Missing password",
          })}
        />
        <Typography variant="caption" color="error">{errors.pass?.message}</Typography>
        <br /><br />
        <NavLink to="/AddUser">New user? Create account</NavLink>
        <br /><br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">Login</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default Login;
