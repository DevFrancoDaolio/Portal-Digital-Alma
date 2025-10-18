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
      AND (:provinciaId IS NULL OR p.provincia.id = :provinciaId)
      AND (:localidadId IS NULL OR p.localidad.id = :localidadId)
""")
    List<Profesional> buscarConFiltros(
            @Param("nombre") String nombre,
            @Param("especialidadId") Long especialidadId,
            @Param("provinciaId") Long provinciaId,
            @Param("localidadId") Long localidadId
    );

    @Modifying
    @Query("UPDATE EspecialidadProfesional ep SET ep.esPrincipal  = false WHERE ep.profesional.id = :profesionalId")
    void desmarcarPrincipal(Long profesionalId);


    @Modifying
    @Query("UPDATE EspecialidadProfesional ep SET ep.esPrincipal  = true WHERE ep.profesional.id = :profesionalId AND ep.especialidad.id = :especialidadId")
    void marcarComoPrincipal(Long profesionalId, Long especialidadId);


}
