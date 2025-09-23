package com.alma_centroteraupeutico.ServicioTurnos.models.entities;

import javax.annotation.processing.Generated;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.util.Date;


@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "TURNO")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    private Long id;

    @Column(name="FECHA")
    private Date fecha;

    @Column(name="FECHATURNO")
    private Date fechaTurno;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ESTADO_ID",nullable = false)
    private EstadoTurno estado;


    /*
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "PROFESIONAL_ID",nullable = false)
    private PROFESIONAL profesionalAignado*/
}
