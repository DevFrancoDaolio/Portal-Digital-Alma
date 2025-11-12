package com.example.demo.repositories;

import com.example.demo.models.entities.EspecialidadProfesional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EspecialidadProfesionalRepository extends JpaRepository<EspecialidadProfesional, Long> {


//    void deleteByProfesionalId(Long profesionalId);
    @Modifying
    @Query("DELETE FROM EspecialidadProfesional ep WHERE ep.profesional.id = :profesionalId")
    void deleteByProfesionalId(@Param("profesionalId") Long profesionalId);

    List<EspecialidadProfesional> findByProfesionalId(Long profesionalId);
}
