package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ESPECIALIDAD")
public class Especialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name="NOMBRE",nullable = false)
    private String nombre;

    @Column(name="DESCRIPCION")
    private String descripcion;


    @OneToMany(mappedBy = "especialidad")
    private List<EspecialidadProfesional> especialidades;



}
