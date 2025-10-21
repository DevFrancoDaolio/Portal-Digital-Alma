
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
    private String estado; // String para mapear enum
    private List<Long> especialidadIds;
    private List<HorarioDTO> horarios; // lista de horarios
}


