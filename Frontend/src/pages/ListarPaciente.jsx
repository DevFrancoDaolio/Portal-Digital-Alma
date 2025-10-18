"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Paciente.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

export default function ListarPaciente() {
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [filtroObraSocial, setFiltroObraSocial] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const pacientesPorPagina = 10

  // Cargar pacientes desde localStorage
  useEffect(() => {
    const pacientesGuardados = JSON.parse(localStorage.getItem("pacientes") || "[]")
    setPacientes(pacientesGuardados)
  }, [])

  // Obras sociales únicas para el filtro
  const obrasSociales = [...new Set(pacientes.map((p) => p.obraSocial))].sort()

  // Filtrar pacientes
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const cumpleBusqueda =
      paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      paciente.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      paciente.dni.includes(busqueda)

    const cumpleObraSocial = !filtroObraSocial || paciente.obraSocial === filtroObraSocial

    return cumpleBusqueda && cumpleObraSocial
  })

  // Paginación
  const indiceUltimo = paginaActual * pacientesPorPagina
  const indicePrimero = indiceUltimo - pacientesPorPagina
  const pacientesPaginados = pacientesFiltrados.slice(indicePrimero, indiceUltimo)
  const totalPaginas = Math.ceil(pacientesFiltrados.length / pacientesPorPagina)

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina)
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

          {/* Filtros de búsqueda */}
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
                  <option key={obra} value={obra}>
                    {obra}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabla de pacientes */}
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
                        <td>{paciente.obraSocial}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/EditarPaciente/${paciente.id}`)}
                            title="Editar paciente"
                          >
                            {/* SVG de lápiz */}
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

              {/* Paginación */}
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
    </Fondo>
  )
}
