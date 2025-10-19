package com.alma.consultorios.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "consultorios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El número del consultorio es obligatorio")
    private Integer numero;

    @NotNull(message = "El piso del consultorio es obligatorio")
    private Integer piso;

    @NotBlank(message = "La ubicación no puede estar vacía")
    private String ubicacion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoConsultorio estado = EstadoConsultorio.DISPONIBLE;

    // Lista de IDs de especialidades (referencia a otro microservicio)
    @ElementCollection
    @CollectionTable(
            name = "consultorio_especialidades",
            joinColumns = @JoinColumn(name = "consultorio_id")
    )
    @Column(name = "especialidad_id", nullable = false)
    private List<Long> especialidadIds;

    @OneToMany(mappedBy = "consultorio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Horario> horarios;

    public enum EstadoConsultorio {
        DISPONIBLE,
        OCUPADO,
        FUERA_DE_SERVICIO
    }
}
