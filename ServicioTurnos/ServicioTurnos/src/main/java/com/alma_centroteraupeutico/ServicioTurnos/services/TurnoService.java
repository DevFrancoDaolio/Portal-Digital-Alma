package com.alma_centroteraupeutico.ServicioTurnos.services;


import com.alma_centroteraupeutico.ServicioTurnos.models.entities.Turno;
import com.alma_centroteraupeutico.ServicioTurnos.repositories.TurnoRepository;
import org.springframework.stereotype.Service;

@Service
public class TurnoService {
    private TurnoRepository turnoRepository;

    public Turno create(Turno turno){
        System.out.println("Guardando nuevo turno: " + turno);
        return turnoRepository.save(turno);
    }

    public Iterable<Turno> getAll() {
        return turnoRepository.findAll();
    }

}
