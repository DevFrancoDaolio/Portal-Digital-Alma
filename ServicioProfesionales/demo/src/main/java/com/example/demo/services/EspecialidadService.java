package com.example.demo.services;

import com.example.demo.models.dto.EspecialidadDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.repositories.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadService {

    @Autowired
    private EspecialidadRepository especialidadRepository;

    public Especialidad create(Especialidad especialidad){

        System.out.println("Guardando nueva especialidad: " + especialidad);
        return especialidadRepository.save(especialidad);
    }


    public Especialidad getById(Long id) throws Exception{
        return especialidadRepository.findById(id).orElseThrow(()->
                new Exception("No se encontro Especialidad"));
    }

    public Especialidad obtenerEspecialidadPorId(Long id) throws Exception{
        return especialidadRepository.findById(id).orElseThrow(()->
                new Exception("No se encontro especialidad " + id));
    }

    // Crear varias especialidades
    public Iterable<Especialidad> crearVarias(List<Especialidad> especialidades) {
        return especialidadRepository.saveAll(especialidades);
    }

    public Iterable<Especialidad> getAll() {
        return especialidadRepository.findAll();
    }
}
