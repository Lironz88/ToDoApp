import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import Button from "@mui/material/Button";
import { logOutUser } from "../../../redux/AuthState";
import "./LogoutButton.css";
import { removeAllTasks } from "../../../redux/TaskState";

function LogoutButton(): JSX.Element {
    const getState = store.getState().authState.userType;
    const navigate = useNavigate();

    const logOut = () => {
        store.dispatch(logOutUser());
        store.dispatch(removeAllTasks());
        navigate("/Login");
    };

    const checkIsLogin = () => {
        if (getState === '') {
            return (
                <div className="button-container">
                    <Button variant="contained" color="warning" onClick={() => navigate("/AddUser")}>Register</Button>
                </div>
            );   
        }
        return (
            <div className="button-container">
                <Button variant="contained" color="warning" onClick={logOut}>LogOut</Button>
            </div>
        );
    };

    return (
        <div className="myHeader botton-padding">
            {checkIsLogin()}
        </div>
    );
}

export default LogoutButton;
