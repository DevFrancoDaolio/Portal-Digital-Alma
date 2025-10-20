
package com.alma.consultorios.dtos;

import lombok.*;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HorarioDTO {
    private Long id;
    private String dia;       // Enum DiaSemana mapeado como String
    private String horaInicio; // LocalTime mapeado como String "HH:mm"
    private String horaFin;    // LocalTime mapeado como String "HH:mm"
}
