package com.example.demo.repositories;

import com.example.demo.models.entities.TipoServicio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoServicioRepository extends CrudRepository<TipoServicio, Long> {
}
