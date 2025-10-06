package com.example.demo.models.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "LOCALIDAD")
public class Localidad {
    @Id
    @GeneratedValue
    private Long id;
    private String nombre;


    @ManyToOne
    @JoinColumn(name = "provincia_id")
    private Provincia provincia;
}