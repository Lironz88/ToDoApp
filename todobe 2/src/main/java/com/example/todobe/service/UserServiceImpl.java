package com.example.todobe.service;

import com.example.todobe.beans.User;
import com.example.todobe.beans.UserDetails;
import com.example.todobe.beans.UserType;
import com.example.todobe.exception.ErrMsg;
import com.example.todobe.exception.OptionalException;
import com.example.todobe.repository.UserRepository;
import com.example.todobe.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public void addUser(User user) throws OptionalException {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new OptionalException(ErrMsg.USER_EMAIL_EXISTS);
        }
        userRepository.save(user);
    }
    public void updateUser(User user)  {
        userRepository.save(user);
    }

    public String login(String email, String password, UserType userType) throws OptionalException {
        Optional<Integer> userId = Optional.empty();
        UserDetails userDetails = null;

        switch (userType) {
            case ADMIN:
                if ("admin@admin.com".equals(email) && "admin".equals(password)) {
                    userId = Optional.of(1);
                    userDetails = new UserDetails(userType, email, password);
                }
                break;
            case CUSTOMER:
                userId = userRepository.findUserIdByEmailAndPassword(email, password);
                if (userId.isPresent() && userId.get() > 0) {
                    userDetails = new UserDetails(userType, email, password);
                }
                break;
        }

        if (userId.isPresent() && userId.get() > 0 && userDetails != null) {
            if (userType == UserType.ADMIN) {
                return jwtUtil.generateToken(userDetails);
            } else {
                return jwtUtil.generateTokenWithId(userDetails, userId.get());
            }
        } else {
            throw new OptionalException(ErrMsg.LOGIN_FAILED);
        }
    }

    public User getSingleUser(String token)  {
        int id=getCustomerIdFromToken(token);
         Optional<User> user= userRepository.findById(id);
         return user.get();
    }
    private int getCustomerIdFromToken(String token) {
        return jwtUtil.getIdFromToken(token);
    }
}