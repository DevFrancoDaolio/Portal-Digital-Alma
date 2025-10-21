package com.alma.consultorios.repositories;

import com.alma.consultorios.entities.Consultorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultorioRepository extends JpaRepository<Consultorio, Long> {
    List<Consultorio> findByUbicacionContainingIgnoreCase(String ubicacion);
}
