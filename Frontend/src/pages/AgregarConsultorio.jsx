"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import { crearConsultorio, actualizarConsultorio, obtenerConsultorioPorId } from "../services/consultoriosService"
import { getEspecialidades } from "../services/especialidadesService"
import "../styles/Profesionales.css"

const AgregarConsultorio = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const modoEdicion = !!id

  const horariosDisponibles = [
    { id: 1, horario: "08:00-09:00", seleccionado: false },
    { id: 2, horario: "09:00-10:00", seleccionado: false },
    { id: 3, horario: "10:00-11:00", seleccionado: false },
    { id: 4, horario: "11:00-12:00", seleccionado: false },
    { id: 5, horario: "12:00-13:00", seleccionado: false },
    { id: 6, horario: "13:00-14:00", seleccionado: false },
    { id: 7, horario: "14:00-15:00", seleccionado: false },
    { id: 8, horario: "15:00-16:00", seleccionado: false },
    { id: 9, horario: "16:00-17:00", seleccionado: false },
    { id: 10, horario: "17:00-18:00", seleccionado: false },
    { id: 11, horario: "18:00-19:00", seleccionado: false },
    { id: 12, horario: "19:00-20:00", seleccionado: false },
  ]

  const [formData, setFormData] = useState({
    numero: "",
    nombre: "",
    piso: "",
    ubicacion: "",
  })

  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([])
  const [horarios, setHorarios] = useState(horariosDisponibles)
  const [errors, setErrors] = useState({})
  const [cargando, setCargando] = useState(false)
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([])

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const response = await getEspecialidades()
        setEspecialidadesDisponibles(response.data || [])
      } catch (error) {
        console.error("Error al cargar especialidades:", error)
        alert("Error al cargar especialidades")
      }
    }
    cargarEspecialidades()
  }, [])

  useEffect(() => {
    if (modoEdicion) {
      const cargarConsultorio = async () => {
        try {
          setCargando(true)
          const consultorio = await obtenerConsultorioPorId(Number(id))

          setFormData({
            numero: consultorio.numero,
            nombre: consultorio.nombre,
            piso: consultorio.piso,
            ubicacion: consultorio.ubicacion,
          })
          setEspecialidadesSeleccionadas(consultorio.especialidades || [])

          const horariosActualizados = horariosDisponibles.map((h) => ({
            ...h,
            seleccionado: consultorio.horariosDisponibles?.includes(h.horario) || false,
          }))
          setHorarios(horariosActualizados)
        } catch (error) {
          console.error("Error al cargar consultorio:", error)
          alert("Error al cargar consultorio")
          navigate("/ListarConsultorio")
        } finally {
          setCargando(false)
        }
      }

      cargarConsultorio()
    }
  }, [id, modoEdicion, navigate])

  useEffect(() => {
    if (especialidadesSeleccionadas.length > 0) {
      const nombreGenerado = `Consultorio de ${especialidadesSeleccionadas.join(", ")}`
      setFormData((prev) => ({
        ...prev,
        nombre: nombreGenerado,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        nombre: "",
      }))
    }
  }, [especialidadesSeleccionadas])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleEspecialidadChange = (especialidad) => {
    if (especialidadesSeleccionadas.includes(especialidad)) {
      setEspecialidadesSeleccionadas(especialidadesSeleccionadas.filter((e) => e !== especialidad))
    } else {
      setEspecialidadesSeleccionadas([...especialidadesSeleccionadas, especialidad])
    }
    if (errors.especialidades) {
      setErrors({
        ...errors,
        especialidades: "",
      })
    }
  }

  const handleHorarioChange = (id) => {
    setHorarios(horarios.map((h) => (h.id === id ? { ...h, seleccionado: !h.seleccionado } : h)))
    if (errors.horarios) {
      setErrors({
        ...errors,
        horarios: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.numero.trim()) {
      newErrors.numero = "El número de consultorio es obligatorio"
    }

    if (especialidadesSeleccionadas.length === 0) {
      newErrors.especialidades = "Debe seleccionar al menos una especialidad"
    }

    if (!formData.piso.trim()) {
      newErrors.piso = "El piso es obligatorio"
    }

    if (!formData.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es obligatoria"
    }

    const horariosSeleccionados = horarios.filter((h) => h.seleccionado).length
    if (horariosSeleccionados === 0) {
      newErrors.horarios = "Debe seleccionar al menos un horario disponible"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        setCargando(true)
        const horariosSeleccionados = horarios.filter((h) => h.seleccionado).map((h) => h.horario)

        const consultorioData = {
          numero: formData.numero,
          nombre: formData.nombre,
          especialidades: especialidadesSeleccionadas,
          piso: formData.piso,
          ubicacion: formData.ubicacion,
          horariosDisponibles: horariosSeleccionados,
        }

        if (modoEdicion) {
          await actualizarConsultorio(Number(id), consultorioData)
          alert("Consultorio actualizado exitosamente")
        } else {
          await crearConsultorio(consultorioData)
          alert("Consultorio registrado exitosamente")
        }

        navigate("/ListarConsultorio")
      } catch (error) {
        console.error("Error al guardar consultorio:", error)
        alert("Error al guardar consultorio: " + error.message)
      } finally {
        setCargando(false)
      }
    }
  }

  const handleCancel = () => {
    navigate("/ListarConsultorio")
  }

  if (cargando && modoEdicion) {
    return (
      <>
        <NavBar />
        <div className="registro-card2" style={{ textAlign: "center" }}>
          <p>Cargando consultorio...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className="registro-card2">
        <h2>{modoEdicion ? "Editar Consultorio" : "Registrar Nuevo Consultorio"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="numero" className="form-label">
                Número de Consultorio *
              </label>
              <input
                type="text"
                className={`form-control ${errors.numero ? "is-invalid" : ""}`}
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="Ej: 101"
              />
              {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Especialidades *</label>
              {errors.especialidades && <div className="text-danger mb-2">{errors.especialidades}</div>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {especialidadesDisponibles.map((especialidad) => (
                  <label
                    key={especialidad.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: especialidadesSeleccionadas.includes(especialidad.nombre) ? "#007bff" : "white",
                      color: especialidadesSeleccionadas.includes(especialidad.nombre) ? "white" : "#333",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={especialidadesSeleccionadas.includes(especialidad.nombre)}
                      onChange={() => handleEspecialidadChange(especialidad.nombre)}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {especialidad.nombre}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {especialidadesSeleccionadas.length > 0 && (
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre del Consultorio (generado automáticamente)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  readOnly
                  style={{ backgroundColor: "#f8f9fa" }}
                />
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="piso" className="form-label">
                Piso *
              </label>
              <input
                type="text"
                className={`form-control ${errors.piso ? "is-invalid" : ""}`}
                id="piso"
                name="piso"
                value={formData.piso}
                onChange={handleInputChange}
                placeholder="Ej: 1, 2, PB"
              />
              {errors.piso && <div className="invalid-feedback">{errors.piso}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="ubicacion" className="form-label">
                Ubicación *
              </label>
              <input
                type="text"
                className={`form-control ${errors.ubicacion ? "is-invalid" : ""}`}
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                placeholder="Ej: Ala Norte, Pasillo Central"
              />
              {errors.ubicacion && <div className="invalid-feedback">{errors.ubicacion}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label">Horarios Disponibles *</label>
              {errors.horarios && <div className="text-danger mb-2">{errors.horarios}</div>}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Seleccionar</th>
                    <th>Horario</th>
                  </tr>
                </thead>
                <tbody>
                  {horarios.map((horario) => (
                    <tr key={horario.id}>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          id={`horario-${horario.id}`}
                          checked={horario.seleccionado}
                          onChange={() => handleHorarioChange(horario.id)}
                        />
                      </td>
                      <td>
                        <label htmlFor={`horario-${horario.id}`} style={{ cursor: "pointer", marginBottom: 0 }}>
                          {horario.horario}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex gap-3 justify-content-end">
              <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={cargando}>
                Cancelar
              </button>
              <button type="submit" className="boton-agregar" disabled={cargando}>
                {cargando ? "Guardando..." : modoEdicion ? "Actualizar Consultorio" : "Guardar Consultorio"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AgregarConsultorio
