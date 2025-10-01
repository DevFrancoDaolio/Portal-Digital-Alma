package com.alma.profesionales.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "PROFESIONALES")
public class Profesional {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    private Long id;

    @Column(name="NOMBRE",nullable = false)
    private String nombre;

    @Column(name="EMAIL")
    private String email;

    @Column(name="TELEFONO")
    private int telefono;

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Especialidad> especialidades;

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TipoServicio> servicios;

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL)
    private List<HorarioProfesional> horarios;

    private boolean activo = true;

}
