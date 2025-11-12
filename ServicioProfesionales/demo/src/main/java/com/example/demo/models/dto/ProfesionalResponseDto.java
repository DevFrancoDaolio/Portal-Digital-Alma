package com.example.demo.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProfesionalResponseDto {

    private Long id;
    private String nombre;
    private String apellido;
    private String sexo;
    private String cuil;
    private String email;
    private String telefono;


    // Dirección
    private String calle;
    private String numero;
    private String codigoPostal;
    private String piso;
    private String departamento;

    // Ubicación
    private String provincia;
    private String localidad;

    // Especialidades con matrícula
    private List<EspecialidadConMatriculaDtoResponse> especialidades;

    private Boolean activo;
}
