package com.alma_centroteraupeutico.ServicioTurnos.services;

import com.alma_centroteraupeutico.ServicioTurnos.models.entities.EstadoTurno;
import com.alma_centroteraupeutico.ServicioTurnos.repositories.EstadoTurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoTurnoService {
    @Autowired
    private EstadoTurnoRepository estadoTurnoRepository;
    public EstadoTurno create(EstadoTurno estadoTurno){
        System.out.println("Guardando nuevo estado de turno: " + estadoTurno);
        return estadoTurnoRepository.save(estadoTurno);
    }

    public Iterable<EstadoTurno> getAll() {
        return estadoTurnoRepository.findAll();
    }


}
