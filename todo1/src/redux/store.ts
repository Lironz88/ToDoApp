import {configureStore} from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthState";
import {combineReducers} from 'redux';
import { TaskReducer } from "./TaskState";


const combine= combineReducers({
    authState:AuthReducer,
    taskState:TaskReducer,
  })
    
export const store = configureStore({
    reducer:combine,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        immutableCheck: false,
        serializablecheck: false,
    })
})
