package com.alma.profesionales.controllers;

import com.alma.profesionales.models.dto.ProfesionalDto;
import com.alma.profesionales.services.ProfesionalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
