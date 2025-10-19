package com.alma.consultorios.controllers;

import com.alma.consultorios.dtos.ConsultorioDTO;
import com.alma.consultorios.mappers.ConsultorioMapper;
import com.alma.consultorios.entities.Consultorio;
import com.alma.consultorios.entities.Consultorio.EstadoConsultorio;
import com.alma.consultorios.services.ConsultorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultorios")
@RequiredArgsConstructor
public class ConsultorioController {

    private final ConsultorioService service;
    private final ConsultorioMapper mapper;

    // 🔹 GET ALL
    @GetMapping
    public List<ConsultorioDTO> getAll() {
        return service.getAll().stream()
                .map(mapper::toDTO)
                .toList();
    }

    // 🔹 GET por número
    @GetMapping("/numero/{numero}")
    public List<ConsultorioDTO> getByNumero(@PathVariable Integer numero) {
        return service.getByNumero(numero).stream()
                .map(mapper::toDTO)
                .toList();
    }

    // 🔹 GET por ubicación
    @GetMapping("/ubicacion/{ubicacion}")
    public List<ConsultorioDTO> getByUbicacion(@PathVariable String ubicacion) {
        return service.getByUbicacion(ubicacion).stream()
                .map(mapper::toDTO)
                .toList();
    }

    // 🔹 GET por especialidad
    @GetMapping("/especialidad/{idEspecialidad}")
    public List<ConsultorioDTO> getByEspecialidad(@PathVariable Long idEspecialidad) {
        return service.getByEspecialidad(idEspecialidad).stream()
                .map(mapper::toDTO)
                .toList();
    }

    // 🔹 Cambiar estado genérico
    @PutMapping("/{id}/estado/{nuevoEstado}")
    public ResponseEntity<ConsultorioDTO> cambiarEstado(
            @PathVariable Long id,
            @PathVariable EstadoConsultorio nuevoEstado) {

        Consultorio actualizado = service.cambiarEstado(id, nuevoEstado);
        return ResponseEntity.ok(mapper.toDTO(actualizado));
    }

    // 🔹 Cambiar de DISPONIBLE → OCUPADO
    @PutMapping("/{id}/ocupar")
    public ResponseEntity<ConsultorioDTO> marcarOcupado(@PathVariable Long id) {
        Consultorio actualizado = service.marcarOcupado(id);
        return ResponseEntity.ok(mapper.toDTO(actualizado));
    }

    // 🔹 Cambiar de OCUPADO o FUERA_DE_SERVICIO → DISPONIBLE
    @PutMapping("/{id}/disponible")
    public ResponseEntity<ConsultorioDTO> marcarDisponible(@PathVariable Long id) {
        Consultorio actualizado = service.marcarDisponible(id);
        return ResponseEntity.ok(mapper.toDTO(actualizado));
    }

    // 🔹 Cambiar de DISPONIBLE → FUERA_DE_SERVICIO
    @PutMapping("/{id}/fuera-servicio")
    public ResponseEntity<ConsultorioDTO> marcarFueraDeServicio(@PathVariable Long id) {
        Consultorio actualizado = service.marcarFueraDeServicio(id);
        return ResponseEntity.ok(mapper.toDTO(actualizado));
    }
}
