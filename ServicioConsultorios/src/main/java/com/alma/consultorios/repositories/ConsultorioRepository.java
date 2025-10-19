package com.tuapp.consultorios.repository;

import com.alma.consultorios.entities.Consultorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultorioRepository extends JpaRepository<Consultorio, Long> {

    List<Consultorio> findByNumero(Integer numero);

    List<Consultorio> findByUbicacionContainingIgnoreCase(String ubicacion);

    List<Consultorio> findByEspecialidadIdsContaining(Long especialidadId);
}
