package com.example.demo.exception;

public class LocalidadNotFoundException extends RuntimeException {
    public LocalidadNotFoundException(Long id) {
        super("Localidad no encontrada con ID: " + id);
    }
}