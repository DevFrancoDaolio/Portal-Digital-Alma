package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ESPECIALIDAD_PROFESIONAL")
public class EspecialidadProfesional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profesional_id")
    private Profesional profesional;

    @ManyToOne
    @JoinColumn(name = "especialidad_id")
    private Especialidad especialidad;

//    @Column(name = "matricula", nullable = false)
//    private String matricula;
    @Column(name = "matricula")
    private String matricula;

    @Column(name = "principal")
    private boolean esPrincipal;



}
