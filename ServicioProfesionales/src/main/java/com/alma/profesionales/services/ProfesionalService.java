package com.alma.profesionales.services;

import com.alma.profesionales.mappers.ProfesionalMapper;
import com.alma.profesionales.models.dto.ProfesionalDto;
import com.alma.profesionales.models.entities.Especialidad;
import com.alma.profesionales.models.entities.Profesional;
import com.alma.profesionales.models.entities.TipoServicio;
import com.alma.profesionales.repositories.ProfesionalRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfesionalService {

    private final ProfesionalRepository profesionalRepository;
    private final ProfesionalMapper profesionalMapper;
    private final EspecialidadService especialidadService;
    private final TipoServicioService tipoServicioService;

    public ProfesionalService(ProfesionalRepository profesionalRepository,
                              ProfesionalMapper profesionalMapper,
                              EspecialidadService especialidadService,
                              TipoServicioService tipoServicioService) {
        this.profesionalRepository = profesionalRepository;
        this.profesionalMapper = profesionalMapper;
        this.especialidadService = especialidadService;
        this.tipoServicioService = tipoServicioService;
    }

    // Crear profesional
    public ProfesionalDto create(ProfesionalDto dto) {
        Profesional profesional = profesionalMapper.toEntity(dto);

        // Manejar especialidades (crear si no existen)
        if (dto.getEspecialidades() != null) {
            List<Especialidad> especialidades = dto.getEspecialidades().stream()
                    .map(espDto -> {
                        if (espDto.getId() != null) {
                            return especialidadService.findById(espDto.getId())
                                    .orElseThrow(() -> new RuntimeException("Especialidad no encontrada: " + espDto.getId()));
                        } else {
                            return especialidadService.newEspecialidad(espDto);
                        }
                    })
                    .toList();
            profesional.setEspecialidades(especialidades);
        }

        // Manejar servicios (crear si no existen)
        if (dto.getServicios() != null) {
            List<TipoServicio> servicios = dto.getServicios().stream()
                    .map(servDto -> {
                        if (servDto.getId() != null) {
                            return tipoServicioService.findById(servDto.getId())
                                    .orElseThrow(() -> new RuntimeException("Servicio no encontrado: " + servDto.getId()));
                        } else {
                            return tipoServicioService.newTipoServicio(servDto);
                        }
                    })
                    .toList();
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

        // Actualizar especialidades
        if (dto.getEspecialidades() != null) {
            List<Especialidad> especialidades = dto.getEspecialidades().stream()
                    .map(espDto -> {
                        if (espDto.getId() != null) {
                            return especialidadService.findById(espDto.getId())
                                    .orElseThrow(() -> new RuntimeException("Especialidad no encontrada: " + espDto.getId()));
                        } else {
                            return especialidadService.newEspecialidad(espDto);
                        }
                    })
                    .toList();
            profesional.setEspecialidades(especialidades);
        }

        // Actualizar servicios
        if (dto.getServicios() != null) {
            List<TipoServicio> servicios = dto.getServicios().stream()
                    .map(servDto -> {
                        if (servDto.getId() != null) {
                            return tipoServicioService.findById(servDto.getId())
                                    .orElseThrow(() -> new RuntimeException("Servicio no encontrado: " + servDto.getId()));
                        } else {
                            return tipoServicioService.newTipoServicio(servDto);
                        }
                    })
                    .toList();
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

    // Obtener todos los profesionales activos
    public List<ProfesionalDto> getAllActivos() {
        return profesionalRepository.findAll().stream()
                .filter(Profesional::isActivo)
                .map(profesionalMapper::toDto)
                .toList();
    }

    // Obtener todos los profesionales
    public List<ProfesionalDto> getAllProfesionales() {
        return profesionalRepository.findAll().stream()
                .map(profesionalMapper::toDto)
                .toList();
    }

    // Dar de baja un profesional
    public void darBajaProfesional(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesional no encontrado con ID: " + id));
        profesional.setActivo(false);
        profesionalRepository.save(profesional);
    }
}


