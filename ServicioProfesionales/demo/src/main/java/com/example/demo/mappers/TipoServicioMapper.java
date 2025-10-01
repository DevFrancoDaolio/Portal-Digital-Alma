package com.example.demo.mappers;

import com.example.demo.models.dto.TipoServicioDto;
import com.example.demo.models.entities.TipoServicio;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoServicioMapper {
    TipoServicioDto toDto(TipoServicio servicio);
    TipoServicio toEntity(TipoServicioDto dto);
}

