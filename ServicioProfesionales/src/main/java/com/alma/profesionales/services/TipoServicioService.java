package com.alma.profesionales.services;

import com.alma.profesionales.mappers.TipoServicioMapper;
import com.alma.profesionales.models.dto.TipoServicioDto;
import com.alma.profesionales.models.entities.TipoServicio;
import com.alma.profesionales.repositories.TipoServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoServicioService {

    private final TipoServicioRepository tipoServicioRepository;
    private final TipoServicioMapper tipoServicioMapper;

    public TipoServicioService(TipoServicioRepository tipoServicioRepository,
                               TipoServicioMapper tipoServicioMapper) {
        this.tipoServicioRepository = tipoServicioRepository;
        this.tipoServicioMapper = tipoServicioMapper;
    }

    // Crear un nuevo tipo de servicio desde DTO
    public TipoServicio newTipoServicio(TipoServicioDto dto) {
        TipoServicio servicio = tipoServicioMapper.toEntity(dto);
        return tipoServicioRepository.save(servicio);
    }

    // Buscar servicio por ID
    public Optional<TipoServicio> findById(Long id) {
        return tipoServicioRepository.findById(id);
    }

    // Obtener todos los servicios
    public List<TipoServicioDto> getAll() {
        return tipoServicioRepository.findAll().stream()
                .map(tipoServicioMapper::toDto)
                .toList();
    }
}

