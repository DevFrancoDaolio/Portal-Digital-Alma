package com.example.demo.repositories;

import com.example.demo.models.entities.Especialidad;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadRepository extends CrudRepository<Especialidad,Long> {
}
