package com.alma_centroteraupeutico.ServicioTurnos.repositories;

import com.alma_centroteraupeutico.ServicioTurnos.models.entities.Turno;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnoRepository extends CrudRepository<Turno, Long> {
    }
