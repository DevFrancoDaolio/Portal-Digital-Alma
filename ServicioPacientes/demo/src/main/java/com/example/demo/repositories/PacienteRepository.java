package com.example.demo.repositories;

import com.example.demo.models.entities.Paciente;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByDni(String dni);

    List<Paciente> findByNombreContainingIgnoreCase(String nombre);

    boolean existsByDni(@NotBlank(message = "El DNI es obligatorio") String dni);

    boolean existsByEmail(@Email(message = "Email inválido") @NotBlank(message = "El email es obligatorio") String email);
}
