package com.alma.profesionales.services;

import com.alma.profesionales.mappers.EspecialidadMapper;
import com.alma.profesionales.models.dto.EspecialidadDto;
import com.alma.profesionales.models.entities.Especialidad;
import com.alma.profesionales.repositories.EspecialidadRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadService {

    private final EspecialidadRepository especialidadRepository;
    private final EspecialidadMapper especialidadMapper;

    public EspecialidadService(EspecialidadRepository especialidadRepository,
                               EspecialidadMapper especialidadMapper) {
        this.especialidadRepository = especialidadRepository;
        this.especialidadMapper = especialidadMapper;
    }

    // Crear una nueva especialidad desde DTO
    public Especialidad newEspecialidad(EspecialidadDto dto) {
        Especialidad especialidad = especialidadMapper.toEntity(dto);
        return especialidadRepository.save(especialidad);
    }

    // Buscar especialidad por ID
    public Optional<Especialidad> findById(Long id) {
        return especialidadRepository.findById(id);
    }

    // Obtener todas las especialidades
    public List<EspecialidadDto> getAll() {
        return especialidadRepository.findAll().stream()
                .map(especialidadMapper::toDto)
                .toList();
    }
}

