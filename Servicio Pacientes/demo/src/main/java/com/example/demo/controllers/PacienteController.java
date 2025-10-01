package com.example.demo.controllers;

import com.example.demo.models.dto.PacienteDto;
import com.example.demo.models.dto.PacienteResponseDto;
import com.example.demo.models.entities.Localidad;
import com.example.demo.models.entities.ObraSocial;
import com.example.demo.models.entities.Paciente;
import com.example.demo.models.entities.Provincia;

import com.example.demo.repositories.LocalidadRepository;
import com.example.demo.repositories.ObraSocialRepository;
import com.example.demo.repositories.ProvinciaRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService service;
    private final ProvinciaRepository provinciaRepo;
    private final LocalidadRepository localidadRepo;
    private final ObraSocialRepository obraSocialRepo;

    @Autowired
    public PacienteController(PacienteService service, ProvinciaRepository provinciaRepo, LocalidadRepository localidadRepo, ObraSocialRepository obraSocialRepo) {
        this.service = service;
        this.provinciaRepo = provinciaRepo;
        this.localidadRepo = localidadRepo;
        this.obraSocialRepo = obraSocialRepo;
    }

    @GetMapping
    public List<PacienteResponseDto> listar() {
        return service.listar().stream()
                .map(service::toResponseDto)
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public ResponseEntity<PacienteResponseDto> obtener(@PathVariable Long id) {
        Paciente paciente = service.obtenerPorId(id);
        if (paciente == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.toResponseDto(paciente));
    }

    @PostMapping
    public ResponseEntity<PacienteResponseDto> crear(@Valid @RequestBody PacienteDto dto) {
//        Provincia provincia = provinciaRepo.findById(dto.getProvinciaId()).orElseThrow();
        Provincia provincia = provinciaRepo.findById(dto.getProvinciaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provincia no encontrada"));
        Localidad localidad = localidadRepo.findById(dto.getLocalidadId()).orElseThrow();
        ObraSocial obraSocial = obraSocialRepo.findById(dto.getObraSocialId()).orElseThrow();

        Paciente paciente = service.toEntity(dto, provincia, localidad, obraSocial);
        Paciente guardado = service.guardar(paciente);

        PacienteResponseDto response = service.toResponseDto(guardado);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteResponseDto> actualizar(@PathVariable Long id, @Valid @RequestBody PacienteDto dto) {
        if (service.obtenerPorId(id) == null) {
            return ResponseEntity.notFound().build();
        }

        Provincia provincia = provinciaRepo.findById(dto.getProvinciaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provincia no encontrada"));
        Localidad localidad = localidadRepo.findById(dto.getLocalidadId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Localidad no encontrada"));
        ObraSocial obraSocial = obraSocialRepo.findById(dto.getObraSocialId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Obra social no encontrada"));

        Paciente paciente = service.toEntity(dto, provincia, localidad, obraSocial);
        paciente.setId(id); // importante para que actualice el existente

        Paciente actualizado = service.guardar(paciente);
        return ResponseEntity.ok(service.toResponseDto(actualizado));
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.obtenerPorId(id) == null) {
            return ResponseEntity.notFound().build();
        }
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

}
