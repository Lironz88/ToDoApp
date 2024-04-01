package com.example.todobe.repository;

import com.example.todobe.beans.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRespository extends JpaRepository<Task,Integer> {
    List<Task> findByUserId(int userId);
    List<Task> findByTitleAndStartDate(String title, LocalDateTime startDate);
}
