package com.example.demo.exception;

public class EspecialidadDuplicadaNombreException extends RuntimeException{
    public EspecialidadDuplicadaNombreException(String nombre) {
        super("La especialidad '" + nombre + "' ya existe.");
    }
}
