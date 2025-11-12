package com.example.demo.exception;

public class DniDuplicadoException extends RuntimeException {
    public DniDuplicadoException(String dni) {
        super("Ya existe un profesional con el DNI: " + dni);
    }
}