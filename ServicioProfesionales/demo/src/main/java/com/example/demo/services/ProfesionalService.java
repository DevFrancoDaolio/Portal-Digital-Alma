package com.example.demo.services;

import com.example.demo.mappers.EspecialidadMapper;
import com.example.demo.mappers.TipoServicioMapper;
import com.example.demo.mappers.ProfesionalMapper;
import com.example.demo.models.dto.ProfesionalDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.models.entities.Profesional;
import com.example.demo.models.entities.TipoServicio;
import com.example.demo.repositories.ProfesionalRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfesionalService {

    private final ProfesionalRepository profesionalRepository;
    private final ProfesionalMapper profesionalMapper;
    private final EspecialidadMapper especialidadMapper;
    private final TipoServicioMapper tipoServicioMapper;

    public ProfesionalService(ProfesionalRepository profesionalRepository,
                              ProfesionalMapper profesionalMapper,
                              EspecialidadMapper especialidadMapper,
                              TipoServicioMapper tipoServicioMapper) {
        this.profesionalRepository = profesionalRepository;
        this.profesionalMapper = profesionalMapper;
        this.especialidadMapper = especialidadMapper;
        this.tipoServicioMapper = tipoServicioMapper;
    }

    // Crear profesional
    public ProfesionalDto create(ProfesionalDto dto) {
        Profesional profesional = profesionalMapper.toEntity(dto);

        // Mapear especialidades
        if (dto.getEspecialidades() != null) {
            List<Especialidad> especialidades = dto.getEspecialidades().stream()
                    .map(especialidadMapper::toEntity)
                    .collect(Collectors.toList());
            profesional.setEspecialidades(especialidades);
        }

        // Mapear servicios
        if (dto.getServicios() != null) {
            List<TipoServicio> servicios = dto.getServicios().stream()
                    .map(tipoServicioMapper::toEntity)
                    .collect(Collectors.toList());
            profesional.setServicios(servicios);
        }

        Profesional guardado = profesionalRepository.save(profesional);
        return profesionalMapper.toDto(guardado);
    }

    // Actualizar profesional
    public ProfesionalDto update(Long id, ProfesionalDto dto) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesional no encontrado con ID: " + id));

        // Actualizar datos básicos
        profesional.setNombre(dto.getNombre());
        profesional.setEmail(dto.getEmail());
        profesional.setTelefono(dto.getTelefono());

        // Actualizar listas
        if (dto.getEspecialidades() != null) {
            List<Especialidad> especialidades = dto.getEspecialidades().stream()
                    .map(especialidadMapper::toEntity)
                    .collect(Collectors.toList());
            profesional.setEspecialidades(especialidades);
        }

        if (dto.getServicios() != null) {
            List<TipoServicio> servicios = dto.getServicios().stream()
                    .map(tipoServicioMapper::toEntity)
                    .collect(Collectors.toList());
            profesional.setServicios(servicios);
        }

        Profesional actualizado = profesionalRepository.save(profesional);
        return profesionalMapper.toDto(actualizado);
    }

    // Obtener profesional por ID
    public ProfesionalDto getByIdDto(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesional no encontrado con ID: " + id));
        return profesionalMapper.toDto(profesional);
    }
}

