package com.example.todobe.controllers;

import com.example.todobe.beans.Task;
import com.example.todobe.beans.UserType;
import com.example.todobe.exception.OptionalException;
import com.example.todobe.security.JwtUtil;
import com.example.todobe.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/task")
public class TaskController {

    private final JwtUtil jwtUtil;
    private final TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<Task> addTask(@RequestBody Task task, @RequestHeader(name = "Authorization") String token) {
        jwtUtil.extractAllClaims(token);
        taskService.addTask(task, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PutMapping("/updateTask")
    public ResponseEntity<Task> updateTask(@RequestBody Task task, @RequestHeader(name = "Authorization") String token) {
        jwtUtil.extractAllClaims(token);
        taskService.updateTask(task, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id, @RequestHeader(name = "Authorization") String token) throws OptionalException {
        jwtUtil.extractAllClaims(token);
        taskService.deletetask(id); // Ensure correct method name is deleteTask
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(@RequestHeader(name = "Authorization") String token) {
        jwtUtil.extractAllClaims(token);
        List<Task> tasks = taskService.getAllTasks(token); // Assuming getAllTasks returns a List<Task>
        return tasks.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(tasks);
    }

    @GetMapping("/usertasks")
    public ResponseEntity<List<Task>> getTasks(@RequestHeader(name = "Authorization") String token) {
        jwtUtil.extractAllClaims(token);
        List<Task> userTasks = taskService.getTasksbyId(token); // Assuming getTasksById returns a List<Task>
        return userTasks.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(userTasks);
    }
}
