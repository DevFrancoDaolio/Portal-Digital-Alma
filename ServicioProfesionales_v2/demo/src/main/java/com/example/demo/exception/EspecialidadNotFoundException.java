package com.example.demo.exception;


public class EspecialidadNotFoundException extends RuntimeException {
    public EspecialidadNotFoundException(Long id) {
        super("Especialidad no encontrada con ID: " + id);
    }
}