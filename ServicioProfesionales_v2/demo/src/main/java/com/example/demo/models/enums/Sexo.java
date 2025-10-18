package com.example.demo.models.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Sexo {
    MASCULINO,
    FEMENINO,
    OTRO;


    @JsonCreator
    public static Sexo fromString(String value) {
        try {
            return Sexo.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Sexo inválido. Debe ser MASCULINO, FEMENINO u OTRO.");
        }
    }



}