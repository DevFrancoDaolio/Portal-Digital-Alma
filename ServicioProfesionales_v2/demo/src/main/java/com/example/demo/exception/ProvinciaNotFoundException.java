package com.example.demo.exception;

public class ProvinciaNotFoundException extends RuntimeException {
    public ProvinciaNotFoundException(Long id) {
        super("Provincia no encontrada con ID: " + id);
    }
}