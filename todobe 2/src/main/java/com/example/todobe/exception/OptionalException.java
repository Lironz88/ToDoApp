package com.example.todobe.exception;

public class OptionalException extends Exception{

    public OptionalException(ErrMsg message){
        super(message.getMessage());
    }
}
