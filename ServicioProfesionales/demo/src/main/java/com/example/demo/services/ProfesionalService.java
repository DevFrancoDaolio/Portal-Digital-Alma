package com.example.demo.services;

import com.example.demo.exception.*;
import com.example.demo.models.dto.EspecialidadConMatriculaDto;
import com.example.demo.models.dto.ProfesionalRequestDto;
import com.example.demo.models.dto.ProfesionalResponseDto;
import com.example.demo.models.entities.*;
import com.example.demo.models.mapper.ProfesionalMapper;
import com.example.demo.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProfesionalService {

    @Autowired private ProfesionalRepository profesionalRepository;
    @Autowired private EspecialidadRepository especialidadRepository;
    @Autowired private EspecialidadProfesionalRepository especialidadProfesionalRepository;
    @Autowired private ProfesionalMapper mapper;

    public ProfesionalResponseDto crearProfesional(ProfesionalRequestDto dto) {
        validarCuilUnico(dto.getCuil());
        validarEspecialidadesUnicas(dto.getEspecialidadesConMatricula());

        boolean tienePrincipal = dto.getEspecialidadesConMatricula().stream()
                .anyMatch(EspecialidadConMatriculaDto::isEsPrincipal);

        if (!tienePrincipal) {
            throw new IllegalArgumentException("Debe haber al menos una especialidad principal.");
        }

        Profesional profesional = mapper.toEntity(dto);
        Profesional guardado = profesionalRepository.save(profesional);
        guardarEspecialidades(guardado, dto.getEspecialidadesConMatricula());

        return mapper.toResponseDto(guardado);
    }

    public ProfesionalResponseDto actualizarProfesional(Long id, ProfesionalRequestDto dto) {
        Profesional existente = profesionalRepository.findById(id)
                .orElseThrow(() -> new ProfesionalNotFoundException(id));

        if (!existente.getCuil().equals(dto.getCuil())) {
            validarCuilUnico(dto.getCuil());
        }

        validarEspecialidadesUnicas(dto.getEspecialidadesConMatricula());

        boolean tienePrincipal = dto.getEspecialidadesConMatricula().stream()
                .anyMatch(EspecialidadConMatriculaDto::isEsPrincipal);

        if (!tienePrincipal) {
            throw new IllegalArgumentException("Debe haber al menos una especialidad principal.");
        }

        mapper.actualizarEntidadDesdeDto(existente, dto);

        especialidadProfesionalRepository.deleteByProfesionalId(id);
        guardarEspecialidades(existente, dto.getEspecialidadesConMatricula());

        Profesional actualizado = profesionalRepository.save(existente);
        return mapper.toResponseDto(actualizado);
    }

    public List<ProfesionalResponseDto> getAll() {
        return profesionalRepository.findAll().stream()
                .map(mapper::toResponseDto)
                .collect(Collectors.toList());
    }

    public ProfesionalResponseDto obtenerPorId(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new ProfesionalNotFoundException(id));
        return mapper.toResponseDto(profesional);
    }

    public void eliminarProfesional(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new ProfesionalNotFoundException(id));
        profesionalRepository.delete(profesional);
    }

    public List<ProfesionalResponseDto> buscar(String nombre, Long especialidadId, String provinciaNombre, String localidadNombre) {
        return profesionalRepository.buscarConFiltros(nombre, especialidadId, provinciaNombre, localidadNombre).stream()
                .map(mapper::toResponseDto)
                .collect(Collectors.toList());
    }

    private void guardarEspecialidades(Profesional profesional, List<EspecialidadConMatriculaDto> especialidades) {
        for (EspecialidadConMatriculaDto epDto : especialidades) {
            Especialidad especialidad = especialidadRepository.findById(epDto.getEspecialidadId())
                    .orElseThrow(() -> new EspecialidadNotFoundException(epDto.getEspecialidadId()));

            EspecialidadProfesional ep = new EspecialidadProfesional();
            ep.setProfesional(profesional);
            ep.setEspecialidad(especialidad);
            ep.setMatricula(epDto.getMatricula());
            ep.setEsPrincipal(epDto.isEsPrincipal());

            especialidadProfesionalRepository.save(ep);
        }
    }

    private void validarCuilUnico(String cuil) {
        if (profesionalRepository.existsByCuil(cuil)) {
            throw new DniDuplicadoException(cuil);
        }
    }

    private void validarEspecialidadesUnicas(List<EspecialidadConMatriculaDto> especialidades) {
        Set<Long> ids = new HashSet<>();
        for (EspecialidadConMatriculaDto dto : especialidades) {
            if (!ids.add(dto.getEspecialidadId())) {
                throw new EspecialidadDuplicadaException(dto.getEspecialidadId());
            }
        }
    }

    public void darBajaProfesional(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new ProfesionalNotFoundException(id));
        profesional.setActivo(false);
        profesionalRepository.save(profesional);
    }

    public List<ProfesionalResponseDto> getAllActivos() {
        return profesionalRepository.findAll().stream()
                .filter(Profesional::isActivo)
                .map(mapper::toResponseDto)
                .toList();
    }

    public void reactivarProfesional(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new ProfesionalNotFoundException(id));

        if (profesional.isActivo()) {
            throw new IllegalStateException("El profesional ya está activo.");
        }

        profesional.setActivo(true);
        profesionalRepository.save(profesional);
    }
}
