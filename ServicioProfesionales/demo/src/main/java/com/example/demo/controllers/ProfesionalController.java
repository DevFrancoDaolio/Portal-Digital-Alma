package com.example.demo.controllers;

import com.example.demo.models.dto.ProfesionalRequestDto;
import com.example.demo.models.dto.ProfesionalResponseDto;
import com.example.demo.services.ProfesionalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/profesionales")
public class ProfesionalController {

    private final ProfesionalService service;

    @Autowired
    public ProfesionalController(ProfesionalService profesionalService) {
        this.service = profesionalService;
    }

    @PostMapping
    public ResponseEntity<ProfesionalResponseDto> crearProfesional(@Valid @RequestBody ProfesionalRequestDto requestDto) {
        ProfesionalResponseDto responseDto = service.crearProfesional(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<ProfesionalResponseDto>> getAllProfesionales() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesionalResponseDto> getProfesionalPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfesionalResponseDto> actualizarProfesional(@PathVariable Long id,
                                                                        @Valid @RequestBody ProfesionalRequestDto requestDto) {
        return ResponseEntity.ok(service.actualizarProfesional(id, requestDto));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> eliminarProfesional(@PathVariable Long id) {
//        service.eliminarProfesional(id);
//        return ResponseEntity.ok("Profesional eliminado correctamente");
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> darBaja(@PathVariable Long id) {
        service.darBajaProfesional(id);
        return ResponseEntity.ok("Profesional dado de baja correctamente.");
    }


    @GetMapping("/buscar")
    public ResponseEntity<List<ProfesionalResponseDto>> buscarProfesionales(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Long especialidadId,
            @RequestParam(required = false) Long provinciaId,
            @RequestParam(required = false) Long localidadId
    ) {
        return ResponseEntity.ok(service.buscar(nombre, especialidadId, provinciaId, localidadId));
    }

    @GetMapping("/activos")
    public ResponseEntity<List<ProfesionalResponseDto>> getActivos() {
        return ResponseEntity.ok(service.getAllActivos());
    }

    @PutMapping("/{id}/reactivar")
    public ResponseEntity<String> reactivarProfesional(@PathVariable Long id) {
        service.reactivarProfesional(id);
        return ResponseEntity.ok("Profesional reactivado correctamente.");
    }


}
