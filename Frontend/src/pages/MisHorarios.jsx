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
  const [vistaCalendario, setVistaCalendario] = useState(false)

  useEffect(() => {
    // Sesión de prueba para desarrollo
    setSesion({
      profesionalId: 1,
      nombre: "Profesional",
      apellido: "Demo",
    })

    // Cargar horarios desde localStorage
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
    // Guardar el horario a editar en localStorage y navegar
    localStorage.setItem("horarioEditar", JSON.stringify(horario))
    navigate("/RegistrarHorario")
  }

  const handleNuevoHorario = () => {
    localStorage.removeItem("horarioEditar")
    navigate("/RegistrarHorario")
  }

  const generarHorariosDelDia = () => {
    const slots = []
    for (let h = 8; h <= 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hora = h.toString().padStart(2, "0")
        const minuto = m.toString().padStart(2, "0")
        slots.push(`${hora}:${minuto}`)
      }
    }
    return slots
  }

  const estaOcupado = (dia, hora) => {
    return horarios.some((horario) => {
      if (horario.dia !== dia) return false
      const [horaInicioH, horaInicioM] = horario.horaInicio.split(":").map(Number)
      const [horaFinH, horaFinM] = horario.horaFin.split(":").map(Number)
      const [horaActualH, horaActualM] = hora.split(":").map(Number)

      const inicioMinutos = horaInicioH * 60 + horaInicioM
      const finMinutos = horaFinH * 60 + horaFinM
      const actualMinutos = horaActualH * 60 + horaActualM

      return actualMinutos >= inicioMinutos && actualMinutos <= finMinutos
    })
  }

  const obtenerColorHorario = (horaId) => {
    const colores = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8", "#6f42c1"]
    return colores[horaId % colores.length]
  }

  if (vistaCalendario) {
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
    const diasAbrev = ["LUN", "MAR", "MIE", "JUE", "VIE"]
    const todosLosHorarios = generarHorariosDelDia()

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
              <h1 className="titulo-calendario">Mis Horarios</h1>

              <div className="calendario-semanal">
                <div className="dias-container">
                  {diasSemana.map((dia, index) => (
                    <div key={dia} className="columna-dia">
                      <div className="header-dia">{diasAbrev[index]}</div>
                      <div className="slots-dia">
                        {todosLosHorarios.map((hora) => {
                          const ocupado = estaOcupado(dia, hora)
                          const horarioData = horarios.find((h) => h.dia === dia && estaOcupado(dia, hora))
                          return ocupado ? (
                            <div
                              key={hora}
                              className="slot-ocupado"
                              style={{
                                backgroundColor: horarioData ? obtenerColorHorario(horarioData.id) : "#007bff",
                                color: "white",
                              }}
                            >
                              {hora}
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="resumen-detallado-columnas">
                {diasSemana.map((dia) => (
                  <div key={dia} className="columna-resumen-detallada">
                    <div className="dia-titulo">{dia}</div>
                    <div className="listado-horarios">
                      {horariosPorDia[dia].length > 0 ? (
                        horariosPorDia[dia].map((horario, idx) => (
                          <div
                            key={horario.id}
                            className="card-horario-resumen"
                            style={{
                              borderLeftColor: obtenerColorHorario(horario.id),
                            }}
                          >
                            <div className="horario-tiempo">{horario.horaInicio}</div>
                            <div className="horario-hasta">hasta {horario.horaFin}</div>
                          </div>
                        ))
                      ) : (
                        <div className="sin-horarios-dia">Sin horarios</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="footer-calendario">
                <button className="btn-volver-lista" onClick={() => setVistaCalendario(false)}>
                  Volver
                </button>
              </div>
            </div>
          </main>
        </div>
      </Fondo>
    )
  }

  return (
    <Fondo>
      <NavBar />
      <div className="main-layout-horario-sin-sidebar">
        <main className="contenido-horario">
          <button className="btn-volver" onClick={() => navigate("/ListarProfesionales")}>
            ←
          </button>

          <div className="card-horario">
            <div className="header-card">
              <p className="nombre-profesional">
                {sesion ? `${sesion.nombre} ${sesion.apellido}` : "Nombre profesional"}
              </p>
            </div>

            <div className="titulo-container">
              <h1 className="titulo-registro">Horarios de Profesional</h1>
            </div>

            {horarios.length === 0 ? (
              <div className="sin-horarios">
                <p>No hay horarios registrados</p>
                <button className="boton-agregar" onClick={handleNuevoHorario}>
                  Registrar Primer Horario
                </button>
              </div>
            ) : (
              <div className="tabla-horarios">
                <table>
                  <thead>
                    <tr>
                      <th>Horario</th>
                      <th>Días</th>
                      <th>Observaciones</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horarios.map((horario, index) => (
                      <tr key={horario.id}>
                        <td>
                          <strong>Horario {index + 1}</strong>
                        </td>
                        <td>{horario.dia}</td>
                        <td>{`${horario.horaInicio} - ${horario.horaFin}`}</td>
                        <td>
                          <div className="acciones-btns">
                            <button className="btn-editar" onClick={() => handleEditar(horario)} title="Editar">
                              ✏️
                            </button>
                            <button
                              className="btn-eliminar"
                              onClick={() => handleEliminar(horario.id)}
                              title="Eliminar"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="footer-botones-horarios">
              <button className="btn-ver-horario" onClick={() => setVistaCalendario(true)}>
                Ver Horario
              </button>
              <button className="btn-registrar-horario" onClick={handleNuevoHorario}>
                Registrar un Nuevo Horario
              </button>
            </div>
          </div>
        </main>
      </div>
    </Fondo>
  )
}
