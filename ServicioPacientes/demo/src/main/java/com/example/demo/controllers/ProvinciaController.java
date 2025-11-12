package com.example.demo.controllers;

import com.example.demo.models.dto.ProvinciaDto;
import com.example.demo.repositories.ProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/provincias")
public class ProvinciaController {

    @Autowired
    private ProvinciaRepository provinciaRepository;

    @GetMapping
    public List<ProvinciaDto> listar() {
        return provinciaRepository.findAll().stream()
                .map(p -> new ProvinciaDto(p.getId(), p.getNombre()))
                .collect(Collectors.toList());
    }
}
