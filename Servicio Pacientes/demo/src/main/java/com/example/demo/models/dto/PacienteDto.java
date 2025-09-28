package com.example.demo.models.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PacienteDto {

    @NotBlank(message = "El DNI es obligatorio")
    private String dni;



    @NotBlank(message = "El nombre es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$", message = "El nombre solo puede contener letras")
    private String nombre;


    @NotBlank(message = "El apellido es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$", message = "El nombre solo puede contener letras")
    private String apellido;

    @Email(message = "Email inválido")
    private String email;

    @Past(message = "La fecha debe ser anterior a hoy")
    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private LocalDate fechaNacimiento;

    @Pattern(regexp = "^\\d{6,15}$", message = "El teléfono debe tener entre 6 y 15 dígitos")
    private String telefono;


    private String calle;
    private String numero;
    private String codigoPostal;
    private String piso;
    private String dpto;

    private Long provinciaId;
    private Long localidadId;
    private Long obraSocialId;

}
