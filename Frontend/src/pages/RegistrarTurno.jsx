"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/TurnosReg.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

const PACIENTES_MOCK = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    dni: "12345678",
    email: "juan@mail.com",
    telefono: "3511234567",
    obraSocial: "OSDE",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    dni: "23456789",
    email: "maria@mail.com",
    telefono: "3517654321",
    obraSocial: "Swiss Medical",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "López",
    dni: "34567890",
    email: "carlos@mail.com",
    telefono: "3519876543",
    obraSocial: "Galeno",
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "Martínez",
    dni: "45678901",
    email: "ana@mail.com",
    telefono: "3513456789",
    obraSocial: "Medifé",
  },
]

const ESPECIALIDADES_MOCK = [
  { id: 1, nombre: "Cardiología" },
  { id: 2, nombre: "Pediatría" },
  { id: 3, nombre: "Traumatología" },
  { id: 4, nombre: "Dermatología" },
]

const PROFESIONALES_MOCK = [
  {
    id: 1,
    nombre: "Laura",
    apellido: "Fernández",
    email: "laura@clinic.com",
    telefono: "3511111111",
    especialidades: [{ id: 1, nombre: "Cardiología" }],
  },
  {
    id: 2,
    nombre: "Roberto",
    apellido: "Sánchez",
    email: "roberto@clinic.com",
    telefono: "3512222222",
    especialidades: [{ id: 2, nombre: "Pediatría" }],
  },
  {
    id: 3,
    nombre: "Patricia",
    apellido: "Rodríguez",
    email: "patricia@clinic.com",
    telefono: "3513333333",
    especialidades: [{ id: 3, nombre: "Traumatología" }],
  },
  {
    id: 4,
    nombre: "Miguel",
    apellido: "Torres",
    email: "miguel@clinic.com",
    telefono: "3514444444",
    especialidades: [{ id: 4, nombre: "Dermatología" }],
  },
]

const CONSULTORIOS_MOCK = [
  {
    id: 1,
    numero: "101",
    nombre: "Consultorio de Cardiología",
    especialidades: ["Cardiología"],
    piso: "1",
    ubicacion: "Ala Norte",
    estado: "disponible",
  },
  {
    id: 2,
    numero: "102",
    nombre: "Consultorio de Pediatría, Psicología",
    especialidades: ["Pediatría", "Psicología"],
    piso: "1",
    ubicacion: "Ala Sur",
    estado: "disponible",
  },
  {
    id: 3,
    numero: "201",
    nombre: "Consultorio de Kinesiología",
    especialidades: ["Kinesiología"],
    piso: "2",
    ubicacion: "Ala Norte",
    estado: "disponible",
  },
  {
    id: 4,
    numero: "202",
    nombre: "Consultorio de Traumatología",
    especialidades: ["Traumatología"],
    piso: "2",
    ubicacion: "Ala Sur",
    estado: "disponible",
  },
]

const TURNOS_EXISTENTES = [
  {
    id: 1,
    fecha: "2025-01-13",
    horaInicio: "09:00",
    horaFin: "10:00",
    paciente: "Juan Pérez",
    profesional: "Dr/a. Fernández",
    profesionalId: 1,
    especialidad: "Cardiología",
    consultorio: "101",
    estado: "confirmado",
    motivoConsulta: "Consulta rutinaria",
  },
  {
    id: 2,
    fecha: "2025-01-13",
    horaInicio: "10:00",
    horaFin: "11:00",
    paciente: "María González",
    profesional: "Dr/a. Sánchez",
    profesionalId: 2,
    especialidad: "Pediatría",
    consultorio: "102",
    estado: "confirmado",
    motivoConsulta: "Consulta de chequeo",
  },
  {
    id: 3,
    fecha: "2025-01-14",
    horaInicio: "14:00",
    horaFin: "15:00",
    paciente: "Carlos López",
    profesional: "Dr/a. Rodríguez",
    profesionalId: 3,
    especialidad: "Traumatología",
    consultorio: "202",
    estado: "pendiente",
    motivoConsulta: "Consulta por lesión",
  },
  {
    id: 4,
    fecha: "2025-01-15",
    horaInicio: "11:00",
    horaFin: "12:00",
    paciente: "Ana Martínez",
    profesional: "Dr/a. Torres",
    profesionalId: 4,
    especialidad: "Dermatología",
    consultorio: "101",
    estado: "confirmado",
    motivoConsulta: "Consulta por acne",
  },
  {
    id: 5,
    fecha: "2025-01-13",
    horaInicio: "15:00",
    horaFin: "16:00",
    paciente: "Pedro Gómez",
    profesional: "Dr/a. Fernández",
    profesionalId: 1,
    especialidad: "Cardiología",
    consultorio: "101",
    estado: "confirmado",
    motivoConsulta: "Consulta por presión alta",
  },
]

const HORARIOS_DISPONIBLES = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
]

export default function RegistrarTurno() {
  const navigate = useNavigate()
  const [semanaActual, setSemanaActual] = useState(new Date())
  const [mesCalendario, setMesCalendario] = useState(new Date())
  const [turnosProgramados, setTurnosProgramados] = useState(TURNOS_EXISTENTES)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)
  const [horaSeleccionada, setHoraSeleccionada] = useState(null)
  const [diaSeleccionadoCalendario, setDiaSeleccionadoCalendario] = useState(null)

  const [form, setForm] = useState({
    pacienteId: "",
    profesionalId: "",
    especialidadId: "",
    consultorioId: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    motivoConsulta: "",
  })

  const [errors, setErrors] = useState({})
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([])
  const [consultoriosFiltrados, setConsultoriosFiltrados] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null)

  useEffect(() => {
    if (form.especialidadId) {
      const filtrados = PROFESIONALES_MOCK.filter((prof) =>
        prof.especialidades?.some((esp) => esp.id === Number.parseInt(form.especialidadId)),
      )
      setProfesionalesFiltrados(filtrados)

      // Filtrar consultorios por especialidad
      const especialidad = ESPECIALIDADES_MOCK.find((e) => e.id === Number.parseInt(form.especialidadId))
      const consultoriosFilt = CONSULTORIOS_MOCK.filter(
        (c) => c.especialidades.includes(especialidad?.nombre) && c.estado === "disponible",
      )
      setConsultoriosFiltrados(consultoriosFilt)
    } else {
      setProfesionalesFiltrados([])
      setConsultoriosFiltrados([])
      setForm((prevForm) => ({ ...prevForm, profesionalId: "", consultorioId: "", horaInicio: "", horaFin: "" }))
    }
  }, [form.especialidadId])

  const obtenerDiasSemana = (fecha) => {
    const dia = fecha.getDay()
    const lunes = new Date(fecha)
    lunes.setDate(fecha.getDate() - dia + (dia === 0 ? -6 : 1))

    const dias = []
    for (let i = 0; i < 5; i++) {
      const nuevaFecha = new Date(lunes)
      nuevaFecha.setDate(lunes.getDate() + i)
      dias.push(nuevaFecha)
    }
    return dias
  }

  const cambiarSemana = (direccion) => {
    const nuevaFecha = new Date(semanaActual)
    nuevaFecha.setDate(semanaActual.getDate() + direccion * 7)
    setSemanaActual(nuevaFecha)
  }

  const cambiarMesCalendario = (direccion) => {
    const nuevaFecha = new Date(mesCalendario)
    nuevaFecha.setMonth(mesCalendario.getMonth() + direccion)
    setMesCalendario(nuevaFecha)
  }

  const obtenerDiasDelMes = (fecha) => {
    const año = fecha.getFullYear()
    const mes = fecha.getMonth()
    const primerDia = new Date(año, mes, 1)
    const ultimoDia = new Date(año, mes + 1, 0)
    const diasPrevios = primerDia.getDay()

    const dias = []
    for (let i = diasPrevios - 1; i >= 0; i--) {
      const dia = new Date(año, mes, -i)
      dias.push({ fecha: dia, esDelMes: false })
    }
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const dia = new Date(año, mes, i)
      dias.push({ fecha: dia, esDelMes: true })
    }
    const diasRestantes = 7 - (dias.length % 7)
    if (diasRestantes < 7) {
      for (let i = 1; i <= diasRestantes; i++) {
        const dia = new Date(año, mes + 1, i)
        dias.push({ fecha: dia, esDelMes: false })
      }
    }
    return dias
  }

  const obtenerTurnosDelDia = (fecha) => {
    const fechaStr = formatearFecha(fecha)
    return turnosProgramados.filter((t) => t.fecha === fechaStr)
  }

  const formatearFecha = (fecha) => {
    return fecha.toISOString().split("T")[0]
  }

  const esHoy = (fecha) => {
    const hoy = new Date()
    return fecha.toDateString() === hoy.toDateString()
  }

  const handleClickDiaCalendario = (dia) => {
    if (!dia.esDelMes) return
    const nuevaSemana = new Date(dia.fecha)
    setSemanaActual(nuevaSemana)
    setDiaSeleccionadoCalendario(formatearFecha(dia.fecha))
  }

  const handleClickCeldaTurno = (fecha, hora) => {
    setDiaSeleccionado(fecha)
    setHoraSeleccionada(hora)
    setForm({ ...form, fecha: formatearFecha(fecha), horaInicio: hora })
    setMostrarFormulario(true)
  }

  const handleClickTurno = (turno) => {
    setTurnoSeleccionado(turno)
    setModoEdicion(false)
    setMostrarFormulario(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }

    if (name === "pacienteId") {
      const paciente = PACIENTES_MOCK.find((p) => p.id === Number.parseInt(value))
      setPacienteSeleccionado(paciente || null)
    }

    if (name === "profesionalId") {
      const profesional = profesionalesFiltrados.find((p) => p.id === Number.parseInt(value))
      setProfesionalSeleccionado(profesional || null)
    }
  }

  const estaHorarioOcupado = (fecha, hora, profesionalId) => {
    if (!profesionalId) return false

    const fechaStr = formatearFecha(fecha)
    return turnosProgramados.some(
      (t) => t.fecha === fechaStr && t.profesionalId === profesionalId && t.horaInicio === hora,
    )
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!form.pacienteId) nuevosErrores.pacienteId = "Debe seleccionar un paciente"
    if (!form.especialidadId) nuevosErrores.especialidadId = "Debe seleccionar una especialidad"
    if (!form.profesionalId) nuevosErrores.profesionalId = "Debe seleccionar un profesional"
    if (!form.consultorioId) nuevosErrores.consultorioId = "Debe seleccionar un consultorio"
    if (!form.fecha) nuevosErrores.fecha = "Debe seleccionar una fecha"
    if (!form.horaInicio) nuevosErrores.horaInicio = "Debe seleccionar un horario de inicio"
    if (!form.horaFin) nuevosErrores.horaFin = "Debe seleccionar un horario de fin"
    if (form.motivoConsulta && form.motivoConsulta.length > 200) {
      nuevosErrores.motivoConsulta = "El motivo no puede superar los 200 caracteres"
    }


    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleRegistrar = (e) => {
    e.preventDefault()

    if (!validarFormulario()) return

    const paciente = PACIENTES_MOCK.find((p) => p.id === Number.parseInt(form.pacienteId))
    const profesional = profesionalesFiltrados.find((p) => p.id === Number.parseInt(form.profesionalId))
    const especialidad = ESPECIALIDADES_MOCK.find((e) => e.id === Number.parseInt(form.especialidadId))
    const consultorio = CONSULTORIOS_MOCK.find((c) => c.id === Number.parseInt(form.consultorioId))

    if (modoEdicion && turnoSeleccionado) {
      const turnosActualizados = turnosProgramados.map((t) => {
        if (t.id === turnoSeleccionado.id) {
          return {
            ...t,
            fecha: form.fecha,
            horaInicio: form.horaInicio,
            horaFin: form.horaFin,
            paciente: `${paciente.nombre} ${paciente.apellido}`,
            profesional: `Dr/a. ${profesional.apellido}`,
            profesionalId: profesional.id,
            especialidad: especialidad.nombre,
            consultorio: consultorio.numero,
            motivoConsulta: form.motivoConsulta,
          }
        }
        return t
      })

      setTurnosProgramados(turnosActualizados)
      alert("Turno actualizado exitosamente")
      setTurnoSeleccionado(null)
    } else {
      // Crear nuevo turno
      const nuevoTurno = {
        id: turnosProgramados.length + 1,
        fecha: form.fecha,
        horaInicio: form.horaInicio,
        horaFin: form.horaFin,
        paciente: `${paciente.nombre} ${paciente.apellido}`,
        profesional: `Dr/a. ${profesional.apellido}`,
        profesionalId: profesional.id,
        especialidad: especialidad.nombre,
        consultorio: consultorio.numero,
        estado: "confirmado",
        motivoConsulta: form.motivoConsulta,
      }

      setTurnosProgramados([...turnosProgramados, nuevoTurno])
      alert("Turno registrado exitosamente")
    }

    setForm({
      pacienteId: "",
      profesionalId: "",
      especialidadId: "",
      consultorioId: "",
      fecha: "",
      horaInicio: "",
      horaFin: "",
      motivoConsulta: "",
    })
    setPacienteSeleccionado(null)
    setProfesionalSeleccionado(null)
    setMostrarFormulario(false)
    setModoEdicion(false)
  }

  const handleEditarTurno = () => {
    if (!turnoSeleccionado) return

    const paciente = PACIENTES_MOCK.find((p) => `${p.nombre} ${p.apellido}` === turnoSeleccionado.paciente)
    const especialidad = ESPECIALIDADES_MOCK.find((e) => e.nombre === turnoSeleccionado.especialidad)

    setForm({
      pacienteId: paciente?.id.toString() || "",
      profesionalId: turnoSeleccionado.profesionalId.toString(),
      especialidadId: especialidad?.id.toString() || "",
      consultorioId: CONSULTORIOS_MOCK.find((c) => c.numero === turnoSeleccionado.consultorio)?.id.toString() || "",
      fecha: turnoSeleccionado.fecha,
      horaInicio: turnoSeleccionado.horaInicio,
      horaFin: turnoSeleccionado.horaFin,
      motivoConsulta: turnoSeleccionado.motivoConsulta || "",
    })

    setPacienteSeleccionado(paciente || null)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const handleEliminarTurnoDesdeModal = () => {
    if (!turnoSeleccionado) return
    if (window.confirm("¿Está seguro que desea cancelar este turno?")) {
      setTurnosProgramados(turnosProgramados.filter((t) => t.id !== turnoSeleccionado.id))
      setTurnoSeleccionado(null)
      alert("Turno cancelado exitosamente")
    }
  }

  const handleCancelarTurno = (turnoId) => {
    if (window.confirm("¿Está seguro que desea cancelar este turno?")) {
      setTurnosProgramados(turnosProgramados.filter((t) => t.id !== turnoId))
      alert("Turno cancelado exitosamente")
    }
  }

const ALTURA_POR_INTERVALO = 25; 

const calcularAlturaTurno = (horaInicio, horaFin) => {
    const indexInicio = HORARIOS_DISPONIBLES.indexOf(horaInicio);
    const indexFin = HORARIOS_DISPONIBLES.indexOf(horaFin);

    // Si no encuentra los horarios, devuelve la altura mínima de 1 hora (50px).
    if (indexInicio === -1 || indexFin === -1) return 50;

    // Calcula cuántos intervalos de 30 minutos hay entre la hora de inicio y la hora de fin.
    // Para 12:00 (índice 8) a 14:00 (índice 12) -> 12 - 8 = 4 intervalos.
    const intervalos = indexFin - indexInicio; 
    
    // Altura: 4 intervalos * 25px/intervalo = 100px. (¡Correcto para 2 horas!)
    return intervalos * ALTURA_POR_INTERVALO;
};

  const calcularTopOffset = (horaInicio) => {
    const [hora, minutos] = horaInicio.split(":").map(Number)
    const horaBase = `${hora.toString().padStart(2, "0")}:00`

    const horasCompletas = HORARIOS_DISPONIBLES.filter((h) => h.endsWith(":00"))
    const indexHoraBase = horasCompletas.indexOf(horaBase)

    const offset = minutos === 30 ? 25 : 0

    return { row: indexHoraBase, offset }
  }

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
  const diasSemanaCortos = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const diasSemanaActual = obtenerDiasSemana(semanaActual)

  const esDiaLleno = (fecha) => {
    const fechaStr = formatearFecha(fecha)
    const turnosDelDia = turnosProgramados.filter((t) => t.fecha === fechaStr)

    if (turnosDelDia.length === 0) return false

    const horasOcupadas = new Set()
    turnosDelDia.forEach((turno) => {
      const inicioIndex = HORARIOS_DISPONIBLES.indexOf(turno.horaInicio)
      const finIndex = HORARIOS_DISPONIBLES.indexOf(turno.horaFin)

      if (inicioIndex !== -1 && finIndex !== -1) {
        for (let i = inicioIndex; i < finIndex; i++) {
          horasOcupadas.add(HORARIOS_DISPONIBLES[i])
        }
      }
    })

    return horasOcupadas.size >= 24
  }

  const esDiaConTurnos = (fecha) => {
    const fechaStr = formatearFecha(fecha)
    const turnosDelDia = turnosProgramados.filter((t) => t.fecha === fechaStr)

    return turnosDelDia.length > 0 && !esDiaLleno(fecha)
  }

  return (
    <Fondo>
      <NavBar />

      <div className="turnos-container">
        <div className="container-fluid mt-4">
          <div className="turnos-header">
            <h2>Agenda de Turnos</h2>
            <button className="btn-nuevo-turno" onClick={() => setMostrarFormulario(true)}>
              Nuevo Turno
            </button>
          </div>

          <div className="calendario-semanal-layout">
            <div className="vista-semanal">
              <div className="semana-navegacion">
                <button className="btn-nav-semana" onClick={() => cambiarSemana(-1)}>
                  ← Semana Anterior
                </button>
                <div className="semana-actual-texto">
                  {diasSemanaActual[0].getDate()}/{diasSemanaActual[0].getMonth() + 1} - {diasSemanaActual[4].getDate()}
                  /{diasSemanaActual[4].getMonth() + 1}/{diasSemanaActual[4].getFullYear()}
                </div>
                <button className="btn-nav-semana" onClick={() => cambiarSemana(1)}>
                  Semana Siguiente →
                </button>
              </div>

              <div className="semana-header">
                <div className="week-day-header time-header"></div>
                {diasSemanaActual.map((dia, index) => (
                  <div key={index} className={`dia-header ${esHoy(dia) ? "hoy" : ""}`}>
                    <div className="dia-nombre">{diasSemana[index]}</div>
                    <div className="dia-numero">
                      {dia.getDate()}/{dia.getMonth() + 1}
                    </div>
                  </div>
                ))}
              </div>

              <div className="semana-grid">
                <div className="horarios-columna-separada">
                  {HORARIOS_DISPONIBLES.filter((h) => h.endsWith(":00")).map((hora, index) => (
                    <div key={index} className="horario-celda">
                      {hora}
                    </div>
                  ))}
                </div>

                <div className="dias-grid-container">
                  {diasSemanaActual.map((dia, diaIndex) => (
                    <div key={diaIndex} className="dia-columna">
                      {HORARIOS_DISPONIBLES.filter((h) => h.endsWith(":00")).map((hora, horaIndex) => {
                        const turnosDelDia = obtenerTurnosDelDia(dia)
                        const horaConMedia = [hora, hora.replace(":00", ":30")]
                        const turnosEnEstaHora = turnosDelDia.filter((t) => horaConMedia.includes(t.horaInicio))
                        const esPasado = dia < new Date() && !esHoy(dia)

                        return (
                          <div
                            key={horaIndex}
                            className={`turno-celda ${esPasado ? "pasado" : ""}`}
                            onClick={() => !esPasado && handleClickCeldaTurno(dia, hora)}
                          >
                            {turnosEnEstaHora.map((turno) => {
                              const { row, offset } = calcularTopOffset(turno.horaInicio)
                              const altura = calcularAlturaTurno(turno.horaInicio, turno.horaFin)

                              if (row !== horaIndex) return null

                              return (
                                <div
                                  key={turno.id}
                                  className={`turno-bloque ${turno.estado}`}
                                  style={{
                                    height: `${altura}px`,
                                    top: `${offset}px`,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleClickTurno(turno)
                                  }}
                                >
                                  <button
                                    className="btn-cancelar-turno"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleCancelarTurno(turno.id)
                                    }}
                                    title="Cancelar turno"
                                  >
                                    ✕
                                  </button>
                                  <div className="turno-hora-bloque">
                                    {turno.horaInicio} - {turno.horaFin}
                                  </div>
                                  <div className="turno-paciente">{turno.paciente}</div>
                                  <div className="turno-especialidad">{turno.especialidad}</div>
                                  <div className="turno-consultorio">Cons. {turno.consultorio}</div>
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="calendario-mini">
              <div className="calendario-mini-header">
                <button className="btn-mini" onClick={() => cambiarMesCalendario(-1)}>
                  ‹
                </button>
                <div className="mes-año">
                  {nombresMeses[mesCalendario.getMonth()]} {mesCalendario.getFullYear()}
                </div>
                <button className="btn-mini" onClick={() => cambiarMesCalendario(1)}>
                  ›
                </button>
              </div>

              <div className="calendario-mini-grid">
                {diasSemanaCortos.map((dia) => (
                  <div key={dia} className="dia-mini-header">
                    {dia[0]}
                  </div>
                ))}

                {obtenerDiasDelMes(mesCalendario).map((dia, index) => {
                  const turnosDelDia = obtenerTurnosDelDia(dia.fecha)
                  const esHoyDia = esHoy(dia.fecha)
                  const diaLleno = esDiaLleno(dia.fecha)
                  const diaConTurnos = esDiaConTurnos(dia.fecha)
                  const esSeleccionado = diaSeleccionadoCalendario === formatearFecha(dia.fecha)

                  return (
                    <div
                      key={index}
                      className={`dia-mini ${!dia.esDelMes ? "otro-mes" : ""} ${esHoyDia ? "hoy" : ""} ${esSeleccionado ? "seleccionado" : ""} ${diaLleno ? "dia-lleno" : ""} ${diaConTurnos ? "dia-con-turnos" : ""}`}
                      onClick={() => handleClickDiaCalendario(dia)}
                    >
                      {dia.fecha.getDate()}
                    </div>
                  )
                })}
              </div>

              <div className="leyenda-mini">
                <div className="leyenda-item-mini">
                  
                </div>
                <div className="leyenda-item-mini">
                  <span className="badge-disponibilidad-mini" style={{ backgroundColor: "#f39c12" }}></span> Poca
                  disponibilidad
                </div>
                <div className="leyenda-item-mini">
                  <span className="badge-disponibilidad-mini" style={{ backgroundColor: "#e74c3c" }}></span> Sin
                  disponibilidad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {turnoSeleccionado && (
        <div className="modal-overlay" onClick={() => setTurnoSeleccionado(null)}>
          <div className="modal-contenido modal-detalle-turno" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalle del Turno</h3>
              <button className="btn-cerrar" onClick={() => setTurnoSeleccionado(null)}>
                ×
              </button>
            </div>

            <div className="turno-detalle-body">
              <div className="detalle-seccion">
                <h4>Información del Paciente</h4>
                <div className="detalle-item">
                  <strong>Paciente:</strong> {turnoSeleccionado.paciente}
                </div>
              </div>

              <div className="detalle-seccion">
                <h4>Información del Turno</h4>
                <div className="detalle-item">
                  <strong>Fecha:</strong>{" "}
                  {new Date(turnoSeleccionado.fecha + "T12:00:00").toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="detalle-item">
                  <strong>Horario:</strong> {turnoSeleccionado.horaInicio} - {turnoSeleccionado.horaFin}
                </div>
                <div className="detalle-item">
                  <strong>Profesional:</strong> {turnoSeleccionado.profesional}
                </div>
                <div className="detalle-item">
                  <strong>Especialidad:</strong> {turnoSeleccionado.especialidad}
                </div>
                <div className="detalle-item">
                  <strong>Consultorio:</strong> {turnoSeleccionado.consultorio}
                </div>
                <div className="detalle-item">
                  <strong>Estado:</strong>
                  <span className={`badge-estado ${turnoSeleccionado.estado}`}>
                    {turnoSeleccionado.estado === "confirmado" ? "Confirmado" : "Pendiente"}
                  </span>
                </div>
                {turnoSeleccionado.motivoConsulta && (
                  <div className="detalle-item">
                    <strong>Motivo:</strong> {turnoSeleccionado.motivoConsulta}
                  </div>
                )}
              </div>

              <div className="detalle-acciones">
                <button className="btn btn-editar-small" onClick={handleEditarTurno}>
                  Editar Turno
                </button>
                <button className="btn btn-eliminar-small" onClick={handleEliminarTurnoDesdeModal}>
                  Cancelar Turno
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarFormulario && (
        <div className="modal-overlay" onClick={() => setMostrarFormulario(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modoEdicion ? "Editar Turno" : "Registrar Turno"}</h3>
              <button className="btn-cerrar" onClick={() => setMostrarFormulario(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleRegistrar} className="turno-form">
              <div className="mb-3">
                <label htmlFor="pacienteId" className="form-label fw-bold">
                  Paciente *
                </label>
                <select
                  id="pacienteId"
                  name="pacienteId"
                  className={`form-control ${errors.pacienteId ? "is-invalid" : ""}`}
                  value={form.pacienteId}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un paciente</option>
                  {PACIENTES_MOCK.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.apellido}, {paciente.nombre} - DNI: {paciente.dni}
                    </option>
                  ))}
                </select>
                {errors.pacienteId && <div className="invalid-feedback">{errors.pacienteId}</div>}

                {pacienteSeleccionado && (
                  <div className="info-box mt-2">
                    <small>
                      <strong>Email:</strong> {pacienteSeleccionado.email} | <strong>Teléfono:</strong>{" "}
                      {pacienteSeleccionado.telefono} | <strong>Obra Social:</strong> {pacienteSeleccionado.obraSocial}
                    </small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="especialidadId" className="form-label fw-bold">
                  Especialidad *
                </label>
                <select
                  id="especialidadId"
                  name="especialidadId"
                  className={`form-control ${errors.especialidadId ? "is-invalid" : ""}`}
                  value={form.especialidadId}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una especialidad</option>
                  {ESPECIALIDADES_MOCK.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </select>
                {errors.especialidadId && <div className="invalid-feedback">{errors.especialidadId}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="profesionalId" className="form-label fw-bold">
                  Profesional *
                </label>
                <select
                  id="profesionalId"
                  name="profesionalId"
                  className={`form-control ${errors.profesionalId ? "is-invalid" : ""}`}
                  value={form.profesionalId}
                  onChange={handleChange}
                  disabled={!form.especialidadId}
                >
                  <option value="">
                    {!form.especialidadId
                      ? "Primero seleccione una especialidad"
                      : profesionalesFiltrados.length === 0
                        ? "No hay profesionales disponibles"
                        : "Seleccione un profesional"}
                  </option>
                  {profesionalesFiltrados.map((profesional) => (
                    <option key={profesional.id} value={profesional.id}>
                      Dr/a. {profesional.apellido}, {profesional.nombre}
                    </option>
                  ))}
                </select>
                {errors.profesionalId && <div className="invalid-feedback">{errors.profesionalId}</div>}

                {profesionalSeleccionado && (
                  <div className="info-box mt-2">
                    <small>
                      <strong>Email:</strong> {profesionalSeleccionado.email} | <strong>Teléfono:</strong>{" "}
                      {profesionalSeleccionado.telefono}
                    </small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="consultorioId" className="form-label fw-bold">
                  Consultorio *
                </label>
                <select
                  id="consultorioId"
                  name="consultorioId"
                  className={`form-control ${errors.consultorioId ? "is-invalid" : ""}`}
                  value={form.consultorioId}
                  onChange={handleChange}
                  disabled={!form.especialidadId}
                >
                  <option value="">
                    {!form.especialidadId
                      ? "Primero seleccione una especialidad"
                      : consultoriosFiltrados.length === 0
                        ? "No hay consultorios disponibles"
                        : "Seleccione un consultorio"}
                  </option>
                  {consultoriosFiltrados.map((consultorio) => (
                    <option key={consultorio.id} value={consultorio.id}>
                      {consultorio.nombre} - Piso {consultorio.piso} - {consultorio.ubicacion}
                    </option>
                  ))}
                </select>
                {errors.consultorioId && <div className="invalid-feedback">{errors.consultorioId}</div>}
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="fecha" className="form-label fw-bold">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                    value={form.fecha}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="horaInicio" className="form-label fw-bold">
                    Hora Inicio *
                  </label>
                  <select
                    id="horaInicio"
                    name="horaInicio"
                    className={`form-control ${errors.horaInicio ? "is-invalid" : ""}`}
                    value={form.horaInicio}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione hora</option>
                    {HORARIOS_DISPONIBLES.map((horario, index) => {
                      const ocupado =
                        form.fecha &&
                        form.profesionalId &&
                        estaHorarioOcupado(
                          new Date(form.fecha + "T12:00:00"),
                          horario,
                          Number.parseInt(form.profesionalId),
                        )
                      return (
                        <option key={index} value={horario} >
                          {horario} 
                        </option>
                      )
                    })}
                  </select>
                  {errors.horaInicio && <div className="invalid-feedback">{errors.horaInicio}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="horaFin" className="form-label fw-bold">
                    Hora Fin *
                  </label>
                  <select
                    id="horaFin"
                    name="horaFin"
                    className={`form-control ${errors.horaFin ? "is-invalid" : ""}`}
                    value={form.horaFin}
                    onChange={handleChange}
                    disabled={!form.horaInicio}
                  >
                    <option value="">Seleccione hora fin</option>
                    {HORARIOS_DISPONIBLES.filter((h) => h >= form.horaInicio)
                      .slice(1)
                      .map((horario, index) => (
                        <option key={index} value={horario}>
                          {horario}
                        </option>
                      ))}
                  </select>
                  {errors.horaFin && <div className="invalid-feedback">{errors.horaFin}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="motivoConsulta" className="form-label">
                  Motivo de Consulta
                </label>
                <textarea
                  id="motivoConsulta"
                  name="motivoConsulta"
                  className={`form-control ${errors.motivoConsulta ? "is-invalid" : ""}`}
                  value={form.motivoConsulta}
                  onChange={handleChange}
                  placeholder="Opcional: Describa el motivo de la consulta"
                  rows="3"
                  maxLength="200"
                />
                {errors.motivoConsulta && <div className="invalid-feedback">{errors.motivoConsulta}</div>}
                <small className="text-muted">{form.motivoConsulta.length}/200 caracteres</small>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {modoEdicion ? "Actualizar Turno" : "Registrar Turno"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fondo>
  )
}
