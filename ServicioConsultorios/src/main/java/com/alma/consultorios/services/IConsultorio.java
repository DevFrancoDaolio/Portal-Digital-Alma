package com.alma.consultorios.services;

import com.alma.consultorios.dtos.ConsultorioDTO;

import java.util.List;
public interface IConsultorio {
    ConsultorioDTO crearConsultorio(ConsultorioDTO dto);
    ConsultorioDTO actualizarConsultorio(Long id, ConsultorioDTO dto);
    ConsultorioDTO marcarFueraDeServicio(Long id);
    List<ConsultorioDTO> listarTodos();
    List<ConsultorioDTO> buscarPorUbicacion(String ubicacion);
    ConsultorioDTO obtenerPorId(Long id);
}

