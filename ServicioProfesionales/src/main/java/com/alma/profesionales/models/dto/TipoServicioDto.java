package com.alma.profesionales.models.dto;

import com.alma.profesionales.models.entities.Profesional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoServicioDto {

    private Long id;
    private String nombre;
    private Integer duracion; // en minutos
    private Double costo;
    private Profesional profesional;
}
