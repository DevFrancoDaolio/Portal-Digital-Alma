package com.example.demo.services;

import com.example.demo.models.entities.Profesional;
import com.example.demo.models.entities.TipoServicio;
import com.example.demo.repositories.TipoServicioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoServicioService {

    @Autowired
    private TipoServicioRepository tipoServicioRepository;

    @Transactional
    public TipoServicio create(TipoServicio tipoServicio) throws Exception {
        System.out.println("Guardando Tipo Servicio: " + tipoServicio);
        return tipoServicioRepository.save(tipoServicio);
    }

    public Iterable<TipoServicio> getAll(){
        return tipoServicioRepository.findAll();
    }

}
