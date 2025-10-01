package com.example.demo.mappers;

import com.example.demo.models.dto.EspecialidadDto;
import com.example.demo.models.entities.Especialidad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EspecialidadMapper {
    EspecialidadDto toDto(Especialidad especialidad);
    Especialidad toEntity(EspecialidadDto dto);
}
