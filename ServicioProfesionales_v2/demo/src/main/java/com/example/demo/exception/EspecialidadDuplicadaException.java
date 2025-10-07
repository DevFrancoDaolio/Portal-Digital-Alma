package com.example.demo.exception;

public class EspecialidadDuplicadaException extends RuntimeException {
    public EspecialidadDuplicadaException(Long id) {
        super("Especialidad repetida con ID: " + id);
    }
}