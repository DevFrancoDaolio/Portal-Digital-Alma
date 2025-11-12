package com.example.demo.controllers;

import com.example.demo.models.dto.PacienteDto;
import com.example.demo.models.dto.PacienteResponseDto;
import com.example.demo.models.entities.Paciente;
import com.example.demo.services.PacienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteService service;

    @Autowired
    public PacienteController(PacienteService service) {
        this.service = service;
        System.out.println(">>> PacienteController inicializado");
    }

    @GetMapping("/")
    public List<PacienteResponseDto> listar() {
        System.out.println(">>> PacienteController.listar() ejecutado");
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
    public ResponseEntity<?> crear(@Valid @RequestBody PacienteDto dto) {
        Paciente paciente = service.crearPaciente(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.toResponseDto(paciente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteResponseDto> actualizar(@PathVariable Long id, @Valid @RequestBody PacienteDto dto) {
        PacienteResponseDto response = service.actualizarPaciente(id, dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/buscar")
    public List<PacienteResponseDto> buscar(@RequestParam(required = false) String dni,
                                            @RequestParam(required = false) String nombre) {
        return service.buscar(dni, nombre).stream()
                .map(service::toResponseDto)
                .collect(Collectors.toList());
    }
}
