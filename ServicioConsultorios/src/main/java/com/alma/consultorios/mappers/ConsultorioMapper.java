package com.alma.consultorios.mappers;

import com.alma.consultorios.dtos.ConsultorioDTO;
import com.alma.consultorios.dtos.HorarioDTO;
import com.alma.consultorios.entities.Consultorio;
import com.alma.consultorios.entities.Horario;
import com.alma.consultorios.entities.Consultorio.EstadoConsultorio;
import com.alma.consultorios.entities.Horario.DiaSemana;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ConsultorioMapper {

    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");

    // -------------------- CONSULTORIO --------------------

    @Mapping(target = "estado", source = "estado")
    @Mapping(target = "horarios", source = "horarios")
    public abstract ConsultorioDTO toDTO(Consultorio consultorio);

    @Mapping(target = "estado", source = "estado")
    @Mapping(target = "horarios", source = "horarios")
    public abstract Consultorio toEntity(ConsultorioDTO dto);

    // -------------------- HORARIO --------------------

    @Mapping(target = "horaInicio", source = "horaInicio")
    @Mapping(target = "horaFin", source = "horaFin")
    @Mapping(target = "dia", source = "dia")
    public abstract HorarioDTO toDTO(Horario horario);

    @Mapping(target = "horaInicio", source = "horaInicio")
    @Mapping(target = "horaFin", source = "horaFin")
    @Mapping(target = "dia", source = "dia")
    public abstract Horario toEntity(HorarioDTO dto);

    public abstract List<HorarioDTO> toHorarioDTOList(List<Horario> horarios);
    public abstract List<Horario> toHorarioEntityList(List<HorarioDTO> dtos);

    // -------------------- CONVERSORES --------------------

    protected String estadoToString(EstadoConsultorio estado) {
        return estado != null ? estado.name() : null;
    }

    protected EstadoConsultorio stringToEstado(String estado) {
        return estado != null ? EstadoConsultorio.valueOf(estado) : null;
    }

    protected String localTimeToString(LocalTime time) {
        return time != null ? time.format(TIME_FORMAT) : null;
    }

    protected LocalTime stringToLocalTime(String time) {
        return time != null ? LocalTime.parse(time, TIME_FORMAT) : null;
    }

    protected String diaToString(DiaSemana dia) {
        return dia != null ? dia.name() : null;
    }

    protected DiaSemana stringToDia(String dia) {
        return dia != null ? DiaSemana.valueOf(dia) : null;
    }
}
