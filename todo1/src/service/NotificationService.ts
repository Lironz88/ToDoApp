import { Notyf } from "notyf";
import { isExpressionWithTypeArguments } from "typescript";


export enum SccMsg {
    LOGIN_APPROVED = "Welcome!",
    USER_SCC = "User Added Succesfully, please login now",
    TASK_ADD = "Task added successfully",
    TASK_DELETE = "Task deleted sucsefully",
    Task_UPDATE = "Task updated sucsefully",
    USER_UPDATE_SUCCESS = "User updated Successfully",
    TASK_COMPLETED = "Task completed succesfully"
}


export enum ErrMsg {
    TASK_UPDATE = "Failed to update task",
    TASK_ADD = "Failed to add task",
    NO_LOGIN = "You must log in first",
    WRONG_LOGIN = "wrong email or password login failed",
    NOT_AUTHORIZED = "You are not authorized to view this page",
    FAILED_USER_DETAILS = "Failed to load user details",
    UNEXPECTED_ERROR = "An unexpected error occurred.",
    USER_UPDATE_FAILED = "Error updating user",
    TASK_NOT_COMPLETED = "TASK_NOT_COMPLETED",
    ADD_USER="user was not added",
    TASKS="Failed to load tasks. Please try again later.",
}



class Notify {
    private notification = new Notyf({ duration: 4000, position: { x: "center", y: "top" } });

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);  
    }

    private extractMsg(err: any): string {
        if (typeof err === 'string') {
            return err;
        }
        if (typeof err?.response?.data === 'string') {
            return err.response.data; 
        }
        if (Array.isArray(err?.response?.data)) {
            return err?.response?.data[0];
        }
        if (typeof err?.message === 'string') {
            return err.message;
        }
        return "Something doesn't work right...";
    }
}

const notify = new Notify();

export default notify;


