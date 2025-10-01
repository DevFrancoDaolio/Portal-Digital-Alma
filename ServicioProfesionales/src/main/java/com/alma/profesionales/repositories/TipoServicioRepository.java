package com.alma.profesionales.repositories;

import com.alma.profesionales.models.entities.TipoServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoServicioRepository extends JpaRepository<TipoServicio, Long> {
}
