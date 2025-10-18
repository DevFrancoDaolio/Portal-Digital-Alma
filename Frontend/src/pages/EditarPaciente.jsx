"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/Paciente.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

export default function EditarPaciente() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "", // Agregado email
    telefono: "",
    fechaNacimiento: "", // Agregado fecha de nacimiento
    obraSocial: "",
    direccion: {
      calle: "",
      numero: "",
      codigoPostal: "",
      piso: "",
      dpto: "",
      provincia: "",
      localidad: "",
    },
  })

  const [errors, setErrors] = useState({})

  const obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "IOMA", "PAMI", "Medifé", "Sancor Salud", "Particular"]

  const provincias = [
    { id: "cordoba", nombre: "Córdoba" },
    { id: "buenos_aires", nombre: "Buenos Aires" },
    { id: "santa_fe", nombre: "Santa Fe" },
  ]

  const localidadesPorProvincia = {
    cordoba: ["Córdoba Capital", "Villa María", "Río Cuarto"],
    buenos_aires: ["La Plata", "Mar del Plata", "Bahía Blanca"],
    santa_fe: ["Rosario", "Santa Fe Capital", "Rafaela"],
  }

  useEffect(() => {
    const pacientesGuardados = JSON.parse(localStorage.getItem("pacientes") || "[]")
    const paciente = pacientesGuardados.find((p) => p.id === Number.parseInt(id))

    if (paciente) {
      setForm({
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        dni: paciente.dni,
        email: paciente.email || "", // Cargar email
        telefono: paciente.telefono,
        fechaNacimiento: paciente.fechaNacimiento || "", // Cargar fecha de nacimiento
        obraSocial: paciente.obraSocial,
        direccion: paciente.direccion || {
          calle: "",
          numero: "",
          codigoPostal: "",
          piso: "",
          dpto: "",
          provincia: "",
          localidad: "",
        },
      })
    } else {
      navigate("/ListarPaciente")
    }
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleDireccionChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      direccion: {
        ...form.direccion,
        [name]: value,
        ...(name === "provincia" ? { localidad: "" } : {}),
      },
    })
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es requerido"
    if (!form.apellido.trim()) nuevosErrores.apellido = "El apellido es requerido"
    if (!form.dni.trim()) {
      nuevosErrores.dni = "El DNI es requerido"
    } else if (!/^\d{7,8}$/.test(form.dni)) {
      nuevosErrores.dni = "El DNI debe tener 7 u 8 dígitos"
    }
    if (!form.email.trim()) {
      nuevosErrores.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = "El email no es válido"
    }
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es requerido"
    } else if (!/^\d{10}$/.test(form.telefono.replace(/\s/g, ""))) {
      nuevosErrores.telefono = "El teléfono debe tener 10 dígitos"
    }
    if (!form.obraSocial) nuevosErrores.obraSocial = "Debe seleccionar una obra social"

    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleActualizar = (e) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    const pacientesGuardados = JSON.parse(localStorage.getItem("pacientes") || "[]")

    const dniExiste = pacientesGuardados.some((p) => p.dni === form.dni && p.id !== Number.parseInt(id))
    if (dniExiste) {
      setErrors({ ...errors, dni: "Ya existe otro paciente con este DNI" })
      return
    }

    const pacientesActualizados = pacientesGuardados.map((p) =>
      p.id === Number.parseInt(id) ? { ...p, ...form, fechaModificacion: new Date().toISOString() } : p,
    )

    localStorage.setItem("pacientes", JSON.stringify(pacientesActualizados))

    navigate("/ListarPaciente")
  }

  return (
    <Fondo>
      <NavBar />

      <div className="registro-card">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Editar Paciente</h2>

          <form onSubmit={handleActualizar} className="paciente-form">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese el apellido"
                />
                {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="dni" className="form-label">
                  DNI *
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  className={`form-control ${errors.dni ? "is-invalid" : ""}`}
                  value={form.dni}
                  onChange={handleChange}
                  placeholder="Ej: 12345678"
                  maxLength="8"
                />
                {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ejemplo@email.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono *
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 3512345678"
                  maxLength="10"
                />
                {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  className="form-control"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="obraSocial" className="form-label">
                Obra Social *
              </label>
              <select
                id="obraSocial"
                name="obraSocial"
                className={`form-select ${errors.obraSocial ? "is-invalid" : ""}`}
                value={form.obraSocial}
                onChange={handleChange}
              >
                <option value="">Seleccione una obra social</option>
                {obrasSociales.map((obra) => (
                  <option key={obra} value={obra}>
                    {obra}
                  </option>
                ))}
              </select>
              {errors.obraSocial && <div className="invalid-feedback">{errors.obraSocial}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Dirección</label>
              <div className="row mb-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="calle"
                    className="form-control"
                    placeholder="Calle"
                    value={form.direccion.calle}
                    onChange={handleDireccionChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="numero"
                    className="form-control"
                    placeholder="Número"
                    value={form.direccion.numero}
                    onChange={handleDireccionChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="codigoPostal"
                    className="form-control"
                    placeholder="Código Postal"
                    value={form.direccion.codigoPostal}
                    onChange={handleDireccionChange}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-3">
                  <input
                    type="text"
                    name="piso"
                    className="form-control"
                    placeholder="Piso"
                    value={form.direccion.piso}
                    onChange={handleDireccionChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="dpto"
                    className="form-control"
                    placeholder="Dpto"
                    value={form.direccion.dpto}
                    onChange={handleDireccionChange}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    name="provincia"
                    className="form-select"
                    value={form.direccion.provincia}
                    onChange={handleDireccionChange}
                  >
                    <option value="">Provincia</option>
                    {provincias.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    name="localidad"
                    className="form-select"
                    value={form.direccion.localidad}
                    onChange={handleDireccionChange}
                    disabled={!form.direccion.provincia}
                  >
                    <option value="">Localidad</option>
                    {(localidadesPorProvincia[form.direccion.provincia] || []).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/ListarPaciente")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fondo>
  )
}
