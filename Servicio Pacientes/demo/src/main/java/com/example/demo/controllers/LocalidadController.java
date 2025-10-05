package com.example.demo.controllers;

import com.example.demo.models.dto.LocalidadDto;
import com.example.demo.repositories.LocalidadRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/localidades")
public class LocalidadController {

    @Autowired
    private LocalidadRepository localidadRepository;

    @GetMapping
    public List<LocalidadDto> listarPorProvincia(@RequestParam Long provinciaId) {
        return localidadRepository.findByProvinciaId(provinciaId).stream()
                .map(l -> new LocalidadDto(l.getId(), l.getNombre()))
                .collect(Collectors.toList());
    }
}
