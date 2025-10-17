"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import "../styles/Profesionales.css"

export default function RegistrarHorario() {
  const navigate = useNavigate()
  const [sesion, setSesion] = useState(null)
  const [especialidades, setEspecialidades] = useState([])
  const [formData, setFormData] = useState({
    especialidad: "",
    dia: "Lunes",
    horaInicio: "08:00",
    horaFin: "09:00",
  })
  const [errors, setErrors] = useState({})
  const [vistaPrevia, setVistaPrevia] = useState(false)

  const especialidadesDisponibles = [
    "Kinesiología",
    "Psicología",
    "Cardiología",
    "Pediatría",
    "Fonoaudiología",
    "Psiquiatría",
    "Médico Clínico",
    "Psicomotricidad",
  ]

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  // Generar horarios en intervalos de 15 minutos
  const generarHorarios = () => {
    const horarios = []
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hora = h.toString().padStart(2, "0")
        const minuto = m.toString().padStart(2, "0")
        horarios.push(`${hora}:${minuto}`)
      }
    }
    return horarios
  }

  const horariosDisponibles = generarHorarios()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesion")
    if (!sesionActual) {
      navigate("/login")
      return
    }
    const sesionData = JSON.parse(sesionActual)
    setSesion(sesionData)

    // Cargar especialidades del profesional (simulado)
    setEspecialidades(especialidadesDisponibles)
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validarFormulario = () => {
    const newErrors = {}

    if (!formData.especialidad) {
      newErrors.especialidad = "Debe seleccionar una especialidad"
    }

    if (formData.horaInicio >= formData.horaFin) {
      newErrors.horaFin = "La hora de fin debe ser posterior a la hora de inicio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleVistaPrevia = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      setVistaPrevia(true)
    }
  }

  const handleConfirmar = () => {
    const horarios = JSON.parse(localStorage.getItem("horarios") || "[]")

    const nuevoHorario = {
      id: Date.now(),
      profesionalId: sesion.profesionalId,
      nombreProfesional: `${sesion.nombre} ${sesion.apellido}`,
      especialidad: formData.especialidad,
      dia: formData.dia,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
    }

    horarios.push(nuevoHorario)
    localStorage.setItem("horarios", JSON.stringify(horarios))

    navigate("/MisHorarios")
  }

  if (vistaPrevia) {
    return (
      <Fondo>
        <NavBar />
        <div className="main-layout">
          <div className="registro-card2">
            <h2>Vista Previa del Horario</h2>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ color: "#007bff", marginBottom: "15px" }}>Nuevo Horario</h3>
              <p>
                <strong>Especialidad:</strong> {formData.especialidad}
              </p>
              <p>
                <strong>Día:</strong> {formData.dia}
              </p>
              <p>
                <strong>Horario:</strong> {formData.horaInicio} - {formData.horaFin}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="boton-agregar" onClick={handleConfirmar}>
                Confirmar y Guardar
              </button>
              <button className="btn btn-secondary" onClick={() => setVistaPrevia(false)}>
                Volver a Editar
              </button>
            </div>
          </div>
        </div>
      </Fondo>
    )
  }

  return (
    <Fondo>
      <NavBar />
      <div className="main-layout">
        <div className="registro-card2">
          <h2>Registrar Nuevo Horario</h2>
          <form onSubmit={handleVistaPrevia}>
            <div className="form-group">
              <label htmlFor="especialidad">Especialidad *</label>
              <select
                id="especialidad"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
              {errors.especialidad && <span className="error-text">{errors.especialidad}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dia">Día de la Semana *</label>
              <select
                id="dia"
                name="dia"
                value={formData.dia}
                onChange={handleChange}
                className="form-control"
                required
              >
                {diasSemana.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="horaInicio">Hora de Inicio *</label>
                <select
                  id="horaInicio"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  {horariosDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="horaFin">Hora de Fin *</label>
                <select
                  id="horaFin"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  {horariosDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
                {errors.horaFin && <span className="error-text">{errors.horaFin}</span>}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="boton-agregar">
                Ver Vista Previa
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/MisHorarios")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fondo>
  )
}
