package com.example.demo.services;

import com.example.demo.exception.EspecialidadDuplicadaException;
import com.example.demo.exception.EspecialidadDuplicadaNombreException;
import com.example.demo.models.dto.EspecialidadDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.repositories.EspecialidadRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class EspecialidadService {

    @Autowired
    private EspecialidadRepository especialidadRepository;

    public List<EspecialidadDto> obtenerTodas() {
        return especialidadRepository.findAll().stream()
                .map(e -> new EspecialidadDto(e.getId(), e.getNombre(), e.getDescripcion()))
                .collect(Collectors.toList());
    }

    public EspecialidadDto crear(EspecialidadDto dto) {

        if (especialidadRepository.existsByNombreIgnoreCase(dto.getNombre())) {
            throw new EspecialidadDuplicadaNombreException(dto.getNombre());
        }
        Especialidad especialidad = new Especialidad();
        especialidad.setNombre(dto.getNombre());
        especialidad.setDescripcion(dto.getDescripcion());

        Especialidad guardada = especialidadRepository.save(especialidad);
        return new EspecialidadDto(guardada.getId(), guardada.getNombre(), guardada.getDescripcion());
    }

    public EspecialidadDto actualizar(Long id, EspecialidadDto dto) {
        Especialidad existente = especialidadRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Especialidad no encontrada"));

        existente.setNombre(dto.getNombre());
        existente.setDescripcion(dto.getDescripcion());
        Especialidad actualizada = especialidadRepository.save(existente);
        return new EspecialidadDto(actualizada.getId(), actualizada.getNombre(), actualizada.getDescripcion());
    }

    public void eliminar(Long id) {
        Especialidad existente = especialidadRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Especialidad no encontrada"));
        especialidadRepository.delete(existente);
    }
}
