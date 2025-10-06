package com.example.demo.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class EspecialidadConMatriculaDto {
    @NotNull(message = "Debe seleccionar una especialidad")
    private Long especialidadId;

    @NotBlank(message = "La matrícula no puede estar vacía")
    private String matricula;
}
