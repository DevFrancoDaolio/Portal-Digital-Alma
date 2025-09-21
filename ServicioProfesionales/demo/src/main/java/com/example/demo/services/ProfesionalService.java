package com.example.demo.services;

import com.example.demo.models.dto.ProfesionalDto;
import com.example.demo.models.dto.TipoServicioDto;
import com.example.demo.models.entities.Especialidad;
import com.example.demo.models.entities.Profesional;
import com.example.demo.models.entities.TipoServicio;
import com.example.demo.repositories.ProfesionalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfesionalService {

    @Autowired
    private ProfesionalRepository profesionalRepository;


    public Profesional create(Profesional profesional){
        System.out.println("Guardando un nuevo profesional: " + profesional);
        return profesionalRepository.save(profesional);
    }

    public Iterable<Profesional> getAll(){
        return profesionalRepository.findAll();
    }

    public Profesional getById(Long id) throws Exception{
        return profesionalRepository.findById(id).orElseThrow(()->
                new Exception("No se encontro empleado"));
    }

    @Transactional
    public Profesional update(Long id, ProfesionalDto profesionalDetails) throws Exception {
        Profesional profesional = getById(id);

        if (profesionalDetails.getNombre() != null) {
            profesional.setNombre(profesionalDetails.getNombre());
        }
        if (profesionalDetails.getEmail() != null) {
            profesional.setEmail(profesionalDetails.getEmail());
        }
        if (profesionalDetails.getTelefono() != null) {
            profesional.setTelefono(profesionalDetails.getTelefono());
        }

        return profesionalRepository.save(profesional);

    }

    public void eliminarProfesional(Long id) {
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesional no encontrado con ID: " + id));
        profesionalRepository.delete(profesional);
    }

    @Transactional
    public Profesional agregarServicio(Long id, TipoServicio servicioNuevo) throws Exception {
//        Profesional profesional = getById(id);
        // Buscar profesional
        Profesional profesional = profesionalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesional no encontrado"));

        profesional.agregarServicio(servicioNuevo);
        return profesionalRepository.save(profesional);

    }


}
