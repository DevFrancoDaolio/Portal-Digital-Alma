package com.example.demo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PacienteResponseDto {

    private Long id;
    private String dni;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String email;
    private String telefono;

    private String calle;
    private String numero;
    private String codigoPostal;
    private String piso;
    private String dpto;

    private String provinciaNombre;
    private String localidadNombre;
    private String obraSocialNombre;
}
