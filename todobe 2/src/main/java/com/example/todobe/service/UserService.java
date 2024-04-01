package com.example.todobe.service;

import com.example.todobe.beans.User;
import com.example.todobe.beans.UserType;
import com.example.todobe.exception.OptionalException;

public interface UserService {
    public void addUser(User user) throws OptionalException;
    public String login(String email, String password, UserType userType) throws OptionalException;
    public User getSingleUser(String token);
    public void updateUser(User user);
}
