package com.example.demo.models.mapper;

import com.example.demo.models.dto.*;
import com.example.demo.models.entities.Profesional;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProfesionalMapper {

    public ProfesionalResponseDto toResponseDto(Profesional profesional) {
        ProfesionalResponseDto dto = new ProfesionalResponseDto();

        dto.setId(profesional.getId());
        dto.setNombre(profesional.getNombre());
        dto.setApellido(profesional.getApellido());
        dto.setSexo(profesional.getSexo().toString());
        dto.setCuil(profesional.getCuil());
        dto.setEmail(profesional.getEmail());
        dto.setTelefono(profesional.getTelefono());

        dto.setCalle(profesional.getCalle());
        dto.setNumero(profesional.getNumero());
        dto.setCodigoPostal(profesional.getCodigoPostal());
        dto.setPiso(profesional.getPiso());
        dto.setDepartamento(profesional.getDepartamento());

        dto.setProvinciaNombre(profesional.getProvinciaNombre());
        dto.setLocalidadNombre(profesional.getLocalidadNombre());
        dto.setFotoUrl(profesional.getFotoUrl());
        dto.setActivo(profesional.isActivo());

        List<EspecialidadConMatriculaDtoResponse> especialidades = profesional.getEspecialidades().stream()
                .map(ep -> {
                    EspecialidadConMatriculaDtoResponse ed = new EspecialidadConMatriculaDtoResponse();
                    ed.setNombre(ep.getEspecialidad().getNombre());
                    ed.setMatricula(ep.getMatricula());
                    ed.setEsPrincipal(ep.isEsPrincipal());
                    return ed;
                }).toList();

        dto.setEspecialidades(especialidades);
        return dto;
    }

    public Profesional toEntity(ProfesionalRequestDto dto) {
        Profesional pr = new Profesional();

        pr.setNombre(dto.getNombre());
        pr.setApellido(dto.getApellido());
        pr.setSexo(dto.getSexo());
        pr.setCuil(dto.getCuil());
        pr.setEmail(dto.getEmail());
        pr.setTelefono(dto.getTelefono());

        pr.setCalle(dto.getCalle());
        pr.setNumero(dto.getNumero());
        pr.setCodigoPostal(dto.getCodigoPostal());
        pr.setPiso(dto.getPiso());
        pr.setDepartamento(dto.getDepartamento());

        pr.setProvinciaNombre(dto.getProvinciaNombre());
        pr.setLocalidadNombre(dto.getLocalidadNombre());
        pr.setFotoUrl(dto.getFotoUrl());

        return pr;
    }

    public void actualizarEntidadDesdeDto(Profesional profesional, ProfesionalRequestDto dto) {
        profesional.setNombre(dto.getNombre());
        profesional.setApellido(dto.getApellido());
        profesional.setCuil(dto.getCuil());
        profesional.setSexo(dto.getSexo());
        profesional.setEmail(dto.getEmail());
        profesional.setTelefono(dto.getTelefono());

        profesional.setCalle(dto.getCalle());
        profesional.setNumero(dto.getNumero());
        profesional.setCodigoPostal(dto.getCodigoPostal());
        profesional.setPiso(dto.getPiso());
        profesional.setDepartamento(dto.getDepartamento());

        profesional.setProvinciaNombre(dto.getProvinciaNombre());
        profesional.setLocalidadNombre(dto.getLocalidadNombre());
        profesional.setFotoUrl(dto.getFotoUrl());
    }
}
