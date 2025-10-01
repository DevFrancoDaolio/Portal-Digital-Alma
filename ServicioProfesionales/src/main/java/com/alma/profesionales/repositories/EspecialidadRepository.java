package com.alma.profesionales.repositories;

import com.alma.profesionales.models.entities.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadRepository extends JpaRepository<Especialidad,Long> {
}
