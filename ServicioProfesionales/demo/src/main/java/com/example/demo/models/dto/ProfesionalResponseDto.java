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

    // Ubicación (nombres en vez de entidades)
    private String provinciaNombre;
    private String localidadNombre;

    // Foto del profesional
    private String fotoUrl;

    // Especialidades con matrícula y principal
    private List<EspecialidadConMatriculaDtoResponse> especialidades;

    private Boolean activo;
}
