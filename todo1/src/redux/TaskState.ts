import { act } from "react-dom/test-utils";
import { TaskModel } from "../models/TaskModel";

export class TaskState{
    task: TaskModel[]=[]
}

export enum taskActionType{
    downloadTasks = "downloadTasks",
    deleteTask= "deleteTask",
    updateTask= "updateTask",
    addTask="addTask",
    removeAllTasks= "removeAllTasks",
}

export interface tasksAction{
    type: taskActionType,
    payload?:any,
}

export function downloadTask(tasks: TaskModel[]):tasksAction{
    return {type: taskActionType.downloadTasks, payload:tasks}
}

export function deleteTask(taskId: number):tasksAction{
    return{ type: taskActionType.deleteTask, payload:taskId}
}

export function addTask(task: TaskModel):tasksAction{
    return{type: taskActionType.addTask, payload:task}
}

export function removeAllTasks():tasksAction{
    return{type: taskActionType.removeAllTasks}
}

export function updateTask(task: TaskModel):tasksAction{
    return{type: taskActionType.updateTask, payload:task}
}

export function TaskReducer (currentState: TaskState= new TaskState, action:tasksAction):TaskState{
    const newState = {...currentState};

    switch(action.type){
        
        case taskActionType.downloadTasks:
            newState.task = action.payload;
        break;
        
        case taskActionType.deleteTask:
            newState.task = newState.task.filter(item=>item.id!==action.payload);
        break;
        
        case taskActionType.updateTask:
            var updateCoupon = [...newState.task].filter(item=>item.id!==action.payload.id);
            updateCoupon.push(action.payload);
            newState.task = updateCoupon;
        break;
        
        case taskActionType.addTask:
            newState.task.push(action.payload);
        break;
        
        case taskActionType.removeAllTasks:
            newState.task = [];
        break;    
    }
    return newState;
}