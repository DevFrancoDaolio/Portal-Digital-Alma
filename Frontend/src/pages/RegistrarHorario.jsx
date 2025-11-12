"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import "../styles/Profesionales.css"
import "../styles/RegistrarHorario.css"

export default function RegistrarHorario() {
  const navigate = useNavigate()
  const [sesion, setSesion] = useState(null)
  const [formData, setFormData] = useState({
    dia: "Lunes",
    horaInicio: "08:00",
    horaFin: "09:00",
  })
  const [errors, setErrors] = useState({})
  const [vistaPrevia, setVistaPrevia] = useState(false)

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  // Generar horarios en intervalos de 15 minutos
  const generarHorarios = () => {
    const horarios = []
    for (let h = 8; h <= 18; h++) {
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
    // Sesión de prueba para desarrollo
    setSesion({
      profesionalId: 1,
      nombre: "Profesional",
      apellido: "Demo",
    })
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validarFormulario = () => {
    const newErrors = {}

    if (formData.horaInicio >= formData.horaFin) {
      newErrors.horaFin = "La hora de fin debe ser posterior a la hora de inicio"
    }

    const horarios = JSON.parse(localStorage.getItem("horarios") || "[]")
    const conflicto = horarios.some((horario) => {
      if (horario.dia !== formData.dia) return false

      const [horaInicioExistenteH, horaInicioExistenteM] = horario.horaInicio.split(":").map(Number)
      const [horaFinExistenteH, horaFinExistenteM] = horario.horaFin.split(":").map(Number)
      const [horaInicioNuevaH, horaInicioNuevaM] = formData.horaInicio.split(":").map(Number)
      const [horaFinNuevaH, horaFinNuevaM] = formData.horaFin.split(":").map(Number)

      const inicioExistenteMinutos = horaInicioExistenteH * 60 + horaInicioExistenteM
      const finExistenteMinutos = horaFinExistenteH * 60 + horaFinExistenteM
      const inicioNuevaMinutos = horaInicioNuevaH * 60 + horaInicioNuevaM
      const finNuevaMinutos = horaFinNuevaH * 60 + horaFinNuevaM

      // Check if there's any overlap
      return (
        (inicioNuevaMinutos >= inicioExistenteMinutos && inicioNuevaMinutos < finExistenteMinutos) ||
        (finNuevaMinutos > inicioExistenteMinutos && finNuevaMinutos <= finExistenteMinutos) ||
        (inicioNuevaMinutos <= inicioExistenteMinutos && finNuevaMinutos >= finExistenteMinutos)
      )
    })

    if (conflicto) {
      newErrors.general = `Ya existe un horario para el día ${formData.dia}`
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
      profesionalId: sesion?.profesionalId || 1,
      nombreProfesional: sesion ? `${sesion.nombre} ${sesion.apellido}` : "Profesional Demo",
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
          {errors.general && (
            <div
              style={{
                backgroundColor: "#ffebee",
                color: "#c62828",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid #ef5350",
              }}
            >
              {errors.general}
            </div>
          )}
          <form onSubmit={handleVistaPrevia}>
            <div className="form-group">
              <label htmlFor="dia">Día de la Semana</label>
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
                <label htmlFor="horaInicio">Hora de Inicio</label>
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
                <label htmlFor="horaFin">Hora de Fin</label>
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
