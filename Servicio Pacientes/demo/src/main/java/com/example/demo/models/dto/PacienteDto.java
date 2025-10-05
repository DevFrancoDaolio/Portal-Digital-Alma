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
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @Past(message = "La fecha debe ser anterior a hoy")
    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private LocalDate fechaNacimiento;

    @Pattern(regexp = "^\\d{6,15}$", message = "El teléfono debe tener entre 6 y 15 dígitos")
    private String telefono;


    private String calle;

    @Pattern(regexp = "^[0-9]+$", message = "Solo se permiten números")
    private String numero;

    @Pattern(regexp = "^\\d{4,6}$", message = "El código postal debe tener entre 4 y 6 dígitos")
    private String codigoPostal;


    private String piso;
    private String dpto;

    @NotNull(message = "La provincia es obligatoria")
    private Long provinciaId;

    @NotNull(message = "La Localidad es obligatoria")
    private Long localidadId;


    @NotNull(message = "La Obra social es obligatoria")
    private Long obraSocialId; // en caso de que no tenga obra social, secretaria debera seleccionar opcion "no especifica", pero siempre
    //se debe ingresar una obra social (se puede cambiar pero paja)

}
