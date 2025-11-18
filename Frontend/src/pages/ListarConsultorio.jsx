"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import { obtenerConsultorios, cambiarEstadoConsultorio, eliminarConsultorio } from "../services/consultoriosService"
import "../styles/Profesionales.css"

const ListarConsultorios = () => {
  const navigate = useNavigate()
  const [consultorios, setConsultorios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [modalBaja, setModalBaja] = useState({ visible: false, consultorio: null, tipo: "" })

  useEffect(() => {
    const cargarConsultorios = async () => {
      try {
        setCargando(true)
        const data = await obtenerConsultorios()
        setConsultorios(data)
      } catch (error) {
        console.error("Error al cargar consultorios:", error)
        alert("Error al cargar consultorios")
      } finally {
        setCargando(false)
      }
    }

    cargarConsultorios()
  }, [])

  const consultoriosFiltrados = consultorios.filter((consultorio) => {
    const cumpleFiltroEstado = filtroEstado === "todos" || consultorio.estado === filtroEstado
    const cumpleBusqueda =
      consultorio.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      consultorio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      consultorio.ubicacion.toLowerCase().includes(busqueda.toLowerCase())

    return cumpleFiltroEstado && cumpleBusqueda
  })

  const handleEditar = (id) => {
    navigate(`/EditarConsultorio/${id}`)
  }

  const handleDarDeBaja = (consultorio, tipo) => {
    setModalBaja({ visible: true, consultorio, tipo })
  }

  const confirmarBaja = async () => {
    const { consultorio, tipo } = modalBaja

    try {
      await cambiarEstadoConsultorio(consultorio.id, "no-disponible", tipo)

      setConsultorios(
        consultorios.map((c) =>
          c.id === consultorio.id ? { ...c, estado: "no-disponible", tipoBaja: tipo } : c
        )
      )

      alert(`Consultorio dado de baja ${tipo === "temporal" ? "temporalmente" : "permanentemente"}`)
      setModalBaja({ visible: false, consultorio: null, tipo: "" })
    } catch (error) {
      console.error("Error al cambiar estado:", error)
      alert("Error al cambiar estado: " + error.message)
    }
  }

  const cancelarBaja = () => {
    setModalBaja({ visible: false, consultorio: null, tipo: "" })
  }

  const handleAgregar = () => {
    navigate("/AgregarConsultorio")
  }

  const handleHabilitar = async (consultorio) => {
    try {
      await cambiarEstadoConsultorio(consultorio.id, "disponible")

      setConsultorios(
        consultorios.map((c) => (c.id === consultorio.id ? { ...c, estado: "disponible", tipoBaja: null } : c))
      )

      alert(`Consultorio ${consultorio.nombre} habilitado exitosamente`)
    } catch (error) {
      console.error("Error al habilitar:", error)
      alert("Error al habilitar: " + error.message)
    }
  }

  const handleEliminar = async (consultorio) => {
    if (window.confirm(`¿Está seguro que desea eliminar permanentemente ${consultorio.nombre}?`)) {
      try {
        await eliminarConsultorio(consultorio.id)
        setConsultorios(consultorios.filter((c) => c.id !== consultorio.id))
        alert("Consultorio eliminado exitosamente")
      } catch (error) {
        console.error("Error al eliminar:", error)
        alert("Error al eliminar: " + error.message)
      }
    }
  }

  if (cargando) {
    return (
      <>
        <NavBar />
        <div className="main-layout">
          <div className="professional-list" style={{ textAlign: "center" }}>
            <p>Cargando consultorios...</p>
          </div>
        </div>
      </>
    )
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
                          onClick={() => handleEliminar(consultorio)}
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
