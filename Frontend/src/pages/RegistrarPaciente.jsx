"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Paciente.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import pacienteService from "../services/pacientesService"

export default function RegistrarPaciente() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    obraSocial: "",
    calle: "",
    numero: "",
    codigoPostal: "",
    piso: "",
    dpto: "",
    provincia: "",
    localidad: "",
  })

  const [errors, setErrors] = useState({})
  const [obrasSociales, setObrasSociales] = useState([])
  const [provincias, setProvincias] = useState([])
  const [localidades, setLocalidades] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    cargarDatosIniciales()
  }, [])

  useEffect(() => {
    if (form.provincia) {
      cargarLocalidades(form.provincia)
    } else {
      setLocalidades([])
    }
  }, [form.provincia])

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true)
      const [obrasSocialesData, provinciasData] = await Promise.all([
        pacienteService.obtenerObrasSociales(),
        pacienteService.obtenerProvincias(),
      ])

      setObrasSociales(obrasSocialesData)
      setProvincias(provinciasData)
    } catch (error) {
      console.error("Error al cargar datos iniciales:", error)
      alert("Error al cargar los datos. Por favor, recargue la página.")
    } finally {
      setCargando(false)
    }
  }

  const cargarLocalidades = async (provinciaId) => {
    try {
      const localidadesData = await pacienteService.obtenerLocalidades(provinciaId)
      setLocalidades(localidadesData)
    } catch (error) {
      console.error("Error al cargar localidades:", error)
      setLocalidades([])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    // Validaciones obligatorias
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio"
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(form.nombre)) {
      nuevosErrores.nombre = "El nombre solo puede contener letras"
    } else if (form.nombre.trim().length < 2 || form.nombre.trim().length > 50) {
      nuevosErrores.nombre = "El nombre debe tener entre 2 y 50 caracteres"
    }

    if (!form.apellido.trim()) {
      nuevosErrores.apellido = "El apellido es obligatorio"
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(form.apellido)) {
      nuevosErrores.apellido = "El apellido solo puede contener letras"
    } else if (form.apellido.trim().length < 2 || form.apellido.trim().length > 50) {
      nuevosErrores.apellido = "El apellido debe tener entre 2 y 50 caracteres"
    }

    if (!form.dni.trim()) {
      nuevosErrores.dni = "El DNI es obligatorio"
    } else if (!/^[0-9]{7,15}$/.test(form.dni)) {
      nuevosErrores.dni = "El DNI debe tener entre 7 y 15 dígitos"
    }

    if (!form.email.trim()) {
      nuevosErrores.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = "Email inválido"
    }

    if (!form.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria"
    } else {
      const fechaNac = new Date(form.fechaNacimiento)
      const hoy = new Date()
      if (fechaNac >= hoy) {
        nuevosErrores.fechaNacimiento = "Ingresar una fecha válida (debe ser anterior a hoy)"
      }
    }

    if (!form.obraSocial) {
      nuevosErrores.obraSocial = "La obra social es obligatoria"
    }

    if (!form.provincia) {
      nuevosErrores.provincia = "La provincia es obligatoria"
    }

    if (!form.localidad) {
      nuevosErrores.localidad = "La localidad es obligatoria"
    }

    // Validaciones opcionales (solo si tienen valor)
    if (form.telefono.trim() && !/^\d{6,15}$/.test(form.telefono)) {
      nuevosErrores.telefono = "El teléfono debe tener entre 6 y 15 dígitos"
    }

    if (form.calle.trim() && form.calle.trim().length > 50) {
      nuevosErrores.calle = "La calle no puede superar los 50 caracteres"
    }

    if (form.numero.trim() && !/^[0-9]+$/.test(form.numero)) {
      nuevosErrores.numero = "Solo se permiten números"
    }

    if (form.codigoPostal.trim() && !/^\d{4,6}$/.test(form.codigoPostal)) {
      nuevosErrores.codigoPostal = "El código postal debe tener entre 4 y 6 dígitos"
    }

    if (form.piso.trim() && form.piso.trim().length > 2) {
      nuevosErrores.piso = "El piso no puede superar los 2 caracteres"
    }

    if (form.dpto.trim() && form.dpto.trim().length > 10) {
      nuevosErrores.dpto = "El dpto no puede superar los 10 caracteres"
    }

    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleRegistrar = async (e) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    try {
      setGuardando(true)

      const pacienteDto = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        dni: form.dni.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim() || null,
        fechaNacimiento: form.fechaNacimiento,
        calle: form.calle.trim() || null,
        numero: form.numero.trim() || null,
        codigoPostal: form.codigoPostal.trim() || null,
        piso: form.piso.trim() || null,
        dpto: form.dpto.trim() || null,
        provinciaId: Number.parseInt(form.provincia),
        localidadId: Number.parseInt(form.localidad),
        obraSocialId: Number.parseInt(form.obraSocial),
      }

      console.log("Registrando paciente:", pacienteDto)

      await pacienteService.crear(pacienteDto)
      navigate("/ListarPaciente")
    } catch (error) {
      console.error("Error al registrar paciente:", error)
      if (error.message.includes("DNI")) {
        setErrors({ ...errors, dni: "Ya existe un paciente con este DNI" })
      } else {
        alert("Error al registrar el paciente. Por favor, intente nuevamente.")
      }
    } finally {
      setGuardando(false)
    }
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
            <p className="mt-3">Cargando formulario...</p>
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
          <h2 className="text-center mb-4">Registrar Paciente</h2>

          <form onSubmit={handleRegistrar} className="paciente-form">
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
                  maxLength="15"
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
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 3512345678"
                  maxLength="15"
                />
                {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  className={`form-control ${errors.fechaNacimiento ? "is-invalid" : ""}`}
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                />
                {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
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
                  <option key={obra.id} value={obra.id}>
                    {obra.nombre}
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
                    className={`form-control ${errors.calle ? "is-invalid" : ""}`}
                    placeholder="Calle"
                    value={form.calle}
                    onChange={handleChange}
                    maxLength="50"
                  />
                  {errors.calle && <div className="invalid-feedback">{errors.calle}</div>}
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="numero"
                    className={`form-control ${errors.numero ? "is-invalid" : ""}`}
                    placeholder="Número"
                    value={form.numero}
                    onChange={handleChange}
                  />
                  {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="codigoPostal"
                    className={`form-control ${errors.codigoPostal ? "is-invalid" : ""}`}
                    placeholder="Código Postal"
                    value={form.codigoPostal}
                    onChange={handleChange}
                    maxLength="6"
                  />
                  {errors.codigoPostal && <div className="invalid-feedback">{errors.codigoPostal}</div>}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-3">
                  <input
                    type="text"
                    name="piso"
                    className={`form-control ${errors.piso ? "is-invalid" : ""}`}
                    placeholder="Piso"
                    value={form.piso}
                    onChange={handleChange}
                    maxLength="2"
                  />
                  {errors.piso && <div className="invalid-feedback">{errors.piso}</div>}
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="dpto"
                    className={`form-control ${errors.dpto ? "is-invalid" : ""}`}
                    placeholder="Dpto"
                    value={form.dpto}
                    onChange={handleChange}
                    maxLength="10"
                  />
                  {errors.dpto && <div className="invalid-feedback">{errors.dpto}</div>}
                </div>
                <div className="col-md-3">
                  <select
                    name="provincia"
                    className={`form-select ${errors.provincia ? "is-invalid" : ""}`}
                    value={form.provincia}
                    onChange={handleChange}
                  >
                    <option value="">Provincia *</option>
                    {provincias.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.provincia && <div className="invalid-feedback">{errors.provincia}</div>}
                </div>
                <div className="col-md-3">
                  <select
                    name="localidad"
                    className={`form-select ${errors.localidad ? "is-invalid" : ""}`}
                    value={form.localidad}
                    onChange={handleChange}
                    disabled={!form.provincia}
                  >
                    <option value="">Localidad *</option>
                    {localidades.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.localidad && <div className="invalid-feedback">{errors.localidad}</div>}
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="boton-agregar" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/ListarPaciente")}
                disabled={guardando}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fondo>
  )
}
