"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Turnos.css"
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

  const [mostrarFormularioRapido, setMostrarFormularioRapido] = useState(true)
  const [turnoPreview, setTurnoPreview] = useState(null)
  const [especiaFiltradasRapido, setEspeciaFiltradasRapido] = useState([])
  const [profFiltradasRapido, setProfsFiltradasRapido] = useState([])
  const [pacientesFiltradasRapido, setPacientesFiltradasRapido] = useState([])

  // Variables de estado para las búsquedas y filtros rápidos
  const [busquedaPaciente, setBusquedaPaciente] = useState("")
  const [busquedaEspecialidad, setBusquedaEspecialidad] = useState("")
  const [busquedaProfesional, setBusquedaProfesional] = useState("")
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("")
  const [filtroProfesional, setFiltroProfesional] = useState("")
  const [filtroProfesionalHeader, setFiltroProfesionalHeader] = useState("")
  const [busquedaPacienteHeader, setBusquedaPacienteHeader] = useState("")
  const [filtroPacienteHeader, setFiltroPacienteHeader] = useState("")
  const [pacientesFiltradasHeader, setPacientesFiltradasHeader] = useState([])

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

  // Especialidades: solo cuando cambia busquedaEspecialidad
  useEffect(() => {
    if (!busquedaEspecialidad || busquedaEspecialidad.trim() === "") {
      setEspeciaFiltradasRapido([])
      return
    }
    const filtradasEsp = especialidades.filter((esp) =>
      esp.nombre?.toLowerCase().includes(busquedaEspecialidad.toLowerCase()),
    )
    setEspeciaFiltradasRapido(filtradasEsp)
  }, [busquedaEspecialidad, especialidades])

  // Profesionales: cuando cambia busquedaProfesional o filtroEspecialidad
  useEffect(() => {
    if (!busquedaProfesional || !busquedaProfesional.trim()) {
      // si no escribe, vaciar resultados (evita mostrar cuando escribe en otros campos)
      setProfsFiltradasRapido([])
      return
    }

    let profsFiltrados = profesionales.filter(
      (prof) =>
        prof.nombre?.toLowerCase().includes(busquedaProfesional.toLowerCase()) ||
        prof.apellido?.toLowerCase().includes(busquedaProfesional.toLowerCase()),
    )

    if (filtroEspecialidad) {
      profsFiltrados = profsFiltrados.filter((prof) =>
        prof.especialidades?.some((esp) => esp.id === Number.parseInt(filtroEspecialidad)),
      )
    }

    setProfsFiltradasRapido(profsFiltrados)
  }, [busquedaProfesional, filtroEspecialidad, profesionales])

  // Pacientes (rápido): cuando cambia busquedaPaciente
  useEffect(() => {
    if (!busquedaPaciente || !busquedaPaciente.trim()) {
      setPacientesFiltradasRapido([])
      return
    }

    // Solo filtrar si el texto NO es un nombre completo de paciente seleccionado
    const pacienteSeleccionadoEnBusqueda = pacientes.find((pac) => `${pac.nombre} ${pac.apellido}` === busquedaPaciente)

    if (pacienteSeleccionadoEnBusqueda) {
      setPacientesFiltradasRapido([]) // Si ya está seleccionado, no mostrar dropdown
      return
    }

    const pacientesFiltrados = pacientes.filter((pac) =>
      `${pac.nombre} ${pac.apellido}`.toLowerCase().includes(busquedaPaciente.toLowerCase()),
    )
    setPacientesFiltradasRapido(pacientesFiltrados)
  }, [busquedaPaciente, pacientes])

  useEffect(() => {
    if (!busquedaPacienteHeader || !busquedaPacienteHeader.trim()) {
      setPacientesFiltradasHeader([])
      return
    }

    // Solo filtrar si el texto NO es un nombre completo de paciente seleccionado
    const pacienteSeleccionadoEnBusqueda = pacientes.find(
      (pac) => `${pac.nombre} ${pac.apellido}` === busquedaPacienteHeader,
    )

    if (pacienteSeleccionadoEnBusqueda) {
      setPacientesFiltradasHeader([]) // Si ya está seleccionado, no mostrar dropdown
      return
    }

    const pacientesFiltradasHeaderResult = pacientes.filter((pac) =>
      `${pac.nombre} ${pac.apellido}`.toLowerCase().includes(busquedaPacienteHeader.toLowerCase()),
    )
    setPacientesFiltradasHeader(pacientesFiltradasHeaderResult)
  }, [busquedaPacienteHeader, pacientes])

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
    let turnosFiltrados = turnosProgramados.filter((t) => t.fecha === fechaStr)

    if (filtroProfesionalHeader) {
      turnosFiltrados = turnosFiltrados.filter((t) => t.profesionalId === Number.parseInt(filtroProfesionalHeader))
    }

    if (filtroPacienteHeader) {
      turnosFiltrados = turnosFiltrados.filter((t) => t.pacienteId === Number.parseInt(filtroPacienteHeader))
    }

    return turnosFiltrados
  }

  const formatearFecha = (fecha) => {
    // Si ya es un string en formato YYYY-MM-DD, devolverlo directamente
    if (typeof fecha === "string" && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return fecha
    }

    if (fecha instanceof Date) {
      const año = fecha.getFullYear()
      const mes = String(fecha.getMonth() + 1).padStart(2, "0")
      const dia = String(fecha.getDate()).padStart(2, "0")
      return `${año}-${mes}-${dia}`
    }

    // Si es otro formato de string, intentar parsearlo sin conversión
    if (typeof fecha === "string") {
      // Si es formato YYYY-MM-DD, devolverlo directamente
      if (fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return fecha
      }
      // Para otros formatos, crear Date y formatear localmente
      const partes = fecha.split(/[-/]/)
      if (partes.length === 3) {
        const dateObj = new Date(partes[0], partes[1] - 1, partes[2])
        const año = dateObj.getFullYear()
        const mes = String(dateObj.getMonth() + 1).padStart(2, "0")
        const dia = String(dateObj.getDate()).padStart(2, "0")
        return `${año}-${mes}-${dia}`
      }
    }

    return fecha
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
    // Buscar el paciente completo para obtener DNI y observaciones
    const paciente = pacientes.find((p) => p.id === turno.pacienteId)

    // Enriquecer el objeto turno con los datos del paciente
    const turnoEnriquecido = {
      ...turno,
      pacienteDni: paciente?.dni || null,
      pacienteObservaciones: paciente?.observaciones || null,
    }

    setTurnoSeleccionado(turnoEnriquecido)
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

  const hayConflictoEnPreview = (fecha, horaInicio, horaFin, profesionalId) => {
    if (!profesionalId || !fecha || !horaInicio || !horaFin) return false

    const fechaStr = formatearFecha(fecha)
    const indexInicio = HORARIOS_DISPONIBLES.indexOf(horaInicio)
    const indexFin = HORARIOS_DISPONIBLES.indexOf(horaFin)

    return turnosProgramados.some((t) => {
      if (t.fecha !== fechaStr || t.profesionalId !== Number.parseInt(profesionalId)) return false

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

  // const handleRegistrarRapido = async (e) => {
  //   e.preventDefault()

  //   if (!filtroEspecialidad || !filtroProfesional || !turnoPreview?.fecha || !turnoPreview?.horaInicio) {
  //     alert("Debe completar todos los campos")
  //     return
  //   }

  //   try {
  //     await turnosService.crearTurno({
  //       fecha: turnoPreview.fecha,
  //       horaInicio: turnoPreview.horaInicio,
  //       horaFin:
  //         turnoPreview.horaFin ||
  //         HORARIOS_DISPONIBLES[HORARIOS_DISPONIBLES.indexOf(turnoPreview.horaInicio) + 1] ||
  //         turnoPreview.horaInicio,
  //       pacienteId: Number.parseInt(turnoPreview.pacienteId),
  //       profesionalId: Number.parseInt(filtroProfesional),
  //       especialidadId: Number.parseInt(filtroEspecialidad),
  //       motivoConsulta: "",
  //     })
  //     alert("Turno registrado exitosamente")

  //     const turnosRes = await turnosService.obtenerTurnos()
  //     setTurnosProgramados(turnosRes.data.data || [])

  //     // Reset form
  //     setBusquedaPaciente("")
  //     setBusquedaEspecialidad("")
  //     setBusquedaProfesional("")
  //     setFiltroEspecialidad("")
  //     setFiltroProfesional("")
  //     setTurnoPreview(null)
  //     setMostrarFormularioRapido(false)
  //   } catch (err) {
  //     console.error("Error registrando turno:", err)
  //     alert("Error al registrar el turno")
  //   }
  // }

  const handleConfirmarRegistroRapido = async () => {
    if (
      hayConflictoEnPreview(turnoPreview?.fecha, turnoPreview?.horaInicio, turnoPreview?.horaFin, filtroProfesional)
    ) {
      alert("Este horario ya está ocupado o en conflicto. Por favor, elija otro.")
      return
    }

    if (
      !turnoPreview?.pacienteId ||
      !filtroEspecialidad ||
      !filtroProfesional ||
      !turnoPreview?.fecha ||
      !turnoPreview?.horaInicio ||
      !turnoPreview?.horaFin
    ) {
      alert("Debe completar todos los campos para confirmar el registro.")
      return
    }

    try {
      await turnosService.crearTurno({
        fecha: turnoPreview.fecha,
        horaInicio: turnoPreview.horaInicio,
        horaFin: turnoPreview.horaFin,
        pacienteId: Number.parseInt(turnoPreview.pacienteId),
        profesionalId: Number.parseInt(filtroProfesional),
        especialidadId: Number.parseInt(filtroEspecialidad),
        motivoConsulta: "", // Por ahora, vacío en registro rápido
      })
      alert("Turno registrado exitosamente")

      // Refresh turnos
      const turnosRes = await turnosService.obtenerTurnos()
      setTurnosProgramados(turnosRes.data.data || [])

      setBusquedaPaciente("")
      setTurnoPreview({
        ...turnoPreview,
        pacienteId: null,
        horaInicio: null,
        horaFin: null,
      })
    } catch (err) {
      console.error("Error registrando turno:", err)
      alert("Error al registrar el turno")
    }
  }

  const handleLimpiarFormulario = () => {
    setBusquedaPaciente("")
    setBusquedaEspecialidad("")
    setBusquedaProfesional("")
    setFiltroEspecialidad("")
    setFiltroProfesional("")
    setTurnoPreview(null)
    setProfsFiltradasRapido([]) // Limpiar también los profesionales filtrados
  }

  // Cada<bos>tua celda de la grilla (turno-celda) mide 50px y representa 30 minutos
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

    return horasOcupadas.size >= HORARIOS_DISPONIBLES.length
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
            <div className="header-search-profesional">
              <input
                type="text"
                placeholder="Buscar profesional..."
                value={busquedaProfesional}
                onChange={(e) => {
                  setBusquedaProfesional(e.target.value)
                  // Limpiar filtro si se borra el input
                  if (e.target.value === "") {
                    setFiltroProfesionalHeader("")
                  }
                }}
                className="entrada-busqueda-header"
              />
              {busquedaProfesional && profFiltradasRapido.length > 0 && (
                <div className="lista-desplegable-header">
                  {profFiltradasRapido.map((prof) => (
                    <div
                      key={prof.id}
                      className="item-lista"
                      onClick={() => {
                        setBusquedaProfesional(`${prof.nombre} ${prof.apellido}`)
                        setFiltroProfesionalHeader(prof.id)
                      }}
                    >
                      Dr/a. {prof.apellido}, {prof.nombre}
                    </div>
                  ))}
                </div>
              )}
              {filtroProfesionalHeader && (
                <button
                  className="btn-limpiar-filtro"
                  onClick={() => {
                    setBusquedaProfesional("")
                    setFiltroProfesionalHeader("")
                  }}
                  title="Limpiar filtro"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="header-search-profesional">
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={busquedaPacienteHeader}
                onChange={(e) => {
                  setBusquedaPacienteHeader(e.target.value)
                  if (e.target.value === "") {
                    setFiltroPacienteHeader("")
                  }
                }}
                className="entrada-busqueda-header"
              />
              {busquedaPacienteHeader && pacientesFiltradasHeader.length > 0 && (
                <div className="lista-desplegable-header">
                  {pacientesFiltradasHeader.map((pac) => (
                    <div
                      key={pac.id}
                      className="item-lista"
                      onClick={() => {
                        setBusquedaPacienteHeader(`${pac.nombre} ${pac.apellido}`)
                        setFiltroPacienteHeader(pac.id)
                      }}
                    >
                      {pac.apellido}, {pac.nombre} - DNI: {pac.dni}
                    </div>
                  ))}
                </div>
              )}
              {filtroPacienteHeader && (
                <button
                  className="btn-limpiar-filtro"
                  onClick={() => {
                    setBusquedaPacienteHeader("")
                    setFiltroPacienteHeader("")
                  }}
                  title="Limpiar filtro"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="calendario-semanal-layout">
            <div className="contenedor-principal-calendario">
              <div className="vista-semanal">
                <div className="semana-navegacion">
                  <button className="btn-nav-semana" onClick={() => cambiarSemana(-1)}>
                    ← Semana Anterior
                  </button>
                  <div className="semana-actual-texto">
                    {diasSemanaActual[0].getDate()}/{diasSemanaActual[0].getMonth() + 1} -{" "}
                    {diasSemanaActual[5].getDate()}/{diasSemanaActual[5].getMonth() + 1}/
                    {diasSemanaActual[5].getFullYear()}
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
                      <div key={diaIndex} className="dia-columna" style={{ position: "relative" }}>
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

                        {mostrarFormularioRapido &&
                          turnoPreview?.fecha === formatearFecha(dia) &&
                          turnoPreview?.horaInicio && (
                            <div
                              className={`turno-preview-bloque ${
                                hayConflictoEnPreview(
                                  dia,
                                  turnoPreview.horaInicio,
                                  turnoPreview.horaFin,
                                  filtroProfesional,
                                )
                                  ? "conflicto"
                                  : ""
                              }`}
                              style={{
                                position: "absolute",
                                top: `${calcularTopTurno(turnoPreview.horaInicio)}px`,
                                height: `${calcularAlturaTurno(turnoPreview.horaInicio, turnoPreview.horaFin)}px`,
                                left: "2px",
                                right: "2px",
                                zIndex: 15,
                              }}
                            >
                              <div className="preview-texto">
                                {hayConflictoEnPreview(
                                  dia,
                                  turnoPreview.horaInicio,
                                  turnoPreview.horaFin,
                                  filtroProfesional,
                                )
                                  ? "Superposición"
                                  : "Preview"}
                              </div>
                            </div>
                          )}

                        {obtenerTurnosDelDia(dia).length > 0 && (
                          <div className="turnos-contenedor-paralelo">
                            {obtenerTurnosDelDia(dia).map((turno, index) => {
                              const top = calcularTopTurno(turno.horaInicio)
                              const altura = calcularAlturaTurno(turno.horaInicio, turno.horaFin)

                              const turnosEnHorario = obtenerTurnosDelDia(dia).filter((t) => {
                                const tTop = calcularTopTurno(t.horaInicio)
                                const tAltura = calcularAlturaTurno(t.horaInicio, t.horaFin)
                                // Verificar si hay superposición en el tiempo
                                return !(tTop + tAltura <= top || tTop >= top + altura)
                              })

                              const totalTurnosEnHorario = turnosEnHorario.length
                              // Encontrar la posición de este turno dentro de los turnos superpuestos
                              const posicionEnGrupo = turnosEnHorario.findIndex((t) => t.id === turno.id)

                              // Calcular ancho y posición con mejor espaciado
                              const anchoDisponible = 100 / totalTurnosEnHorario
                              const leftPosition = posicionEnGrupo * anchoDisponible

                              return (
                                <div
                                  key={turno.id}
                                  className={`turno-bloque ${turno.estado}`}
                                  style={{
                                    position: "absolute",
                                    top: `${top}px`,
                                    height: `${altura}px`,
                                    left: `${leftPosition}%`,
                                    width: `${anchoDisponible - 1}%`, // -1% para espacio entre bloques
                                    zIndex: 5 + posicionEnGrupo, // Incrementar z-index para que se vean mejor
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
                                  >
                                    ✕
                                  </button>
                                  <div className="turno-hora-bloque">
                                    {turno.horaInicio} - {turno.horaFin}
                                  </div>
                                  <div className="turno-paciente">{turno.paciente || "Sin paciente"}</div>
                                  <div className="turno-especialidad">{turno.especialidad}</div>
                                  {/* {turno.consultorio && (
                                    <div className="turno-consultorio">Cons: {turno.consultorio}</div>
                                  )} */}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-derecho">
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
                  <div className="leyenda-item-mini"></div>
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

              <div className="formulario-registro-sidebar">
                <h3>Registrar Nuevo Turno</h3>

                <div className="formulario-rapido-container">
                  <div className="formulario-rapido">
                    {/* Busqueda de Paciente */}
                    <div className="grupo-entrada">
                      <label>Paciente *</label>
                      <input
                        type="text"
                        placeholder="Buscar paciente por nombre..."
                        value={busquedaPaciente}
                        onChange={(e) => setBusquedaPaciente(e.target.value)}
                        className="entrada-busqueda"
                      />
                      {pacientesFiltradasRapido.length > 0 && (
                        <div className="lista-desplegable">
                          {pacientesFiltradasRapido.map((pac) => (
                            <div
                              key={pac.id}
                              className="item-lista"
                              onClick={() => {
                                setBusquedaPaciente(`${pac.nombre} ${pac.apellido}`)
                                setTurnoPreview((prev) => ({ ...(prev || {}), pacienteId: pac.id }))
                                // Cerrar la lista de resultados inmediatamente
                                setPacientesFiltradasRapido([])
                                // quitar foco del input para evitar que reaparezca el teclado en móvil
                                setTimeout(() => {
                                  const active = document.activeElement
                                  if (active && typeof active.blur === "function") {
                                    active.blur()
                                  }
                                }, 50)
                              }}
                            >
                              {pac.nombre} {pac.apellido} - DNI: {pac.dni}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Busqueda de Especialidad */}
                    <div className="grupo-entrada">
                      <label>Especialidad *</label>
                      <input
                        type="text"
                        placeholder="Buscar especialidad..."
                        value={busquedaEspecialidad}
                        onChange={(e) => setBusquedaEspecialidad(e.target.value)}
                        className="entrada-busqueda"
                      />
                      {busquedaEspecialidad && especiaFiltradasRapido.length > 0 && (
                        <div className="lista-desplegable">
                          {especiaFiltradasRapido.map((esp) => (
                            <div
                              key={esp.id}
                              className="item-lista"
                              onClick={() => {
                                setBusquedaEspecialidad(esp.nombre)
                                setFiltroEspecialidad(esp.id)
                                setTimeout(() => {
                                  setEspeciaFiltradasRapido([])
                                }, 100)
                              }}
                            >
                              {esp.nombre}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Busqueda de Profesional */}
                    <div className="grupo-entrada">
                      <label>Profesional *</label>
                      <input
                        type="text"
                        placeholder="Buscar profesional..."
                        value={busquedaProfesional}
                        onChange={(e) => setBusquedaProfesional(e.target.value)}
                        className="entrada-busqueda"
                      />
                      {busquedaProfesional && profFiltradasRapido.length > 0 && (
                        <div className="lista-desplegable">
                          {profFiltradasRapido.map((prof) => (
                            <div
                              key={prof.id}
                              className="item-lista"
                              onClick={() => {
                                setBusquedaProfesional(`Dr/a. ${prof.apellido}, ${prof.nombre}`)
                                setFiltroProfesional(prof.id)
                                setProfsFiltradasRapido([]) // cerrar dropdown al seleccionar
                              }}
                            >
                              Dr/a. {prof.apellido}, {prof.nombre}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Seleccion de Fecha */}
                    {turnoPreview?.pacienteId && filtroEspecialidad && filtroProfesional && (
                      <div className="grupo-entrada">
                        <label>Fecha *</label>
                        <DatePicker
                          selected={turnoPreview?.fecha ? new Date(turnoPreview.fecha + "T12:00:00") : null}
                          onChange={(date) => {
                            if (date.getDay() === 0) {
                              alert("No se pueden registrar turnos los domingos")
                              return
                            }
                            const año = date.getFullYear()
                            const mes = String(date.getMonth() + 1).padStart(2, "0")
                            const dia = String(date.getDate()).padStart(2, "0")
                            setTurnoPreview({ ...turnoPreview, fecha: `${año}-${mes}-${dia}` })
                          }}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/aaaa"
                          minDate={new Date()}
                          filterDate={(date) => date.getDay() !== 0}
                          wrapperClassName="w-100"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                          onKeyDown={(e) => {
                            const allowedKeys = ["Backspace", "Tab", "Enter", "Delete", "ArrowLeft", "ArrowRight"]
                            if (allowedKeys.includes(e.key) || /^\d$/.test(e.key)) {
                              return
                            }
                            e.preventDefault()
                          }}
                          onInput={(e) => {
                            let valor = e.target.value.replace(/\D/g, "")

                            if (valor.length >= 2) {
                              valor = valor.slice(0, 2) + "/" + valor.slice(2)
                            }
                            if (valor.length >= 5) {
                              valor = valor.slice(0, 5) + "/" + valor.slice(5, 9)
                            }

                            e.target.value = valor
                            setForm({ ...form, fecha: valor })
                          }}
                        />
                      </div>
                    )}

                    {/* Seleccion de Hora Inicio */}
                    {turnoPreview?.fecha && (
                      <div className="grupo-entrada">
                        <label>Hora Inicio *</label>
                        <select
                          value={turnoPreview?.horaInicio || ""}
                          onChange={(e) => {
                            const horaInicio = e.target.value
                            const indexInicio = HORARIOS_DISPONIBLES.indexOf(horaInicio)
                            const horaFin = HORARIOS_DISPONIBLES[indexInicio + 1] || horaInicio
                            setTurnoPreview({ ...turnoPreview, horaInicio, horaFin })
                          }}
                          className="entrada-hora"
                        >
                          <option value="">Seleccionar hora inicio...</option>
                          {HORARIOS_DISPONIBLES.map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Seleccion de Hora Fin */}
                    {turnoPreview?.horaInicio && (
                      <div className="grupo-entrada">
                        <label>Hora Fin *</label>
                        <select
                          value={turnoPreview?.horaFin || ""}
                          onChange={(e) => {
                            setTurnoPreview({ ...turnoPreview, horaFin: e.target.value })
                          }}
                          className="entrada-hora"
                        >
                          <option value="">Seleccionar hora fin...</option>
                          {HORARIOS_DISPONIBLES.filter((h) => h > turnoPreview.horaInicio).map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="botones-formulario">
                      <button
                        type="button"
                        className="btn-confirmar"
                        onClick={handleConfirmarRegistroRapido}
                        disabled={
                          !turnoPreview?.pacienteId ||
                          !filtroEspecialidad ||
                          !filtroProfesional ||
                          !turnoPreview?.fecha ||
                          !turnoPreview?.horaInicio ||
                          !turnoPreview?.horaFin
                        }
                      >
                        Confirmar Registro
                      </button>
                      <button type="button" className="btn-cancelar-form" onClick={handleLimpiarFormulario}>
                        Limpiar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="formulario-registro-debajo-calendario"> moved to sidebar-derecho */}
          {/*   <h3>Registrar Nuevo Turno</h3> */}

          {/*   <div className="formulario-rapido-container"> */}
          {/*     <div className="formulario-rapido"> */}
          {/*       </div> */}
          {/*   </div> */}
          {/* </div> */}
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
                {turnoSeleccionado.pacienteDni && (
                  <div className="detalle-item">
                    <strong>DNI:</strong> {turnoSeleccionado.pacienteDni}
                  </div>
                )}
                {turnoSeleccionado.pacienteObservaciones && (
                  <div className="detalle-item">
                    <strong>Observaciones:</strong> {turnoSeleccionado.pacienteObservaciones}
                  </div>
                )}
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
                {turnoSeleccionado.observaciones && (
                  <div className="detalle-item">
                    <strong>Observaciones del Turno:</strong> {turnoSeleccionado.observaciones}
                  </div>
                )}
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary btn-cancelar-accion"
                  onClick={handleEliminarTurnoDesdeModal}
                >
                  Cancelar Turno
                </button>
                <button className="btn btn-editar-small" onClick={handleEditarTurno}>
                  Editar Turno
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
                      {pacienteSeleccionado.telefono} | <strong>Obra Social:</strong>{" "}
                      {pacienteSeleccionado.obraSocialNombre}
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
                    selected={form.fecha ? new Date(form.fecha + "T12:00:00") : null}
                    onChange={(date) => {
                      if (date.getDay() === 0) {
                        alert("No se pueden registrar turnos los domingos")
                        return
                      }
                      setForm({ ...form, fecha: date.toISOString().split("T")[0] })
                    }}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/aaaa"
                    minDate={new Date()}
                    filterDate={(date) => date.getDay() !== 0}
                    wrapperClassName="w-100"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                    onKeyDown={(e) => {
                      const allowedKeys = ["Backspace", "Tab", "Enter", "Delete", "ArrowLeft", "ArrowRight"]
                      if (allowedKeys.includes(e.key) || /^\d$/.test(e.key)) {
                        return
                      }
                      e.preventDefault()
                    }}
                    onInput={(e) => {
                      let valor = e.target.value.replace(/\D/g, "")

                      if (valor.length >= 2) {
                        valor = valor.slice(0, 2) + "/" + valor.slice(2)
                      }
                      if (valor.length >= 5) {
                        valor = valor.slice(0, 5) + "/" + valor.slice(5, 9)
                      }

                      e.target.value = valor
                      setForm({ ...form, fecha: valor })
                    }}
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
                      setForm({ ...form, horaInicio: e.target.value, horaFin: "" })
                    }}
                  >
                    <option value="">Seleccione hora</option>

                    {HORARIOS_DISPONIBLES.filter((h) => {
                      if (!form.fecha || !form.profesionalId) return false

                      const fecha = new Date(form.fecha)

                      const tieneFinValido = HORARIOS_DISPONIBLES.some(
                        (hf) => hf > h && rangoDisponible(fecha, h, hf, Number(form.profesionalId)),
                      )

                      return tieneFinValido
                    }).map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
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

                    {HORARIOS_DISPONIBLES.filter((hf) => hf > form.horaInicio)
                      .filter((hf) =>
                        rangoDisponible(new Date(form.fecha), form.horaInicio, hf, Number(form.profesionalId)),
                      )
                      .map((h) => (
                        <option key={h} value={h}>
                          {h}
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
                <button
                  type="button"
                  className="btn btn-secondary btn-cancelar-accion"
                  onClick={() => setMostrarFormulario(false)}
                >
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
