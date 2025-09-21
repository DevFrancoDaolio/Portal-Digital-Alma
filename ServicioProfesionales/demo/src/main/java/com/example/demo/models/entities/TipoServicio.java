package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TIPO_SERVICIO")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TipoServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer duracion; // en minutos

    @Column(nullable = false)
    private Double costo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profesional_id")
    private Profesional profesional;
}
