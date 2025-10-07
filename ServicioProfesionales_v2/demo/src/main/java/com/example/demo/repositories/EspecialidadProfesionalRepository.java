package com.example.demo.repositories;

import com.example.demo.models.entities.EspecialidadProfesional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EspecialidadProfesionalRepository extends JpaRepository<EspecialidadProfesional, Long> {
    void deleteByProfesionalId(Long profesionalId);
    List<EspecialidadProfesional> findByProfesionalId(Long profesionalId);
}
