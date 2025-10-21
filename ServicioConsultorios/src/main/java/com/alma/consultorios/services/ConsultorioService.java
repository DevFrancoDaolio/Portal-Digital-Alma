package com.alma.consultorios.services;

import com.alma.consultorios.dtos.ConsultorioDTO;
import com.alma.consultorios.mappers.ConsultorioMapper;
import com.alma.consultorios.entities.Consultorio;
import com.alma.consultorios.entities.Consultorio.EstadoConsultorio;
import com.alma.consultorios.repositories.ConsultorioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultorioService implements IConsultorio {

    private final ConsultorioRepository repository;
    private final ConsultorioMapper mapper;

    @Override
    public ConsultorioDTO crearConsultorio(ConsultorioDTO dto) {
        Consultorio entidad = mapper.toEntity(dto);
        entidad.getHorarios().forEach(h -> h.setConsultorio(entidad)); // establecer relación bidireccional
        Consultorio guardado = repository.save(entidad);
        return mapper.toDTO(guardado);
    }

    @Override
    public ConsultorioDTO actualizarConsultorio(Long id, ConsultorioDTO dto) {
        Consultorio existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consultorio no encontrado con ID: " + id));

        Consultorio actualizado = mapper.toEntity(dto);
        actualizado.setId(id); // aseguramos que se actualice el existente
        actualizado.getHorarios().forEach(h -> h.setConsultorio(actualizado)); // mantener relación

        Consultorio guardado = repository.save(actualizado);
        return mapper.toDTO(guardado);
    }

    @Override
    public ConsultorioDTO marcarFueraDeServicio(Long id) {
        Consultorio consultorio = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consultorio no encontrado con ID: " + id));

        consultorio.setEstado(EstadoConsultorio.FUERA_DE_SERVICIO);
        Consultorio actualizado = repository.save(consultorio);
        return mapper.toDTO(actualizado);
    }

    @Override
    public List<ConsultorioDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConsultorioDTO> buscarPorUbicacion(String ubicacion) {
        return repository.findByUbicacionContainingIgnoreCase(ubicacion)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ConsultorioDTO obtenerPorId(Long id) {
        Consultorio consultorio = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consultorio no encontrado con ID: " + id));
        return mapper.toDTO(consultorio);
    }
}
