package com.alma.consultorios.controllers;

import com.alma.consultorios.dtos.ConsultorioDTO;
import com.alma.consultorios.services.ConsultorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultorios")
@RequiredArgsConstructor
public class ConsultorioController {

    private final ConsultorioService service;

    // -------------------- CREAR --------------------
    @PostMapping
    public ResponseEntity<ConsultorioDTO> crear(@RequestBody ConsultorioDTO dto) {
        ConsultorioDTO creado = service.crearConsultorio(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // -------------------- ACTUALIZAR --------------------
    @PutMapping("/{id}")
    public ResponseEntity<ConsultorioDTO> actualizar(
            @PathVariable Long id,
            @RequestBody ConsultorioDTO dto) {
        ConsultorioDTO actualizado = service.actualizarConsultorio(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    // -------------------- MARCAR FUERA DE SERVICIO --------------------
    @PutMapping("/{id}/fuera-de-servicio")
    public ResponseEntity<ConsultorioDTO> marcarFueraDeServicio(@PathVariable Long id) {
        ConsultorioDTO actualizado = service.marcarFueraDeServicio(id);
        return ResponseEntity.ok(actualizado);
    }

    // -------------------- LISTAR TODOS --------------------
    @GetMapping
    public ResponseEntity<List<ConsultorioDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    // -------------------- BUSCAR POR UBICACION --------------------
    @GetMapping("/buscar")
    public ResponseEntity<List<ConsultorioDTO>> buscarPorUbicacion(
            @RequestParam String ubicacion) {
        return ResponseEntity.ok(service.buscarPorUbicacion(ubicacion));
    }

    // -------------------- OBTENER POR ID --------------------
    @GetMapping("/{id}")
    public ResponseEntity<ConsultorioDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }
}
