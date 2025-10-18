"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import "../styles/Profesionales.css"

const ListarConsultorios = () => {
  const navigate = useNavigate()

  const consultoriosIniciales = () => {
    const guardados = localStorage.getItem("consultorios")
    if (guardados) {
      return JSON.parse(guardados)
    }
    // Datos de ejemplo si no hay nada guardado
    return [
      {
        id: 1,
        numero: "101",
        nombre: "Consultorio de Cardiología",
        especialidades: ["Cardiología"],
        piso: "1",
        ubicacion: "Ala Norte",
        estado: "disponible",
        horariosDisponibles: ["08:00-09:00", "09:00-10:00", "14:00-15:00", "15:00-16:00"],
      },
      {
        id: 2,
        numero: "102",
        nombre: "Consultorio de Pediatría, Psicología",
        especialidades: ["Pediatría", "Psicología"],
        piso: "1",
        ubicacion: "Ala Sur",
        estado: "disponible",
        horariosDisponibles: ["09:00-10:00", "10:00-11:00", "15:00-16:00", "16:00-17:00"],
      },
      {
        id: 3,
        numero: "201",
        nombre: "Consultorio de Kinesiología",
        especialidades: ["Kinesiología"],
        piso: "2",
        ubicacion: "Ala Norte",
        estado: "no-disponible",
        horariosDisponibles: ["08:00-09:00", "09:00-10:00"],
      },
    ]
  }

  const [consultorios, setConsultorios] = useState(consultoriosIniciales)

  const actualizarConsultorios = (nuevosConsultorios) => {
    setConsultorios(nuevosConsultorios)
    localStorage.setItem("consultorios", JSON.stringify(nuevosConsultorios))
  }

  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [modalBaja, setModalBaja] = useState({ visible: false, consultorio: null, tipo: "" })

  const consultoriosFiltrados = consultorios.filter((consultorio) => {
    const cumpleFiltroEstado = filtroEstado === "todos" || consultorio.estado === filtroEstado
    const cumpleBusqueda =
      consultorio.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      consultorio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      consultorio.ubicacion.toLowerCase().includes(busqueda.toLowerCase())

    return cumpleFiltroEstado && cumpleBusqueda
  })

  const handleEditar = (id) => {
    console.log("Editar consultorio:", id)
    navigate(`/EditarConsultorio/${id}`)
  }

  const handleDarDeBaja = (consultorio, tipo) => {
    // HU4: Validar si hay turnos futuros antes de dar de baja
    // En producción, esto vendría del backend
    const hayTurnosFuturos = false // Simulación

    if (hayTurnosFuturos) {
      alert("No se puede dar de baja el consultorio porque tiene turnos asignados en el futuro.")
      return
    }

    setModalBaja({ visible: true, consultorio, tipo })
  }

  const confirmarBaja = () => {
    const { consultorio, tipo } = modalBaja

    const consultoriosActualizados = consultorios.map((c) =>
      c.id === consultorio.id ? { ...c, estado: "no-disponible", tipoBaja: tipo } : c,
    )

    actualizarConsultorios(consultoriosActualizados)

    console.log(`Consultorio ${consultorio.numero} dado de baja (${tipo})`)
    alert(`Consultorio dado de baja ${tipo === "temporal" ? "temporalmente" : "permanentemente"}`)

    setModalBaja({ visible: false, consultorio: null, tipo: "" })
  }

  const cancelarBaja = () => {
    setModalBaja({ visible: false, consultorio: null, tipo: "" })
  }

  const handleAgregar = () => {
    navigate("/AgregarConsultorio")
  }

  const handleHabilitar = (consultorio) => {
    const consultoriosActualizados = consultorios.map((c) =>
      c.id === consultorio.id ? { ...c, estado: "disponible", tipoBaja: null } : c,
    )

    actualizarConsultorios(consultoriosActualizados)

    console.log(`Consultorio ${consultorio.numero} habilitado`)
    alert(`Consultorio ${consultorio.nombre} habilitado exitosamente`)
  }

  return (
    <>
      <NavBar />
      <div className="main-layout">
        <aside className="sidebar">
          <h4>Filtros</h4>
          <button
            className={`specialty-button ${filtroEstado === "todos" ? "active" : ""}`}
            onClick={() => setFiltroEstado("todos")}
          >
            Todos
          </button>
          <button
            className={`specialty-button ${filtroEstado === "disponible" ? "active" : ""}`}
            onClick={() => setFiltroEstado("disponible")}
          >
            Disponibles
          </button>
          <button
            className={`specialty-button ${filtroEstado === "no-disponible" ? "active" : ""}`}
            onClick={() => setFiltroEstado("no-disponible")}
          >
            No Disponibles
          </button>

          <div className="mt-4">
            <label htmlFor="busqueda" className="form-label">
              Buscar
            </label>
            <input
              type="text"
              className="form-control"
              id="busqueda"
              placeholder="Número, nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button className="boton-agregar w-100" onClick={handleAgregar}>
              + Agregar Consultorio
            </button>
          </div>
        </aside>

        <div className="professional-list">
          <h2>Consultorios</h2>

          <div className="cards-container">
            {consultoriosFiltrados.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No se encontraron consultorios</p>
              </div>
            ) : (
              consultoriosFiltrados.map((consultorio) => (
                <div key={consultorio.id} className="professional-card">
                  <h3 style={{ color: "#007bff", marginBottom: "0.5rem" }}>{consultorio.nombre}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>Consultorio N° {consultorio.numero}</p>

                  <div style={{ marginTop: "1rem", textAlign: "left" }}>
                    <p>
                      <strong>Piso:</strong> {consultorio.piso}
                    </p>
                    <p>
                      <strong>Ubicación:</strong> {consultorio.ubicacion}
                    </p>
                    <p>
                      <strong>Estado:</strong>{" "}
                      <span
                        style={{
                          color: consultorio.estado === "disponible" ? "#28a745" : "#dc3545",
                          fontWeight: "bold",
                        }}
                      >
                        {consultorio.estado === "disponible" ? "Disponible" : "No Disponible"}
                      </span>
                    </p>
                    {/* Reemplazado equipamiento por especialidades */}
                    <p>
                      <strong>Especialidades:</strong> {consultorio.especialidades.join(", ")}
                    </p>
                  </div>

                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e0e0e0" }}>
                    <h5 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Horarios Disponibles:</h5>
                    <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem" }}>
                      {consultorio.horariosDisponibles.map((horario, index) => (
                        <li key={index}>• {horario}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexDirection: "column" }}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEditar(consultorio.id)}>
                      Editar
                    </button>
                    {consultorio.estado === "disponible" ? (
                      <>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDarDeBaja(consultorio, "temporal")}
                        >
                          Baja Temporal
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDarDeBaja(consultorio, "permanente")}
                        >
                          Eliminar
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-success btn-sm" onClick={() => handleHabilitar(consultorio)}>
                        Habilitar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {modalBaja.visible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h3>Confirmar Baja {modalBaja.tipo === "temporal" ? "Temporal" : "Permanente"}</h3>
            <p style={{ marginTop: "1rem" }}>
              ¿Está seguro que desea dar de baja {modalBaja.tipo === "temporal" ? "temporalmente" : "permanentemente"}{" "}
              el consultorio <strong>{modalBaja.consultorio?.nombre}</strong>?
            </p>
            {modalBaja.tipo === "permanente" && (
              <p style={{ color: "#dc3545", fontWeight: "bold" }}>Advertencia: Esta acción no se puede deshacer.</p>
            )}
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={cancelarBaja}>
                Cancelar
              </button>
              <button
                className={`btn ${modalBaja.tipo === "temporal" ? "btn-warning" : "btn-danger"}`}
                onClick={confirmarBaja}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ListarConsultorios
