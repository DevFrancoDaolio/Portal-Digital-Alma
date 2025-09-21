package com.example.demo.controllers;

import com.example.demo.models.dto.EspecialidadDto;
import com.example.demo.models.dto.ProfesionalDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.models.entities.Profesional;
import com.example.demo.services.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/especialidades")
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    @Autowired
    public EspecialidadController(EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }


//    @PostMapping("/crearEspecialidades")
//    public ResponseEntity<EspecialidadDto> crearEspecialidad(@RequestBody Especialidad request){
//
//
//    }

    // Cargar las especialidades predeterminadas
    @PostMapping("/cargarEspecialidades")
    public ResponseEntity<List<EspecialidadDto>> cargarEspecialidadesPorDefecto() {
        List<Especialidad> lista = new ArrayList<>();
        lista.add(new Especialidad(null, "kinesiología", "Especialidad en kinesiología", new ArrayList<>()));
        lista.add(new Especialidad(null, "fonoaudiología", "Especialidad en fonoaudiología", new ArrayList<>()));
        lista.add(new Especialidad(null, "psiquiatría", "Especialidad en psiquiatría", new ArrayList<>()));
        lista.add(new Especialidad(null, "psicología", "Especialidad en psicología", new ArrayList<>()));
        lista.add(new Especialidad(null, "medicina general", "Especialidad en medicina general", new ArrayList<>()));
        lista.add(new Especialidad(null, "psicomotricidad", "Especialidad en psicomotricidad", new ArrayList<>()));

        Iterable<Especialidad> especialidades = especialidadService.crearVarias(lista);


//        List<EspecialidadDto> especialidadDtos = StreamSupport.stream(guardadas.spliterator(), false)
//                .map(e -> new EspecialidadDto(e.getId(), e.getNombre(), e.getDescripcion(),e.getProfesionales()))
//                .collect(Collectors.toList());

        List<EspecialidadDto> especialidadDtos = StreamSupport.stream(especialidades.spliterator(), false)
                .map(e -> {
                    List<Long> idsProfesionales = (e.getProfesionales() != null
                            ? e.getProfesionales()
                            : new ArrayList<>())
                            .stream()
                            .map(p -> ((Profesional) p).getId())
                            .collect(Collectors.toList());

                    return new EspecialidadDto(
                            e.getId(),
                            e.getNombre(),
                            e.getDescripcion(),
                            idsProfesionales
                    );
                })
                .collect(Collectors.toList());


        return ResponseEntity.status(HttpStatus.CREATED).body(especialidadDtos);
    }

    /**
    // Obtener todas las especialidades
    @GetMapping
    public ResponseEntity<Iterable<EspecialidadDto>> obtenerTodas() {

        try {
            Iterable<Especialidad> especialidades = especialidadService.getAll();

            List<EspecialidadDto> especialidadDtos = StreamSupport.stream(especialidades.spliterator(), false)
                    .map(e -> new EspecialidadDto(e.getId(), e.getNombre(), e.getDescripcion()))
                    .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.CREATED).body(especialidadDtos);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }

    }
    **/

    @GetMapping
    public ResponseEntity<Iterable<EspecialidadDto>> obtenerTodas() {

        try {
            Iterable<Especialidad> especialidades = especialidadService.getAll();

            List<EspecialidadDto> especialidadDtos = StreamSupport.stream(especialidades.spliterator(), false)
                    .map(e -> {
                        List<Long> idsProfesionales = (e.getProfesionales() != null
                                ? e.getProfesionales()
                                : new ArrayList<>())
                                .stream()
                                .map(p -> ((Profesional) p).getId())
                                .collect(Collectors.toList());

                        return new EspecialidadDto(
                                e.getId(),
                                e.getNombre(),
                                e.getDescripcion(),
                                idsProfesionales
                        );
                    })
                    .collect(Collectors.toList());


            return ResponseEntity.status(HttpStatus.CREATED).body(especialidadDtos);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }

    }
}
