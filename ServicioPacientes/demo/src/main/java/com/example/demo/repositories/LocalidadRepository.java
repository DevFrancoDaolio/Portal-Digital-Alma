package com.example.demo.repositories;

import com.example.demo.models.entities.Localidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface LocalidadRepository extends JpaRepository<Localidad,Long> {
    List<Localidad> findByProvinciaId(Long provinciaId);
}
