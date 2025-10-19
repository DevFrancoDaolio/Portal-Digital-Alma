package com.alma.consultorios.dtos;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultorioDTO {

    private Long id;
    private Integer numero;
    private Integer piso;
    private String ubicacion;
    private String estado; // Se envía como String (DISPONIBLE, etc.)
    private List<Long> especialidadIds;
}

