"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import "../styles/Profesionales.css"

export default function MisHorarios() {
  const navigate = useNavigate()
  const [horarios, setHorarios] = useState([])
  const [sesion, setSesion] = useState(null)
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("todas")

  useEffect(() => {
    // Verificar sesión
    const sesionActual = localStorage.getItem("sesion")
    if (!sesionActual) {
      navigate("/login")
      return
    }
    const sesionData = JSON.parse(sesionActual)
    setSesion(sesionData)

    // Cargar horarios
    const todosHorarios = JSON.parse(localStorage.getItem("horarios") || "[]")

    // Filtrar por profesional si no es admin
    if (sesionData.rol === "profesional") {
      const misHorarios = todosHorarios.filter((h) => h.profesionalId === sesionData.profesionalId)
      setHorarios(misHorarios)
    } else {
      setHorarios(todosHorarios)
    }
  }, [navigate])

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  const horariosPorDia = (dia) => {
    return horarios.filter((h) => {
      if (filtroEspecialidad === "todas") return h.dia === dia
      return h.dia === dia && h.especialidad === filtroEspecialidad
    })
  }

  const especialidadesUnicas = [...new Set(horarios.map((h) => h.especialidad))]

  const handleEliminar = (id) => {
    if (sesion?.rol !== "admin") {
      alert("Solo los administradores pueden eliminar horarios")
      return
    }

    if (window.confirm("¿Estás seguro de eliminar este horario?")) {
      const todosHorarios = JSON.parse(localStorage.getItem("horarios") || "[]")
      const nuevosHorarios = todosHorarios.filter((h) => h.id !== id)
      localStorage.setItem("horarios", JSON.stringify(nuevosHorarios))
      setHorarios(nuevosHorarios.filter((h) => sesion.rol === "admin" || h.profesionalId === sesion.profesionalId))
    }
  }

  return (
    <Fondo>
      <NavBar />
      <div className="main-layout">
        <div className="registro-card2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>Mis Horarios</h2>
            <button className="boton-agregar" onClick={() => navigate("/RegistrarHorario")}>
              + Registrar Nuevo Horario
            </button>
          </div>

          {especialidadesUnicas.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filtrar por especialidad:</label>
              <select
                value={filtroEspecialidad}
                onChange={(e) => setFiltroEspecialidad(e.target.value)}
                className="form-control"
                style={{ display: "inline-block", width: "auto", padding: "8px" }}
              >
                <option value="todas">Todas las especialidades</option>
                {especialidadesUnicas.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>
          )}

          {horarios.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "40px" }}>
              No tienes horarios registrados. Haz clic en "Registrar Nuevo Horario" para comenzar.
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
              {diasSemana.map((dia) => (
                <div
                  key={dia}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "white",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      marginBottom: "15px",
                      color: "#007bff",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {dia}
                  </h3>
                  {horariosPorDia(dia).length === 0 ? (
                    <p style={{ textAlign: "center", color: "#999", fontSize: "14px" }}>Sin horarios</p>
                  ) : (
                    horariosPorDia(dia).map((horario) => (
                      <div
                        key={horario.id}
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "10px",
                          borderRadius: "6px",
                          marginBottom: "10px",
                          fontSize: "14px",
                        }}
                      >
                        <div style={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>
                          {horario.especialidad}
                        </div>
                        <div style={{ color: "#666" }}>
                          {horario.horaInicio} - {horario.horaFin}
                        </div>
                        {sesion?.rol === "admin" && (
                          <div style={{ marginTop: "8px", display: "flex", gap: "5px" }}>
                            <button
                              onClick={() => navigate(`/EditarHorario/${horario.id}`)}
                              style={{
                                padding: "4px 8px",
                                fontSize: "12px",
                                border: "1px solid #007bff",
                                backgroundColor: "white",
                                color: "#007bff",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              title="Editar horario"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEliminar(horario.id)}
                              style={{
                                padding: "4px 8px",
                                fontSize: "12px",
                                border: "1px solid #dc3545",
                                backgroundColor: "white",
                                color: "#dc3545",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              title="Eliminar horario"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fillRule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fondo>
  )
}
