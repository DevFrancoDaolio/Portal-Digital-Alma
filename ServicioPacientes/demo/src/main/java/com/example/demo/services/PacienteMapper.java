package com.example.demo.services;

import com.example.demo.models.dto.PacienteDto;
import com.example.demo.models.dto.PacienteResponseDto;
import com.example.demo.models.entities.Localidad;
import com.example.demo.models.entities.ObraSocial;
import com.example.demo.models.entities.Paciente;
import com.example.demo.models.entities.Provincia;
import org.springframework.stereotype.Component;

@Component
public class PacienteMapper {
    // metodo para convertir de DTO a entidad
    public Paciente toEntity(PacienteDto dto, Provincia provincia, Localidad localidad, ObraSocial obraSocial) {
        Paciente p = new Paciente();
        p.setDni(dto.getDni());
        p.setNombre(dto.getNombre());
        p.setApellido(dto.getApellido());
        p.setFechaNacimiento(dto.getFechaNacimiento());
        p.setEmail(dto.getEmail());
        p.setTelefono(dto.getTelefono());
        p.setCalle(dto.getCalle());
        p.setNumero(dto.getNumero());
        p.setCodigoPostal(dto.getCodigoPostal());
        p.setPiso(dto.getPiso());
        p.setDpto(dto.getDpto());
        p.setProvincia(provincia);
        p.setLocalidad(localidad);
        p.setObraSocial(obraSocial);
        return p;
    }

    //metodo para convertir de entidad a DTO

    public PacienteResponseDto toResponseDto(Paciente paciente) {
        return new PacienteResponseDto(
                paciente.getId(),
                paciente.getDni(),
                paciente.getNombre(),
                paciente.getApellido(),
                paciente.getFechaNacimiento(),
                paciente.getEmail(),
                paciente.getTelefono(),
                paciente.getCalle(),
                paciente.getNumero(),
                paciente.getCodigoPostal(),
                paciente.getPiso(),
                paciente.getDpto(),
                paciente.getProvincia().getNombre(),
                paciente.getLocalidad().getNombre(),
                paciente.getObraSocial().getNombre()
        );
    }
}
