package com.example.demo.models.entities;

import com.example.demo.models.enums.Sexo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PROFESIONAL")
public class Profesional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "foto_url")
    private String fotoUrl;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sexo sexo;

    @Column(nullable = false, unique = true)
    private String cuil;

    @Column
    private String email;

    @Column
    private String telefono;

    // Dirección
    @Column
    private String calle;

    @Column
    private String numero;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    @Column
    private String piso;

    @Column
    private String departamento;

    @Column(name = "provincia_nombre")
    private String provinciaNombre;

    @Column(name = "localidad_nombre")
    private String localidadNombre;

    // Especialidades con matrícula
    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<EspecialidadProfesional> especialidades = new ArrayList<>();

    @Column(name = "activo")
    private boolean activo= true;
}
