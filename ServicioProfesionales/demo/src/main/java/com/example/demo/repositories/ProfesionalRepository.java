package com.example.demo.repositories;

import com.example.demo.models.entities.Profesional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfesionalRepository extends JpaRepository<Profesional, Long> {
    boolean existsByCuil(String cuil);

    @Query("""
    SELECT DISTINCT p FROM Profesional p
    LEFT JOIN EspecialidadProfesional ep ON ep.profesional = p
    WHERE (:nombre IS NULL OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')))
      AND (:especialidadId IS NULL OR ep.especialidad.id = :especialidadId)
      AND (:provinciaNombre IS NULL OR LOWER(p.provinciaNombre) = LOWER(:provinciaNombre))
      AND (:localidadNombre IS NULL OR LOWER(p.localidadNombre) = LOWER(:localidadNombre))
    """)
    List<Profesional> buscarConFiltros(
            @Param("nombre") String nombre,
            @Param("especialidadId") Long especialidadId,
            @Param("provinciaNombre") String provinciaNombre,
            @Param("localidadNombre") String localidadNombre
    );

    @Modifying
    @Query("UPDATE EspecialidadProfesional ep SET ep.esPrincipal = false WHERE ep.profesional.id = :profesionalId")
    void desmarcarPrincipal(@Param("profesionalId") Long profesionalId);

    @Modifying
    @Query("UPDATE EspecialidadProfesional ep SET ep.esPrincipal = true WHERE ep.profesional.id = :profesionalId AND ep.especialidad.id = :especialidadId")
    void marcarComoPrincipal(@Param("profesionalId") Long profesionalId, @Param("especialidadId") Long especialidadId);
}
