package com.example.demo.controllers;

import com.example.demo.models.dto.ProfesionalDto;
import com.example.demo.models.dto.TipoServicioDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.models.entities.Profesional;
import com.example.demo.models.entities.TipoServicio;
import com.example.demo.services.EspecialidadService;
import com.example.demo.services.ProfesionalService;
import com.example.demo.services.TipoServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/profesionales")
public class ProfesionalController {

    private final ProfesionalService profesionalService;
    private final EspecialidadService especialidadService;
    private final TipoServicioService tipoServicioService;

    @Autowired
    public ProfesionalController(ProfesionalService profesionalService, EspecialidadService especialidadService, TipoServicioService tipoServicioService) {
        this.profesionalService = profesionalService;
        this.especialidadService = especialidadService;
        this.tipoServicioService = tipoServicioService;
    }





    @PostMapping("/nuevoProfesional")
    public ResponseEntity<?> crearProfesional(@RequestBody ProfesionalDto request) {
        try {
            // 1. Buscar especialidad por id, falta validacion excepcion
            Especialidad especialidad = especialidadService.obtenerEspecialidadPorId(request.getEspecialidad());

            // 2. Crear objeto Profesional
            Profesional profesional = new Profesional();
            profesional.setNombre(request.getNombre());
            profesional.setEmail(request.getEmail());
            profesional.setTelefono(request.getTelefono());
            profesional.setEspecialidad(especialidad);

            // Inicializar lista de servicios vacía si es null
            profesional.setServicios(new ArrayList<>());

            // 3. Guardar en base de datos
            Profesional guardado = profesionalService.create(profesional);

            // 4. Devolver respuesta
            return ResponseEntity.status(HttpStatus.CREATED).body(guardado);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al crear profesional: " + e.getMessage());
        }
    }

    /**
    @GetMapping
    public ResponseEntity<Iterable<ProfesionalDto>> getAllProfesionales(){
        try {
            Iterable<Profesional> todosProfesionales = profesionalService.getAll();

            List<ProfesionalDto> profesionalDtos = StreamSupport.stream(todosProfesionales.spliterator(), false)
                    .map(p -> new ProfesionalDto(p.getId(), p.getNombre(), p.getEmail(), p.getTelefono(), p.getEspecialidad().getId(),p.getServicios()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(profesionalDtos);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }
    }
     **/



    @GetMapping
    public ResponseEntity<Iterable<ProfesionalDto>> getAllProfesionales(){
        try {
            Iterable<Profesional> todosProfesionales = profesionalService.getAll();

            List<ProfesionalDto> profesionalDtos = StreamSupport.stream(todosProfesionales.spliterator(), false)
                    .map(p -> {
                        List<Long> idsServicios = (p.getServicios() != null ? p.getServicios(): new ArrayList<>())
                                .stream()
                                .map( t -> ((TipoServicio) t).getId()) // obtener solo el id
                                .collect(Collectors.toList());

                        return new ProfesionalDto(
                                p.getId(),
                                p.getNombre(),
                                p.getEmail(),
                                p.getTelefono(),
                                p.getEspecialidad().getId(),
                                idsServicios
                        );
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(profesionalDtos);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ProfesionalDto> actualizarProfesional(@PathVariable("id") Long id,
                                                       @RequestBody ProfesionalDto request
    ){
        try{
            Profesional profesionalActualizado = profesionalService.update(id, request);

            List<Long> listaServicios = profesionalActualizado.getServicios().stream().map(s->s.getId()).toList();
            ProfesionalDto profesionalDto = new ProfesionalDto(
                    profesionalActualizado.getId(),
                    profesionalActualizado.getNombre(),
                    profesionalActualizado.getEmail(),
                    profesionalActualizado.getTelefono(),
                    profesionalActualizado.getEspecialidad().getId(),
                    listaServicios
            );

            return ResponseEntity.ok(profesionalDto);

        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesionalDto> getProfesionalId(@PathVariable("id") Long id){
        try {
            Profesional pEncontrado = profesionalService.getById(id);

            List<Long> listaServicios = pEncontrado.getServicios().stream().map(s->s.getId()).toList();
            ProfesionalDto pDto = new ProfesionalDto(pEncontrado.getId(),pEncontrado.getNombre(),pEncontrado.getEmail(),pEncontrado.getTelefono(),pEncontrado.getEspecialidad().getId(), listaServicios);
            return ResponseEntity.ok(pDto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProfesional(@PathVariable Long id) {
        try {
            profesionalService.eliminarProfesional(id);
            return ResponseEntity.ok("Profesional eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error al eliminar profesional: " + e.getMessage());
        }
    }

    @PutMapping("/nuevo-servicio/{id}")
    public ResponseEntity<String> crearServicio(@PathVariable("id") Long id,
                                           @RequestBody TipoServicioDto request) {
        try{
//            Profesional pEncontrado = profesionalService.getById(id);

            TipoServicio tipoServicio = new TipoServicio();
            tipoServicio.setNombre(request.getNombre());
            tipoServicio.setDuracion(request.getDuracion());
            tipoServicio.setCosto(request.getCosto());
//            tipoServicio.setProfesional(pEncontrado);

            TipoServicio servicioGuardado = tipoServicioService.create(tipoServicio);
            Profesional profesionalActualizado = profesionalService.agregarServicio(id, servicioGuardado);
            return ResponseEntity.ok("Servicio Creado exitosamente");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error message:", e.getMessage())
                    .build();
        }
    }
}
