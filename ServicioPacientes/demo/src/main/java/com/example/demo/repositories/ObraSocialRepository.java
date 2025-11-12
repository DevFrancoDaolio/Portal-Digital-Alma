package com.example.demo.repositories;

import com.example.demo.models.entities.ObraSocial;
import com.example.demo.models.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ObraSocialRepository  extends JpaRepository<ObraSocial, Long> {


}
