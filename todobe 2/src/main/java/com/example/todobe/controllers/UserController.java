package com.example.todobe.controllers;

import com.example.todobe.beans.User;
import com.example.todobe.beans.UserDetails;
import com.example.todobe.exception.OptionalException;
import com.example.todobe.security.JwtUtil;
import com.example.todobe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*",allowedHeaders = "*")
@RequestMapping("/User")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDetails userDetails) throws OptionalException {
        String token= userService.login(userDetails.getEmail(),userDetails.getPass(),userDetails.getUserType());
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Authorization",token)
                .body(userDetails.getUserType()+" connected");
    }
    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody User user) throws OptionalException {
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    @GetMapping("/oneUser")
    public ResponseEntity<?> getSingleCustomer( @RequestHeader(name = "Authorization") String token) {
        jwtUtil.extractAllClaims(token);
        return ResponseEntity.ok(userService.getSingleUser(token));
    }
    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user, @RequestHeader(name = "Authorization") String token) {
        jwtUtil.extractAllClaims(token);
        userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
