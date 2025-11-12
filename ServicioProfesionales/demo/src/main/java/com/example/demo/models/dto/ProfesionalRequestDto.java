package com.example.demo.models.dto;

import com.example.demo.models.enums.Sexo;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;


import java.util.List;

@Data
public class ProfesionalRequestDto {

    @NotBlank(message = "El nombre es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$", message = "El nombre solo puede contener letras")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String nombre;


    @NotBlank(message = "El apellido es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$", message = "El apellido solo puede contener letras")
    @Size(min = 2, max = 50, message = "El apellido debe tener entre 2 y 50 caracteres")
    private String apellido;


    @Pattern(regexp = "^[0-9]+$", message = "Solo se permiten números")
    @Pattern(regexp = "^[0-9]{7,15}$", message = "El CUIL debe tener entre 7 y 15 dígitos")
    @NotBlank(message = "El DNI es obligatorio")
    private String cuil;

    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    // Sexo del profesional
    @NotNull(message = "El sexo es obligatorio")
    private Sexo sexo;


    @NotBlank(message = "El teléfono no puede estar vacío")
    @Pattern(regexp = "^\\d{6,15}$", message = "El teléfono debe tener entre 6 y 15 dígitos")
    @Pattern(regexp = "^[0-9]+$", message = "Solo se permiten números")
    private String telefono;

    // Dirección
    @Size(max = 50, message = "La calle no puede superar los 50 caracteres")
    private String calle;

    @Pattern(regexp = "^[0-9]+$", message = "Solo se permiten números")
    private String numero;

    @Pattern(regexp = "^\\d{4,6}$", message = "El código postal debe tener entre 4 y 6 dígitos")
    private String codigoPostal;

    @Size(max = 2, message = "El piso no puede superar los 2 caracteres")
    private String piso;

    @Size(max = 10, message = "El numero no puede superar los 10 caracteres")
    private String departamento;

    // IDs de relaciones
    @NotNull(message = "La provincia es obligatoria")
    private Long provinciaId;

    @NotNull(message = "La Localidad es obligatoria")
    private Long localidadId;

    // Especialidades con matrícula
    @NotEmpty(message = "Debe agregar al menos una especialidad")
    @Valid
    private List<@NotNull(message = "La especialidad no puede ser nula")EspecialidadConMatriculaDto> especialidadesConMatricula;
}
