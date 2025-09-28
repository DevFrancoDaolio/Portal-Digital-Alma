package com.example.demo.services;

import com.example.demo.models.dto.PacienteDto;
import com.example.demo.models.dto.PacienteResponseDto;
import com.example.demo.models.entities.Localidad;
import com.example.demo.models.entities.ObraSocial;
import com.example.demo.models.entities.Paciente;
import com.example.demo.models.entities.Provincia;
import com.example.demo.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {


    @Autowired
    private PacienteRepository repo;

    @Autowired
    private PacienteMapper mapper;


    public List<Paciente> listar() {
        return repo.findAll();
    }

    public Paciente obtenerPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Paciente guardar(Paciente paciente) {
        return repo.save(paciente);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }


    // metodo para convertir de DTO a entidad
    public Paciente toEntity(PacienteDto dto, Provincia p, Localidad l, ObraSocial o) {
        return mapper.toEntity(dto, p, l, o);
    }

    //metodo para convertir de entidad a DTO

    public PacienteResponseDto toResponseDto(Paciente paciente) {
        return mapper.toResponseDto(paciente);
    }



}
