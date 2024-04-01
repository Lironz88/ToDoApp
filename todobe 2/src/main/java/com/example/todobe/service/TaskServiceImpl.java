package com.example.todobe.service;

import com.example.todobe.beans.Task;
import com.example.todobe.beans.User;
import com.example.todobe.exception.ErrMsg;
import com.example.todobe.exception.OptionalException;
import com.example.todobe.repository.TaskRespository;
import com.example.todobe.repository.UserRepository;
import com.example.todobe.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRespository taskRespository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public TaskServiceImpl(TaskRespository taskRespository, UserRepository userRepository, JwtUtil jwtUtil) {
        this.taskRespository = taskRespository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public void addTask(Task task, String token) {
        task.setStartDate(DateTimeUtils.truncateToHour(task.getStartDate()));
        task.setEndDate(DateTimeUtils.truncateToHour(task.getEndDate()));
        int customerId = getCustomerIdFromToken(token);
        User user = userRepository.getReferenceById(customerId);
        task.setUser(user);
        taskRespository.save(task);
    }
    @Override
    public void updateTask(Task task, String token) {
        task.setEndDate(DateTimeUtils.truncateToHour(task.getEndDate()));
        List<Task> tasks = taskRespository.findByTitleAndStartDate(task.getTitle(),task.getStartDate());
        Task taskFromDB = tasks.get(0);
        task.setUser(taskFromDB.getUser());
            taskRespository.save(task);
    }
    @Override
    public void deletetask(int id) throws OptionalException {
        if (taskRespository.existsById(id)) {
            taskRespository.delete(taskRespository.getReferenceById(id));
        } else {
            throw new OptionalException(ErrMsg.DELETE_FAILED);
        }
    }

    @Override
    public List<Task> getTasksbyId(String token) {
        int userId = getCustomerIdFromToken(token);
        return taskRespository.findByUserId(userId);
    }

    @Override
    public List<Task> getAllTasks(String token) {
        return taskRespository.findAll();
    }

    private int getCustomerIdFromToken(String token) {
        return jwtUtil.getIdFromToken(token);
    }

    public static LocalDateTime truncateToHour(LocalDateTime dateTime) {
        return dateTime.truncatedTo(ChronoUnit.HOURS);
    }
}