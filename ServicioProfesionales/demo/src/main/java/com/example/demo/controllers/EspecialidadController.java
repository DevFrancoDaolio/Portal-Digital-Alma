package com.example.demo.controllers;

import com.example.demo.models.dto.EspecialidadDto;
import com.example.demo.services.EspecialidadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/especialidades")
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    @Autowired
    public EspecialidadController(EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }

    @GetMapping
    public ResponseEntity<List<EspecialidadDto>> listarEspecialidades() {
        return ResponseEntity.ok(especialidadService.obtenerTodas());
    }

    @PostMapping
    public ResponseEntity<EspecialidadDto> crearEspecialidad(@Valid @RequestBody EspecialidadDto dto) {
        EspecialidadDto creada = especialidadService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EspecialidadDto> actualizarEspecialidad(@PathVariable Long id,
                                                                  @Valid @RequestBody EspecialidadDto dto) {
        EspecialidadDto actualizada = especialidadService.actualizar(id, dto);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarEspecialidad(@PathVariable Long id) {
        especialidadService.eliminar(id);
        return ResponseEntity.ok("Especialidad eliminada correctamente");
    }
}
