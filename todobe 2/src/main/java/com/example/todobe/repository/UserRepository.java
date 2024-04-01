package com.example.todobe.repository;

import com.example.todobe.beans.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "SELECT u.id FROM todo.users u WHERE u.email = ?1 AND u.password = ?2", nativeQuery = true)
    Optional<Integer> findUserIdByEmailAndPassword(String email, String password);

    public abstract boolean existsByEmail(String email);
}
