package com.example.demo.repositories;

import com.example.demo.models.entities.Profesional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesionalRepository extends CrudRepository <Profesional, Long>{
}
