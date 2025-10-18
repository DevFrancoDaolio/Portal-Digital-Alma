package com.alma.consultorios.services;

import com.alma.consultorios.entities.Consultorio;
import com.alma.consultorios.entities.Consultorio.EstadoConsultorio;
import com.tuapp.consultorios.repository.ConsultorioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultorioService {

    private final ConsultorioRepository repository;

    // Obtener todos
    public List<Consultorio> getAll() {
        return repository.findAll();
    }

    // Filtro por número
    public List<Consultorio> getByNumero(Integer numero) {
        return repository.findByNumero(numero);
    }

    // Filtro por ubicación
    public List<Consultorio> getByUbicacion(String ubicacion) {
        return repository.findByUbicacionContainingIgnoreCase(ubicacion);
    }

    // Filtro por especialidad
    public List<Consultorio> getByEspecialidad(Long especialidadId) {
        return repository.findByEspecialidadIdsContaining(especialidadId);
    }

    // Cambio de estado
    public Consultorio cambiarEstado(Long id, EstadoConsultorio nuevoEstado) {
        Consultorio c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultorio no encontrado"));
        c.setEstado(nuevoEstado);
        return repository.save(c);
    }

    // Métodos específicos de transición de estado
    public Consultorio marcarOcupado(Long id) {
        Consultorio c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultorio no encontrado"));
        if (c.getEstado() == EstadoConsultorio.DISPONIBLE) {
            c.setEstado(EstadoConsultorio.OCUPADO);
            return repository.save(c);
        }
        throw new RuntimeException("El consultorio no está disponible para ocupar");
    }

    public Consultorio marcarDisponible(Long id) {
        Consultorio c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultorio no encontrado"));
        if (c.getEstado() == EstadoConsultorio.OCUPADO ||
                c.getEstado() == EstadoConsultorio.FUERA_DE_SERVICIO) {
            c.setEstado(EstadoConsultorio.DISPONIBLE);
            return repository.save(c);
        }
        throw new RuntimeException("El consultorio ya está disponible");
    }

    public Consultorio marcarFueraDeServicio(Long id) {
        Consultorio c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultorio no encontrado"));
        if (c.getEstado() == EstadoConsultorio.DISPONIBLE) {
            c.setEstado(EstadoConsultorio.FUERA_DE_SERVICIO);
            return repository.save(c);
        }
        throw new RuntimeException("Solo se puede poner fuera de servicio un consultorio disponible");
    }
}
