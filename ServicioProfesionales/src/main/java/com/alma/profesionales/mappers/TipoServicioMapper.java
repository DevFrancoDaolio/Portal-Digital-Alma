package com.alma.profesionales.mappers;

import com.alma.profesionales.models.dto.TipoServicioDto;
import com.alma.profesionales.models.entities.TipoServicio;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoServicioMapper {
    TipoServicioDto toDto(TipoServicio servicio);
    TipoServicio toEntity(TipoServicioDto dto);
}

