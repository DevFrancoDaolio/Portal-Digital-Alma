package com.example.demo.models.dto;

import com.example.demo.models.entities.Profesional;
import jakarta.persistence.*;
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
    private Long profesional;
}
