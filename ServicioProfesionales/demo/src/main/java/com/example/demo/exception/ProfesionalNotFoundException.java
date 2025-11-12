package com.example.demo.exception;

public class ProfesionalNotFoundException extends RuntimeException {
    public ProfesionalNotFoundException(Long id) {
        super("Profesional no encontrado con ID: " + id);
    }
}