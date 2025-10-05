package com.example.demo.controllers;
import com.example.demo.models.dto.ObraSocialDto;
import com.example.demo.repositories.ObraSocialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/obras-sociales")
public class ObraSocialController {

    @Autowired
    private ObraSocialRepository obraSocialRepository;

    @GetMapping
    public List<ObraSocialDto> listar() {
        return obraSocialRepository.findAll().stream()
                .map(o -> new ObraSocialDto(o.getId(), o.getNombre()))
                .collect(Collectors.toList());
    }
}
