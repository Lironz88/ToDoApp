package com.example.todobe.clr;

import com.example.todobe.beans.Task;
import com.example.todobe.beans.User;
import com.example.todobe.repository.UserRepository;
import com.example.todobe.repository.TaskRespository;
import com.example.todobe.service.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
@Order(2)
public class PopulateDbAfterBoot implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRespository taskRespository;
    @Override
    public void run(String... args) throws Exception {
        User user1 = User.builder()
                .name("Alice")
                .email("alice@example.com")
                .password("password1")
                .build();

        User user2 = User.builder()
                .name("Bob")
                .email("bob@example.com")
                .password("password2")
                .build();

        userRepository.saveAll(Arrays.asList(user1, user2));

        Task task1 = Task.builder()
                .title("Spring Boot Project")
                .description("Complete the Spring Boot project for the client.")
                .urgency(5)
                .startDate(DateTimeUtils.truncateToHour(LocalDateTime.now()))
                .endDate(DateTimeUtils.truncateToHour(LocalDateTime.now().plusDays(7)))
                .user(user1)
                .build();

        Task task2 = Task.builder()
                .title("Database Cleanup")
                .description("Clean up the legacy data in the database.")
                .urgency(3)
                .startDate(DateTimeUtils.truncateToHour(LocalDateTime.now().plusDays(1)))
                .endDate(DateTimeUtils.truncateToHour(LocalDateTime.now().plusDays(3)))
                .user(user1)
                .build();

        Task task3 = Task.builder()
                .title("Prepare Presentation")
                .description("Prepare the quarterly review presentation for the team.")
                .urgency(4)
                .startDate(DateTimeUtils.truncateToHour(LocalDateTime.now().plusDays(2)))
                .endDate(DateTimeUtils.truncateToHour(LocalDateTime.now().plusWeeks(1)))
                .user(user2)
                .build();


        taskRespository.saveAll(Arrays.asList(task1, task2, task3));
    }
}
