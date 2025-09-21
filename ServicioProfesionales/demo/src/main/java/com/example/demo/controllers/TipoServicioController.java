package com.example.demo.controllers;

import com.example.demo.models.dto.EspecialidadDto;
import com.example.demo.models.dto.TipoServicioDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.models.entities.Profesional;
import com.example.demo.models.entities.TipoServicio;
import com.example.demo.services.TipoServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/tipo-servicio")
public class TipoServicioController {

    private final TipoServicioService tipoServicioService;

    @Autowired
    public TipoServicioController(TipoServicioService tipoServicioService) {
        this.tipoServicioService = tipoServicioService;
    }


    @GetMapping
    public ResponseEntity<Iterable<TipoServicioDto>> obtenerTodas() {

        try {
            Iterable<TipoServicio> tiposServicios = tipoServicioService.getAll();

            List<TipoServicioDto> especialidadDtos = StreamSupport.stream(tiposServicios.spliterator(), false)
                    .map(e -> new TipoServicioDto(
                                e.getId(),
                                e.getNombre(),
                                e.getDuracion(),
                                e.getCosto(),
                                e.getProfesional().getId()
                        ))
                    .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.CREATED).body(especialidadDtos);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }

    }
}
