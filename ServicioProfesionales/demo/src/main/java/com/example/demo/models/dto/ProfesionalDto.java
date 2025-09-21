package com.example.demo.models.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfesionalDto {
    private Long id;
    private String nombre;
    private String email;
    private Integer telefono;
    private Long especialidad;
    private List<Long> servicios;
}
