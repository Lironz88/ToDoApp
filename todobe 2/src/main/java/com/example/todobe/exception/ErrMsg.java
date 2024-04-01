package com.example.todobe.exception;

public enum ErrMsg {
    DELETE_FAILED("task deletion failed"),
    LOGIN_FAILED("login failed, wrong email or password"),
    USER_EMAIL_EXISTS("user email already exists, use a differant email");
    private String message;
    private ErrMsg(
            String message){
        setMessage(message);
    }
    public String getMessage(){return message;}
    private void setMessage(String message){
        this.message=message;
    }
}
