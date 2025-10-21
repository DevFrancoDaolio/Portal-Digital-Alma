"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getProfesionales, eliminarProfesional, reactivarProfesional } from "../services/profesionalesService"
import { getEspecialidades } from "../services/especialidadesService"
import "../styles/Profesionales.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import EditarProfesionalModal from "./EditarProfesional"

export default function ClinicProfessionals() {
  const [filtro, setFiltro] = useState(null)
  const [professionals, setProfessionals] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalEditar, setModalEditar] = useState(false)
  const [profesionalEditar, setProfesionalEditar] = useState(null)
  const [isAdmin, setIsAdmin] = useState(true)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    cargarProfesionales()
    cargarEspecialidades()
  }, [])

  const cargarEspecialidades = async () => {
    try {
      const response = await getEspecialidades()
      console.log("[v0] Especialidades cargadas:", response.data)
      setEspecialidades(response.data || [])
    } catch (error) {
      console.error("Error al obtener especialidades:", error)
      alert("Error al cargar las especialidades")
      setEspecialidades([])
    }
  }

  const cargarProfesionales = async () => {
    setLoading(true)
    try {
      const response = await getProfesionales()
      console.log("[v0] Profesionales cargados:", response.data)
      setProfessionals(response.data || [])
    } catch (error) {
      console.error("Error al obtener profesionales:", error)
      alert("Error al cargar los profesionales")
      setProfessionals([])
    } finally {
      setLoading(false)
    }
  }

  const filtrados = professionals.filter((p) => {
    const especialidadesNombres = (p.especialidades || []).map((e) => e.nombre)
    const matchEspecialidad = filtro ? especialidadesNombres.includes(filtro) : true
    const matchBusqueda = busqueda ? `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) : true
    return matchEspecialidad && matchBusqueda
  })

  const handleEditarClick = (prof) => {
    setProfesionalEditar(prof)
    setModalEditar(true)
  }

  const handleGuardarEdicion = () => {
    setModalEditar(false)
    setProfesionalEditar(null)
    cargarProfesionales()
  }

  const handleDarDeBajaClick = async (prof) => {
    if (window.confirm(`¿Está seguro que desea dar de baja a ${prof.nombre} ${prof.apellido}?`)) {
      try {
        await eliminarProfesional(prof.id)
        alert("Profesional dado de baja exitosamente")
        cargarProfesionales()
      } catch (error) {
        console.error("Error al dar de baja profesional:", error)
        alert("Error al dar de baja el profesional")
      }
    }
  }

  const handleReactivarClick = async (prof) => {
    if (window.confirm(`¿Está seguro que desea reactivar a ${prof.nombre} ${prof.apellido}?`)) {
      try {
        await reactivarProfesional(prof.id)
        alert("Profesional reactivado exitosamente")
        cargarProfesionales()
      } catch (error) {
        console.error("Error al reactivar profesional:", error)
        alert("Error al reactivar el profesional")
      }
    }
  }

  if (loading) {
    return (
      <Fondo>
        <NavBar />
        <div className="text-center mt-5">
          <p>Cargando profesionales...</p>
        </div>
      </Fondo>
    )
  }

  return (
    <Fondo>
      <div className="clinic-container">
        <NavBar />

        <div className="main-layout">
          <aside className="sidebar">
            <h3>Especialidades</h3>
            <ul className="specialty-list">
              {especialidades.map((esp) => (
                <li key={esp.id}>
                  <button
                    className={`specialty-button ${filtro === esp.nombre ? "active" : ""}`}
                    onClick={() => setFiltro(filtro === esp.nombre ? null : esp.nombre)}
                  >
                    {esp.nombre}
                  </button>
                </li>
              ))}
            </ul>
            {isAdmin && (
              <div className="mt-3">
                <button type="button" className="boton-agregar w-100" onClick={() => navigate("/Especialidad")}>
                  + Agregar especialidad
                </button>
              </div>
            )}
          </aside>

          <main className="professional-list">
            <div className="header-profesionales">
              <div className="header-top">
                <h2>Nuestros Profesionales</h2>
                {isAdmin && (
                  <button type="button" className="boton-agregar" onClick={() => navigate("/RegistrarProfesional")}>
                    + Registrar Profesional
                  </button>
                )}
              </div>
              <div className="search-container mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre o apellido..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div className="cards-container">
              {filtrados.length === 0 ? (
                <p className="text-center">No se encontraron profesionales</p>
              ) : (
                filtrados.map((prof) => {
                  const especialidadPrincipal = (prof.especialidades || []).find((e) => e.esPrincipal)
                  const especialidadTexto = especialidadPrincipal
                    ? especialidadPrincipal.nombre
                    : (prof.especialidades || [])[0]?.nombre || "Sin especialidad"

                  return (
                    <div key={prof.id} className={`professional-card ${!prof.activo ? "inactive" : ""}`}>
                      {!prof.activo && <div className="inactive-badge">Inactivo</div>}

                      <img
                        src={prof.fotoUrl || "/doc1.png"}
                        alt={`${prof.nombre} ${prof.apellido}`}
                        className="doctor-photo"
                      />
                      <strong>
                        {prof.nombre} {prof.apellido}
                      </strong>
                      <p className="especialidades-text">{especialidadTexto}</p>

                      <div className="basic-details">
                        <p className="detail-item">
                          <strong>Email:</strong> {prof.email}
                        </p>
                        <p className="detail-item">
                          <strong>Teléfono:</strong> {prof.telefono}
                        </p>
                      </div>

                      {isAdmin && (
                        <div className="card-actions">
                          <button
                            className="btn-editar-P"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditarClick(prof)
                            }}
                            title="Editar Profesional"
                          >
                            Editar
                          </button>
                          {prof.activo ? (
                            <>
                              <button
                                className="btn-baja"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDarDeBajaClick(prof)
                                }}
                                title="Dar de Baja Temporal"
                              >
                                Dar de Baja
                              </button>

                              <button
                                className="btn-horarios"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigate("/MisHorarios")
                                }}
                                title="Ver y editar horarios"
                              >
                                Mis horarios
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn-reactivar"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReactivarClick(prof)
                              }}
                              title="Reactivar Profesional"
                            >
                              Reactivar
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </main>
        </div>

        {modalEditar && profesionalEditar && (
          <EditarProfesionalModal
            profesional={profesionalEditar}
            onClose={() => {
              setModalEditar(false)
              setProfesionalEditar(null)
            }}
            onSave={handleGuardarEdicion}
          />
        )}
      </div>
    </Fondo>
  )
}
