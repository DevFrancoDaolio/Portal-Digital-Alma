"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { getProfesionales } from "../services/profesionalesService"
import "../styles/Profesionales.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import EditarProfesionalModal from "./EditarProfesional"

const specialties = [
  "Kinesiología",
  "Psicología",
  "Cardiología",
  "Pediatría",
  "Fonoaudiología",
  "Psiquiatría",
  "Médico Clínico",
  "Psicomotricidad",
]

export default function ClinicProfessionals() {
  const [filtro, setFiltro] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [professionals, setProfessionals] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalEditar, setModalEditar] = useState(false)
  const [profesionalEditar, setProfesionalEditar] = useState(null)
  const [isAdmin, setIsAdmin] = useState(true) // TODO: Replace with real authentication

  const navigate = useNavigate()

  const filtrados = professionals.filter((p) => {
    const matchEspecialidad = filtro ? p.especialidades.includes(filtro) : true
    const matchBusqueda = busqueda ? `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) : true
    return matchEspecialidad && matchBusqueda
  })

  const location = useLocation()

  useEffect(() => {
    const profesionalesLocales = JSON.parse(localStorage.getItem("profesionales") || "[]")

    getProfesionales()
      .then((response) => {
        const profesionalesAPI = response.data || []
        const todosProfesionales = [...profesionalesLocales, ...profesionalesAPI]

        const profesionalesUnicos = todosProfesionales.reduce((acc, prof) => {
          if (!acc.find((p) => p.id === prof.id)) {
            acc.push(prof)
          }
          return acc
        }, [])

        setProfessionals(profesionalesUnicos)
      })
      .catch((error) => {
        console.error("Error al obtener profesionales:", error)
        setProfessionals(profesionalesLocales)
      })
  }, [])

  const handleEditarClick = (prof) => {
    setProfesionalEditar(prof)
    setModalEditar(true)
  }

  const handleGuardarEdicion = (profesionalEditado) => {
    const profesionalesActualizados = professionals.map((p) =>
      p.id === profesionalEditar.id ? { ...p, ...profesionalEditado } : p,
    )

    setProfessionals(profesionalesActualizados)

    const profesionalesLocales = JSON.parse(localStorage.getItem("profesionales") || "[]")
    const profesionalesLocalesActualizados = profesionalesLocales.map((p) =>
      p.id === profesionalEditar.id ? { ...p, ...profesionalEditado } : p,
    )
    localStorage.setItem("profesionales", JSON.stringify(profesionalesLocalesActualizados))

    console.log("Profesional editado:", profesionalEditado)
  }

  const toggleExpand = (profId) => {
    setExpandedId(expandedId === profId ? null : profId)
  }

  return (
    <Fondo>
      <div className="clinic-container">
        <NavBar />

        <div className="main-layout">
          <aside className="sidebar">
            <h3>Especialidades</h3>
            <ul className="specialty-list">
              {specialties.map((esp) => (
                <li key={esp}>
                  <button
                    className={`specialty-button ${filtro === esp ? "active" : ""}`}
                    onClick={() => setFiltro(filtro === esp ? null : esp)}
                  >
                    {esp}
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
              <h2>Nuestros Profesionales</h2>
                {isAdmin && (
                  <button type="button" className="boton-agregar" onClick={() => navigate("/RegistrarProfesional")}>
                    + Registrar Profesional
                  </button>
              )}
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
              {filtrados.map((prof) => {
                const isExpanded = expandedId === prof.id

                return (
                  <div
                    key={prof.id}
                    className={`professional-card ${isExpanded ? "expanded" : ""}`}
                    onClick={() => toggleExpand(prof.id)}
                  >
                    <img
                      src={prof.fotoUrl || "/doc1.png"}
                      alt={`${prof.nombre} ${prof.apellido}`}
                      className="doctor-photo"
                    />
                    <strong>
                      {prof.nombre} {prof.apellido}
                    </strong>
                    <p className="especialidades-text">{prof.especialidades.join(", ")}</p>

                    {isExpanded && (
                      <div className="expanded-details">
                        <p className="detail-item">
                          <strong>Email:</strong> {prof.email}
                        </p>
                        <p className="detail-item">
                          <strong>Teléfono:</strong> {prof.telefono}
                        </p>
                      </div>
                    )}

                    <div className="expand-indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`chevron-icon ${isExpanded ? "rotated" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    {isAdmin && (
                      <button
                        className="edit-icon-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditarClick(prof)
                        }}
                        title="Editar Profesional"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                )
              })}
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
