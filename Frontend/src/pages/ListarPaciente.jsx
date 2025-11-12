"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Paciente.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import pacienteService from "../services/pacientesService"

export default function ListarPaciente() {
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [filtroObraSocial, setFiltroObraSocial] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [obrasSociales, setObrasSociales] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const pacientesPorPagina = 10

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      setError(null)

      const [pacientesData, obrasSocialesData] = await Promise.all([
        pacienteService.listar(),
        pacienteService.obtenerObrasSociales(),
      ])

      setPacientes(pacientesData)
      setObrasSociales(obrasSocialesData)
    } catch (err) {
      console.error("Error al cargar datos:", err)
      setError("Error al cargar los datos. Por favor, intente nuevamente.")
    } finally {
      setCargando(false)
    }
  }

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const cumpleBusqueda =
      paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      paciente.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      paciente.dni.includes(busqueda)

    const cumpleObraSocial = !filtroObraSocial || paciente.obraSocialNombre === filtroObraSocial

    return cumpleBusqueda && cumpleObraSocial
  })

  const indiceUltimo = paginaActual * pacientesPorPagina
  const indicePrimero = indiceUltimo - pacientesPorPagina
  const pacientesPaginados = pacientesFiltrados.slice(indicePrimero, indiceUltimo)
  const totalPaginas = Math.ceil(pacientesFiltrados.length / pacientesPorPagina)

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina)
  }

  const verDetallesPaciente = (paciente) => {
    setPacienteSeleccionado(paciente)
    setMostrarModal(true)
  }

  const cerrarModal = () => {
    setMostrarModal(false)
    setPacienteSeleccionado(null)
  }

  if (cargando) {
    return (
      <Fondo>
        <NavBar />
        <div className="registro-card">
          <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando pacientes...</p>
          </div>
        </div>
      </Fondo>
    )
  }

  if (error) {
    return (
      <Fondo>
        <NavBar />
        <div className="registro-card">
          <div className="container mt-5">
            <div className="alert alert-danger" role="alert">
              {error}
              <button className="btn btn-primary mt-3" onClick={cargarDatos}>
                Reintentar
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

      <div className="registro-card">
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Pacientes</h2>
            <button type="button" className="boton-agregar" onClick={() => navigate("/RegistrarPaciente")}>
              + Registrar Paciente
            </button>
          </div>

          <div className="row mb-4">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, apellido o DNI..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value)
                  setPaginaActual(1)
                }}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filtroObraSocial}
                onChange={(e) => {
                  setFiltroObraSocial(e.target.value)
                  setPaginaActual(1)
                }}
              >
                <option value="">Todas las obras sociales</option>
                {obrasSociales.map((obra) => (
                  <option key={obra.id} value={obra.nombre}>
                    {obra.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {pacientesPaginados.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Teléfono</th>
                      <th>Obra Social</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientesPaginados.map((paciente) => (
                      <tr key={paciente.id}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.apellido}</td>
                        <td>{paciente.dni}</td>
                        <td>{paciente.telefono}</td>
                        <td>{paciente.obraSocialNombre}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-info me-2"
                            onClick={() => verDetallesPaciente(paciente)}
                            title="Ver detalles del paciente"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/EditarPaciente/${paciente.id}`)}
                            title="Editar paciente"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPaginas > 1 && (
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                      >
                        Anterior
                      </button>
                    </li>

                    {[...Array(totalPaginas)].map((_, index) => (
                      <li key={index + 1} className={`page-item ${paginaActual === index + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => cambiarPagina(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                      >
                        Siguiente
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="alert alert-info text-center">
              {pacientes.length === 0
                ? "No hay pacientes registrados. Haga clic en 'Registrar Paciente' para agregar uno."
                : "No se encontraron pacientes con los criterios de búsqueda."}
            </div>
          )}
        </div>
      </div>

      {mostrarModal && pacienteSeleccionado && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={cerrarModal}
        >
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Paciente</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Datos Personales</h6>
                    <hr />
                    <p>
                      <strong>Nombre:</strong> {pacienteSeleccionado.nombre}
                    </p>
                    <p>
                      <strong>Apellido:</strong> {pacienteSeleccionado.apellido}
                    </p>
                    <p>
                      <strong>DNI:</strong> {pacienteSeleccionado.dni}
                    </p>
                    <p>
                      <strong>Fecha de Nacimiento:</strong> {pacienteSeleccionado.fechaNacimiento}
                    </p>
                    <p>
                      <strong>Email:</strong> {pacienteSeleccionado.email}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {pacienteSeleccionado.telefono || "No especificado"}
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Dirección</h6>
                    <hr />
                    <p>
                      <strong>Calle:</strong> {pacienteSeleccionado.calle || "No especificado"}
                    </p>
                    <p>
                      <strong>Número:</strong> {pacienteSeleccionado.numero || "No especificado"}
                    </p>
                    <p>
                      <strong>Piso:</strong> {pacienteSeleccionado.piso || "No especificado"}
                    </p>
                    <p>
                      <strong>Departamento:</strong> {pacienteSeleccionado.dpto || "No especificado"}
                    </p>
                    <p>
                      <strong>Código Postal:</strong> {pacienteSeleccionado.codigoPostal || "No especificado"}
                    </p>
                    <p>
                      <strong>Localidad:</strong> {pacienteSeleccionado.localidadNombre || "No especificado"}
                    </p>
                    <p>
                      <strong>Provincia:</strong> {pacienteSeleccionado.provinciaNombre || "No especificado"}
                    </p>
                    <p>
                      <strong>Obra Social:</strong> {pacienteSeleccionado.obraSocialNombre || "No especificado"}
                    </p>
                  </div>

                  <div className="col-12">
                    <h6 className="text-muted">Observaciones</h6>
                    <hr />
                    <p>{pacienteSeleccionado.observaciones || "Sin observaciones registradas"}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    cerrarModal()
                    navigate(`/EditarPaciente/${pacienteSeleccionado.id}`)
                  }}
                >
                  Editar Paciente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fondo>
  )
}
