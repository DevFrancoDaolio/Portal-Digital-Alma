package com.example.demo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadDto {
    private Long id;
    private String nombre;
    private String descripcion;
    private List<Long> profesionales;

}
