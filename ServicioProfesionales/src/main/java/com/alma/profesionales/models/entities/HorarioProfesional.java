package com.alma.profesionales.models.entities;

import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
public class HorarioProfesional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private DayOfWeek dia;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    @ManyToOne
    private Profesional profesional;
}

