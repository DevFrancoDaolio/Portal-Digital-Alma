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

    @Pattern(regexp = "^[0-9]{7,15}$", message = "El DNI debe tener entre 7 y 15 dígitos")
    @NotBlank(message = "El DNI es obligatorio")
    private String dni;


    @NotBlank(message = "El nombre es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$", message = "El nombre solo puede contener letras")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String nombre;


    @NotBlank(message = "El apellido es obligatorio")
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$", message = "El apellido solo puede contener letras")
    @Size(min = 2, max = 50, message = "El apellido debe tener entre 2 y 50 caracteres")
    private String apellido;

    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @Past(message = "Ingresar una fecha valida")
    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private LocalDate fechaNacimiento;

//    private String genero;


   // opcionales
    @Pattern(regexp = "^\\d{6,15}$", message = "El teléfono debe tener entre 6 y 15 dígitos")
    private String telefono;

    @Size(max = 50, message = "La calle no puede superar los 50 caracteres")
    private String calle;

    @Pattern(regexp = "^[0-9]+$", message = "Solo se permiten números")
    private String numero;

    @Pattern(regexp = "^\\d{4,6}$", message = "El código postal debe tener entre 4 y 6 dígitos")
    private String codigoPostal;

    @Size(max = 2, message = "El piso no puede superar los 2 caracteres")
    private String piso;

    @Size(max = 10, message = "El numero no puede superar los 10 caracteres")
    private String dpto;


    // obligatorios
    @NotNull(message = "La provincia es obligatoria")
    private Long provinciaId;

    @NotNull(message = "La Localidad es obligatoria")
    private Long localidadId;


    @NotNull(message = "La Obra social es obligatoria")
    private Long obraSocialId; // en caso de que no tenga obra social, secretaria debera seleccionar opcion "no especifica", pero siempre
    //se debe ingresar una obra social (se puede cambiar pero paja)

}
