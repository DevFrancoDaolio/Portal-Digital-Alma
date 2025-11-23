"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/TurnosReg.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import * as turnosService from "../services/turnosService"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//configuración de horarios calendario
const HORARIO_INICIO = "08:00"
const HORARIO_FIN = "20:00"
const INTERVALO_MIN = 30

function generarHorariosDisponibles(horaInicio = HORARIO_INICIO, horaFin = HORARIO_FIN, intervaloMin = INTERVALO_MIN) {
  const horarios = []
  let [hora, minuto] = horaInicio.split(":").map(Number)
  const [horaFinNum, minutoFinNum] = horaFin.split(":").map(Number)

  while (hora < horaFinNum || (hora === horaFinNum && minuto < minutoFinNum)) {
    horarios.push(`${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`)
    minuto += intervaloMin
    if (minuto >= 60) {
      minuto = minuto % 60
      hora++
    }
  }

  return horarios
}


export default function RegistrarTurno() {
  const navigate = useNavigate()
  const [semanaActual, setSemanaActual] = useState(new Date())
  const [mesCalendario, setMesCalendario] = useState(new Date())

  const [turnosProgramados, setTurnosProgramados] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)
  const [horaSeleccionada, setHoraSeleccionada] = useState(null)
  const [diaSeleccionadoCalendario, setDiaSeleccionadoCalendario] = useState(null)

  const [pacientes, setPacientes] = useState([])
  const [profesionales, setProfesionales] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    pacienteId: "",
    profesionalId: "",
    especialidadId: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    motivoConsulta: "",
  })

  const [errors, setErrors] = useState({})
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null)

  const HORARIOS_DISPONIBLES = generarHorariosDisponibles()


  useEffect(() => {
    const fetchData = async () => {
      try {
        setCargando(true)
        const [turnosRes, pacientesRes, profesionalesRes, especialidadesRes] = await Promise.all([
          turnosService.obtenerTurnos(),
          turnosService.obtenerPacientes(),
          turnosService.obtenerProfesionales(),
          turnosService.obtenerEspecialidades(),
        ])

        setTurnosProgramados(turnosRes.data.data || [])
        setPacientes(pacientesRes.data.data || [])
        setProfesionales(profesionalesRes.data.data || [])
        setEspecialidades(especialidadesRes.data.data || [])
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error al cargar los datos")
      } finally {
        setCargando(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (form.especialidadId) {
      const filtrados = profesionales.filter((prof) =>
        prof.especialidades?.some((esp) => esp.id === Number.parseInt(form.especialidadId)),
      )
      setProfesionalesFiltrados(filtrados)

      const especialidad = especialidades.find((e) => e.id === Number.parseInt(form.especialidadId))
    } else {
      setProfesionalesFiltrados([])
      setForm((prevForm) => ({ ...prevForm, profesionalId: "", horaInicio: "", horaFin: "" }))
    }
  }, [form.especialidadId, profesionales, especialidades])

  const obtenerDiasSemana = (fecha) => {
    const dia = fecha.getDay()
    const lunes = new Date(fecha)
    lunes.setDate(fecha.getDate() - dia + (dia === 0 ? -6 : 1))

    const dias = []
    for (let i = 0; i < 6; i++) {
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
      const paciente = pacientes.find((p) => p.id === Number.parseInt(value))
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
    const indexHora = HORARIOS_DISPONIBLES.indexOf(hora)

    return turnosProgramados.some((t) => {
      if (t.fecha !== fechaStr || t.profesionalId !== profesionalId) return false

      const indexInicio = HORARIOS_DISPONIBLES.indexOf(t.horaInicio)
      const indexFin = HORARIOS_DISPONIBLES.indexOf(t.horaFin)

      return indexHora >= indexInicio && indexHora < indexFin
    })
  }


  const rangoDisponible = (fecha, horaInicio, horaFin, profesionalId) => {
  if (!profesionalId || !fecha || !horaInicio || !horaFin) return false

  const fechaStr = formatearFecha(fecha)
  const indexInicio = HORARIOS_DISPONIBLES.indexOf(horaInicio)
  const indexFin = HORARIOS_DISPONIBLES.indexOf(horaFin)

  return !turnosProgramados.some((t) => {
    if (t.fecha !== fechaStr || t.profesionalId !== profesionalId) return false

    const tInicio = HORARIOS_DISPONIBLES.indexOf(t.horaInicio)
    const tFin = HORARIOS_DISPONIBLES.indexOf(t.horaFin)

    // Verifica si hay solapamiento
    return indexInicio < tFin && indexFin > tInicio
  })
}


  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!form.pacienteId) nuevosErrores.pacienteId = "Debe seleccionar un paciente"
    if (!form.especialidadId) nuevosErrores.especialidadId = "Debe seleccionar una especialidad"
    if (!form.profesionalId) nuevosErrores.profesionalId = "Debe seleccionar un profesional"
    if (!form.fecha) nuevosErrores.fecha = "Debe seleccionar una fecha"
    if (!form.horaInicio) nuevosErrores.horaInicio = "Debe seleccionar un horario de inicio"
    if (!form.horaFin) nuevosErrores.horaFin = "Debe seleccionar un horario de fin"
    if (form.motivoConsulta && form.motivoConsulta.length > 200) {
      nuevosErrores.motivoConsulta = "El motivo no puede superar los 200 caracteres"
    }

    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleRegistrar = async (e) => {
    e.preventDefault()

    if (!validarFormulario()) return

    try {
      if (modoEdicion && turnoSeleccionado) {
        await turnosService.actualizarTurno(turnoSeleccionado.id, {
          fecha: form.fecha,
          horaInicio: form.horaInicio,
          horaFin: form.horaFin,
          pacienteId: Number.parseInt(form.pacienteId),
          profesionalId: Number.parseInt(form.profesionalId),
          especialidadId: Number.parseInt(form.especialidadId),
          motivoConsulta: form.motivoConsulta,
        })
        alert("Turno actualizado exitosamente")
      } else {
        await turnosService.crearTurno({
          fecha: form.fecha,
          horaInicio: form.horaInicio,
          horaFin: form.horaFin,
          pacienteId: Number.parseInt(form.pacienteId),
          profesionalId: Number.parseInt(form.profesionalId),
          especialidadId: Number.parseInt(form.especialidadId),
          motivoConsulta: form.motivoConsulta,
        })
        alert("Turno registrado exitosamente")
      }

      // Refresh turnos
      const turnosRes = await turnosService.obtenerTurnos()
      setTurnosProgramados(turnosRes.data.data || [])

      setForm({
        pacienteId: "",
        profesionalId: "",
        especialidadId: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        motivoConsulta: "",
      })
      setPacienteSeleccionado(null)
      setProfesionalSeleccionado(null)
      setMostrarFormulario(false)
      setModoEdicion(false)
    } catch (err) {
      console.error("Error registrando turno:", err)
      alert("Error al registrar el turno")
    }
  }

  const handleEditarTurno = () => {
    if (!turnoSeleccionado) return

    const paciente = pacientes.find((p) => p.id === turnoSeleccionado.pacienteId)
    const especialidad = especialidades.find((e) => e.id === turnoSeleccionado.especialidadId)

    setForm({
      pacienteId: paciente?.id.toString() || "",
      profesionalId: turnoSeleccionado.profesionalId.toString(),
      especialidadId: especialidad?.id.toString() || "",
      fecha: turnoSeleccionado.fecha,
      horaInicio: turnoSeleccionado.horaInicio,
      horaFin: turnoSeleccionado.horaFin,
      motivoConsulta: turnoSeleccionado.motivoConsulta || "",
    })

    setPacienteSeleccionado(paciente || null)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const handleEliminarTurnoDesdeModal = async () => {
    if (!turnoSeleccionado) return
    if (window.confirm("¿Está seguro que desea cancelar este turno?")) {
      try {
        await turnosService.cancelarTurno(turnoSeleccionado.id)
        setTurnosProgramados(turnosProgramados.filter((t) => t.id !== turnoSeleccionado.id))
        setTurnoSeleccionado(null)
        alert("Turno cancelado exitosamente")
      } catch (err) {
        console.error("Error cancelando turno:", err)
        alert("Error al cancelar el turno")
      }
    }
  }

  const handleCancelarTurno = async (turnoId) => {
    if (window.confirm("¿Está seguro que desea cancelar este turno?")) {
      try {
        await turnosService.cancelarTurno(turnoId)
        setTurnosProgramados(turnosProgramados.filter((t) => t.id !== turnoId))
        alert("Turno cancelado exitosamente")
      } catch (err) {
        console.error("Error cancelando turno:", err)
        alert("Error al cancelar el turno")
      }
    }
  }


  // Cada celda de la grilla (turno-celda) mide 50px y representa 30 minutos
  const ALTURA_CELDA = 50

  const calcularAlturaTurno = (horaInicio, horaFin) => {
    const indexInicio = HORARIOS_DISPONIBLES.indexOf(horaInicio)
    const indexFin = HORARIOS_DISPONIBLES.indexOf(horaFin)

    if (indexInicio === -1 || indexFin === -1) return ALTURA_CELDA

    // cantidad de intervalos de 30 min * alto de cada intervalo
    return (indexFin - indexInicio) * ALTURA_CELDA
  }

  const calcularTopTurno = (horaInicio) => {
    const indexInicio = HORARIOS_DISPONIBLES.indexOf(horaInicio)

    if (indexInicio === -1) return 0

    // desplazamiento desde la primera celda (08:00)
    return indexInicio * ALTURA_CELDA
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
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
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

  if (cargando) {
    return (
      <Fondo>
        <NavBar />
        <div className="turnos-container">
          <div style={{ textAlign: "center", padding: "40px" }}>Cargando datos...</div>
        </div>
      </Fondo>
    )
  }

  if (error) {
    return (
      <Fondo>
        <NavBar />
        <div className="turnos-container">
          <div style={{ textAlign: "center", padding: "40px", color: "red" }}>{error}</div>
        </div>
      </Fondo>
    )
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
                  {diasSemanaActual[0].getDate()}/{diasSemanaActual[0].getMonth() + 1} - 
                  {diasSemanaActual[5].getDate()}/{diasSemanaActual[5].getMonth() + 1}/{diasSemanaActual[5].getFullYear()}
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
                  {HORARIOS_DISPONIBLES.map((hora, index) => (
                    <div key={index} className="horario-celda">
                      {hora}
                    </div>
                  ))}
                </div>
                  <div className="dias-grid-container">
                    {diasSemanaActual.map((dia, diaIndex) => (
                      <div
                        key={diaIndex}
                        className="dia-columna"
                        style={{ position: "relative" }} // IMPORTANTE
                      >

                        {/* Render de celdas horarias */}
                        {HORARIOS_DISPONIBLES.map((hora, horaIndex) => {
                          const esPasado = dia < new Date() && !esHoy(dia)

                          return (
                            <div
                              key={horaIndex}
                              className={`turno-celda ${esPasado ? "pasado" : ""}`}
                              onClick={() => !esPasado && handleClickCeldaTurno(dia, hora)}
                            />
                          )
                        })}

                        {/* Render de los turnos (UNA sola vez por día) */}
                        {obtenerTurnosDelDia(dia).map((turno) => {
                          const top = calcularTopTurno(turno.horaInicio);
                          const altura = calcularAlturaTurno(turno.horaInicio, turno.horaFin);

                          return (
                            <div
                              key={turno.id}
                              className={`turno-bloque ${turno.estado}`}
                              style={{
                                position: "absolute",
                                top: `${top}px`,
                                height: `${altura}px`,
                                left: "2px",
                                right: "2px",
                                zIndex: 5,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClickTurno(turno);
                              }}
                            >
                              <button
                                className="btn-cancelar-turno"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelarTurno(turno.id);
                                }}
                              >
                                ✕
                              </button>

                              <div className="turno-hora-bloque">
                                {turno.horaInicio} - {turno.horaFin}
                              </div>
                              <div className="turno-paciente">{turno.paciente}</div>
                              <div className="turno-especialidad">{turno.especialidad}</div>
                            </div>
                          );
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
                
                {(() => {
                  const [año, mes, dia] = turnoSeleccionado.fecha.split("-").map(Number)
                  const fechaLocal = new Date(año, mes - 1, dia)
                  return (
                    <div className="detalle-item">
                      <strong>Fecha:</strong>{" "}
                      {fechaLocal.toLocaleDateString("es-AR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )
                })()}
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
                  {pacientes.map((paciente) => (
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
                      {pacienteSeleccionado.telefono} | <strong>Obra Social:</strong> {pacienteSeleccionado.obraSocialNombre}
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
                  {especialidades.map((especialidad) => (
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

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="fecha" className="form-label fw-bold">
                    Fecha *
                  </label>
                <DatePicker
                  selected={form.fecha ? new Date(form.fecha) : null}
                  onChange={(date) => {
                    if (date.getDay() === 0) {
                      alert("No se pueden registrar turnos los domingos")
                      return
                    }
                    setForm({ ...form, fecha: date.toISOString().split("T")[0] })
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/aaaa"
                  minDate={new Date()}
                  filterDate={(date) => date.getDay() !== 0} // bloquea domingos visualmente
                  className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
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
                    onChange={(e) => {
                      setForm({ ...form, horaInicio: e.target.value, horaFin: "" });
                    }}
                  >
                    <option value="">Seleccione hora</option>

                    {HORARIOS_DISPONIBLES
                      .filter((h) => {
                        if (!form.fecha || !form.profesionalId) return false;

                        const fecha = new Date(form.fecha);

                        // La hora de inicio es válida si existe al menos una hora fin válida
                        const tieneFinValido = HORARIOS_DISPONIBLES.some((hf) =>
                          hf > h &&
                          rangoDisponible(
                            fecha,
                            h,
                            hf,
                            Number(form.profesionalId)
                          )
                        );

                        return tieneFinValido;
                      })
                      .map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
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

                    {HORARIOS_DISPONIBLES
                      .filter((hf) => hf > form.horaInicio)
                      .filter((hf) =>
                        rangoDisponible(
                          new Date(form.fecha),
                          form.horaInicio,
                          hf,
                          Number(form.profesionalId)
                        )
                      )
                      .map((h) => (
                        <option key={h} value={h}>{h}</option>
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
