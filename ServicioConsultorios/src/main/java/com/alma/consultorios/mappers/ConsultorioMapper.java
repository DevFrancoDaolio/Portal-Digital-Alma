package com.alma.consultorios.mappers;

import com.alma.consultorios.dtos.ConsultorioDTO;
import com.alma.consultorios.entities.Consultorio;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ConsultorioMapper {

    ConsultorioDTO toDTO(Consultorio consultorio);

    @Mapping(target = "horarios", ignore = true) // Se ignora por simplicidad
    Consultorio toEntity(ConsultorioDTO dto);
}
