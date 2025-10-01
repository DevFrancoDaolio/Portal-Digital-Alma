package com.alma.profesionales.models.dto;

import com.alma.profesionales.models.entities.Profesional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadDto {
    private Long id;
    private String nombre;
    private String descripcion;
    private Profesional profesional;
    private String matricula;

}
