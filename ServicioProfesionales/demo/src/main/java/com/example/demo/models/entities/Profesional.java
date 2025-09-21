package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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


    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ESPECIALIDAD_ID",nullable = false)
    private Especialidad especialidad;

    @OneToMany(mappedBy = "profesional", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TipoServicio> servicios;


    public void agregarServicio(TipoServicio servicio) {
        if (servicios == null) {
            servicios = new ArrayList<>();
        }
        servicios.add(servicio);
        servicio.setProfesional(this); // asignar el profesional al servicio
    }
    public void eliminarServicio(TipoServicio servicio) {
        if (servicios != null) {
            servicios.remove(servicio);
            servicio.setProfesional(null);
        }
    }


}
