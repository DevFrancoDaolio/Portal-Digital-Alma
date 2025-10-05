package com.example.demo.services;

import com.example.demo.exception.DuplicateFieldException;
import com.example.demo.models.dto.PacienteDto;
import com.example.demo.models.dto.PacienteResponseDto;
import com.example.demo.models.entities.Localidad;
import com.example.demo.models.entities.ObraSocial;
import com.example.demo.models.entities.Paciente;
import com.example.demo.models.entities.Provincia;
import com.example.demo.repositories.LocalidadRepository;
import com.example.demo.repositories.ObraSocialRepository;
import com.example.demo.repositories.PacienteRepository;
import com.example.demo.repositories.ProvinciaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PacienteService {


    @Autowired
    private PacienteRepository repo;
    @Autowired
    private  ProvinciaRepository provinciaRepo;
    @Autowired
    private  LocalidadRepository localidadRepo;
    @Autowired
    private  ObraSocialRepository obraSocialRepo;
    @Autowired
    private PacienteMapper mapper;


    public List<Paciente> listar() {
        return repo.findAll();
    }

    public Paciente obtenerPorId(Long id) {
        return repo.findById(id).orElse(null);
    }



    public Paciente crearPaciente(PacienteDto dto) {


        if (repo.existsByDni(dto.getDni())) {
            throw new DuplicateFieldException("Ya existe un paciente con ese DNI");
        }

        if (repo.existsByEmail(dto.getEmail())) {
            throw new DuplicateFieldException("Ya existe un paciente con ese email");
        }

        Provincia provincia = provinciaRepo.findById(dto.getProvinciaId())
                .orElseThrow(() -> new EntityNotFoundException("Provincia no encontrada"));
        Localidad localidad = localidadRepo.findById(dto.getLocalidadId())
                .orElseThrow(() -> new EntityNotFoundException( "Localidad no encontrada"));
        ObraSocial obraSocial = obraSocialRepo.findById(dto.getObraSocialId())
                .orElseThrow(() -> new EntityNotFoundException( "Obra social no encontrada"));

        Paciente paciente = mapper.toEntity(dto, provincia, localidad, obraSocial);
        return repo.save(paciente);
    }

    public PacienteResponseDto actualizarPaciente(Long id, PacienteDto dto) {
        Paciente existente = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente no encontrado"));

        Provincia provincia = provinciaRepo.findById(dto.getProvinciaId())
                .orElseThrow(() -> new EntityNotFoundException("Provincia no encontrada"));
        Localidad localidad = localidadRepo.findById(dto.getLocalidadId())
                .orElseThrow(() -> new EntityNotFoundException("Localidad no encontrada"));
        ObraSocial obraSocial = obraSocialRepo.findById(dto.getObraSocialId())
                .orElseThrow(() -> new EntityNotFoundException("Obra social no encontrada"));

        Paciente paciente = mapper.toEntity(dto, provincia, localidad, obraSocial);
        paciente.setId(id); // importante para actualizar
        Paciente actualizado = repo.save(paciente);
        return mapper.toResponseDto(actualizado);
    }


//    public void eliminar(Long id) {
//        repo.deleteById(id);
//    }


    // metodo para convertir de DTO a entidad
    public Paciente toEntity(PacienteDto dto, Provincia p, Localidad l, ObraSocial o) {
        return mapper.toEntity(dto, p, l, o);
    }

    //metodo para convertir de entidad a DTO
    public PacienteResponseDto toResponseDto(Paciente paciente) {
        return mapper.toResponseDto(paciente);
    }

    public List<Paciente> buscar(String dni, String nombre) {
        if (dni != null) return repo.findByDni(dni);
        if (nombre != null) return repo.findByNombreContainingIgnoreCase(nombre);
        return List.of();
    }




}
