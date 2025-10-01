package com.alma.profesionales.models.dto;


import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfesionalDto {
    private Long id;
    @NotNull
    private String nombre;
    private String email;
    private Integer telefono;
    private List<EspecialidadDto> especialidades;
    private List<TipoServicioDto> servicios;
    private Boolean activo;
}
