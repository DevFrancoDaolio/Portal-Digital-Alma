package com.example.demo.controllers;

import com.example.demo.models.dto.ProfesionalDto;
import com.example.demo.models.dto.TipoServicioDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.models.entities.Profesional;
import com.example.demo.models.entities.TipoServicio;
import com.example.demo.services.EspecialidadService;
import com.example.demo.services.ProfesionalService;
import com.example.demo.services.TipoServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/profesionales")
public class ProfesionalController {

    private final ProfesionalService profesionalService;

    public ProfesionalController(ProfesionalService profesionalService) {
        this.profesionalService = profesionalService;
    }

    @PostMapping("/nuevo")
    public ResponseEntity<ProfesionalDto> crearProfesional(@RequestBody ProfesionalDto dto) {
        ProfesionalDto creado = profesionalService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ProfesionalDto> actualizarProfesional(
            @PathVariable Long id,
            @RequestBody ProfesionalDto dto) {
        ProfesionalDto actualizado = profesionalService.update(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/activos")
    public ResponseEntity<List<ProfesionalDto>> getActivos() {
        return ResponseEntity.ok(profesionalService.getAllActivos());
    }

    @GetMapping("/todos")
    public ResponseEntity<List<ProfesionalDto>> getTodos() {
        return ResponseEntity.ok(profesionalService.getAllProfesionales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesionalDto> getProfesional(@PathVariable Long id) {
        ProfesionalDto dto = profesionalService.getByIdDto(id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> darBaja(@PathVariable Long id) {
        profesionalService.darBajaProfesional(id);
        return ResponseEntity.ok("Profesional dado de baja correctamente.");
    }
}
