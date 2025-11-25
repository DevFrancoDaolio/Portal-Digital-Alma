"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import "../styles/MisHorarios.css"


export default function MisHorarios() {
  const navigate = useNavigate()
  const [sesion, setSesion] = useState(null)
  const [horarios, setHorarios] = useState([])
  const [modalNuevoHorario, setModalNuevoHorario] = useState(false)
  const [horarioEditar, setHorarioEditar] = useState(null)

useEffect(() => {
  const horariosGuardados = JSON.parse(localStorage.getItem("horarios") || "[]")
  setHorarios(horariosGuardados)
}, [])



  const handleEliminar = (id) => {
    if (window.confirm("¿Está seguro de eliminar este horario?")) {
      const nuevosHorarios = horarios.filter((h) => h.id !== id)
      setHorarios(nuevosHorarios)
      localStorage.setItem("horarios", JSON.stringify(nuevosHorarios))
    }
  }

  const handleEditar = (horario) => {
    setHorarioEditar(horario)
    setModalNuevoHorario(true)
  }

  const handleNuevoHorario = () => {
    setHorarioEditar(null)
    setModalNuevoHorario(true)
  }

  const handleCerrarModal = () => {
    setModalNuevoHorario(false)
    setHorarioEditar(null)
    // Recargar horarios
    const horariosGuardados = JSON.parse(localStorage.getItem("horarios") || "[]")
    setHorarios(horariosGuardados)
  }

  const obtenerColorHorario = (horaId) => {
    const colores = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8", "#6f42c1"]
    return colores[horaId % colores.length]
  }

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  const horariosPorDia = {}
  diasSemana.forEach((dia) => {
    horariosPorDia[dia] = horarios.filter((h) => h.dia === dia)
  })

  return (
    <Fondo>
      <NavBar />
      <div className="main-layout-horario-sin-sidebar">
        <main className="contenido-horario">
          <button className="btn-volver" onClick={() => navigate("/ListarProfesionales")}>
            ←
          </button>

          <div className="card-horario-calendario">
            <div className="header-grilla">
              <h1 className="titulo-calendario">Mis Horarios</h1>
              <button className="btn-registrar-horario-grilla" onClick={handleNuevoHorario}>
                + Registrar Nuevo Horario
              </button>
            </div>

            {horarios.length === 0 ? (
              <div className="sin-horarios-grilla">
                <p>No hay horarios registrados</p>
                <button className="boton-agregar" onClick={handleNuevoHorario}>
                  Registrar Primer Horario
                </button>
              </div>
            ) : (
              <div className="resumen-detallado-columnas">
                {diasSemana.map((dia) => (
                  <div key={dia} className="columna-resumen-detallada">
                    <div className="dia-titulo">{dia}</div>
                    <div className="listado-horarios">
                      {horariosPorDia[dia].length > 0 ? (
                        horariosPorDia[dia].map((horario) => (
                          <div
                            key={horario.id}
                            className="card-horario-resumen"
                            style={{
                              borderLeftColor: obtenerColorHorario(horario.id),
                            }}
                          >
                              <div className="acciones-grilla-top">
                              <button
                                className="btn-editar-grilla"
                                onClick={() => handleEditar(horario)}
                                title="Editar horario"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>

                              <button
                                className="btn-eliminar-grilla"
                                onClick={() => handleEliminar(horario.id)}
                                title="Eliminar horario"
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                            <div className="horario-tiempo">{horario.horaInicio}</div>
                            <div className="horario-hasta">hasta {horario.horaFin}</div>
                          </div>
                        ))
                      ) : (
                        <div className="sin-horarios-dia">
                          <p>Sin horarios</p>
                          <button className="btn-agregar-dia" onClick={handleNuevoHorario} title="Agregar horario">
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {modalNuevoHorario && (
        <ModalHorario horario={horarioEditar} onClose={handleCerrarModal} onSave={handleCerrarModal} />
      )}
    </Fondo>
  )
}

function ModalHorario({ horario, onClose, onSave }) {
  const [formData, setFormData] = useState({
    dia: horario?.dia || "Lunes",
    horaInicio: horario?.horaInicio || "08:00",
    horaFin: horario?.horaFin || "09:00",
  })
  const [errors, setErrors] = useState({})
  const [vistaPrevia, setVistaPrevia] = useState(false)

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

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
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

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
    const conflicto = horarios.some((h) => {
      // Si estamos editando, excluir el horario actual de la validación
      if (horario && h.id === horario.id) return false

      if (h.dia !== formData.dia) return false

      const [horaInicioExistenteH, horaInicioExistenteM] = h.horaInicio.split(":").map(Number)
      const [horaFinExistenteH, horaFinExistenteM] = h.horaFin.split(":").map(Number)
      const [horaInicioNuevaH, horaInicioNuevaM] = formData.horaInicio.split(":").map(Number)
      const [horaFinNuevaH, horaFinNuevaM] = formData.horaFin.split(":").map(Number)

      const inicioExistenteMinutos = horaInicioExistenteH * 60 + horaInicioExistenteM
      const finExistenteMinutos = horaFinExistenteH * 60 + horaFinExistenteM
      const inicioNuevaMinutos = horaInicioNuevaH * 60 + horaInicioNuevaM
      const finNuevaMinutos = horaFinNuevaH * 60 + horaFinNuevaM

      return (
        (inicioNuevaMinutos >= inicioExistenteMinutos && inicioNuevaMinutos < finExistenteMinutos) ||
        (finNuevaMinutos > inicioExistenteMinutos && finNuevaMinutos <= finExistenteMinutos) ||
        (inicioNuevaMinutos <= inicioExistenteMinutos && finNuevaMinutos >= finExistenteMinutos)
      )
    })

    if (conflicto) {
      newErrors.general = `Ya existe un horario que se solapa en el día ${formData.dia}`
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

    if (horario) {
      // Editar horario existente
      const index = horarios.findIndex((h) => h.id === horario.id)
      if (index !== -1) {
        horarios[index] = {
          ...horarios[index],
          dia: formData.dia,
          horaInicio: formData.horaInicio,
          horaFin: formData.horaFin,
        }
      }
    } else {
      // Crear nuevo horario
      const nuevoHorario = {
        id: Date.now(),
        profesionalId: 1,
        nombreProfesional: "Profesional Demo",
        dia: formData.dia,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin,
      }
      horarios.push(nuevoHorario)
    }

    localStorage.setItem("horarios", JSON.stringify(horarios))
    onSave()
  }

  if (vistaPrevia) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content-horario" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Vista Previa del Horario</h2>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body-horario">
            <div className="vista-previa-content">
              <h3>{horario ? "Horario Modificado" : "Nuevo Horario"}</h3>
              <p>
                <strong>Día:</strong> {formData.dia}
              </p>
              <p>
                <strong>Horario:</strong> {formData.horaInicio} - {formData.horaFin}
              </p>
            </div>
            <div className="modal-footer">
              <button className="boton-agregar" onClick={handleConfirmar}>
                Confirmar y Guardar
              </button>
              <button className="btn-secundario" onClick={() => setVistaPrevia(false)}>
                Volver a Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-horario" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{horario ? "Editar Horario" : "Registrar Nuevo Horario"}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body-horario">
          {errors.general && <div className="alert-error">{errors.general}</div>}
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

            <div className="modal-footer">
              <button type="submit" className="boton-agregar">
                Ver Vista Previa
              </button>
              <button type="button" className="btn-secundario" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
