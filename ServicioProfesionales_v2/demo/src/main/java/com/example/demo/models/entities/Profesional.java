package com.example.demo.models.entities;

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

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String dni;

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

    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provincia_id")
    private Provincia provincia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "localidad_id")
    private Localidad localidad;

    // Especialidades con matrícula
    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<EspecialidadProfesional> especialidades = new ArrayList<>();

//    public void agregarEspecialidad(EspecialidadProfesional ep) {
//        especialidades.add(ep);
//        ep.setProfesional(this);
//    }
//
//    public void eliminarEspecialidad(EspecialidadProfesional ep) {
//        especialidades.remove(ep);
//        ep.setProfesional(null);
//    }
}
