package com.example.demo.repositories;

import com.example.demo.models.entities.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadRepository extends JpaRepository<Especialidad,Long> {

    boolean existsByNombreIgnoreCase(String nombre);

}
