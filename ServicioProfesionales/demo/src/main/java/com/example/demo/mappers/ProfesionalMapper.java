package com.example.demo.mappers;

import com.example.demo.models.dto.ProfesionalDto;
import com.example.demo.models.entities.Profesional;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")

public interface ProfesionalMapper {

    // Mapea Profesional → ProfesionalDto
    ProfesionalDto toDto(Profesional profesional);

    // Mapea ProfesionalDto → Profesional
    Profesional toEntity(ProfesionalDto dto);

    // Para mapear listas
    List<ProfesionalDto> toDtoList(List<Profesional> profesionales);

    List<Profesional> toEntityList(List<ProfesionalDto> dtos);
}

