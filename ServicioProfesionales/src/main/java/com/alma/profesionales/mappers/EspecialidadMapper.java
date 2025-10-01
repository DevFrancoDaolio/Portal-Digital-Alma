package com.alma.profesionales.mappers;

import com.alma.profesionales.models.dto.EspecialidadDto;
import com.alma.profesionales.models.entities.Especialidad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EspecialidadMapper {
    EspecialidadDto toDto(Especialidad especialidad);
    Especialidad toEntity(EspecialidadDto dto);
}
