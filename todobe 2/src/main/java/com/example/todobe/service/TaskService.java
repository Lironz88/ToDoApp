package com.example.todobe.service;

import com.example.todobe.beans.Task;
import com.example.todobe.exception.OptionalException;

import java.util.List;

public interface TaskService {
    public void addTask(Task task, String token);
    public void updateTask(Task task, String token);
    public void deletetask(int id) throws OptionalException;
    public List<Task> getTasksbyId(String token);
    public List<Task> getAllTasks(String token);
}
