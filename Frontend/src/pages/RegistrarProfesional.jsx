"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  crearProfesional,
  actualizarProfesional,
  getProvincias,
  getLocalidadesByProvincia,
  getProfesionales,
} from "../services/profesionalesService"
import { getEspecialidades, createEspecialidad } from "../services/especialidadesService"

import "../styles/Profesionales.css"

import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

export default function RegistrarProfesional({ isModal, onClose, profesional, onSave }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const modoEdicion = !!id || !!profesional

  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([])
  const [provincias, setProvincias] = useState([])
  const [localidades, setLocalidades] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoFile, setFotoFile] = useState(null)
  const [mostrarModalEspecialidad, setMostrarModalEspecialidad] = useState(false)
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("")
  const [loadingEspecialidad, setLoadingEspecialidad] = useState(false)

  // Cambia el estado para especialidades seleccionadas
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    cuil: "",
    email: "",
    telefono: "",
    calle: "",
    numero: "",
    codigoPostal: "",
    piso: "",
    departamento: "",
    provinciaNombre: "",
    localidadNombre: "",
    especialidadSeleccion: "",
    matricula: "",
    esPrincipal: false,
    especialidadesSeleccionadas: [],
    fotoUrl: "",
  })

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [especialidadesRes, provinciasRes] = await Promise.all([getEspecialidades(), getProvincias()])
        setEspecialidadesDisponibles(especialidadesRes.data || [])
        setProvincias(provinciasRes.data.provincias || [])
      } catch (error) {
        console.error("Error al cargar catálogos:", error)
        alert("Error al cargar los datos necesarios")
      }
    }
    cargarCatalogos()
  }, [])

  useEffect(() => {
    const cargarLocalidades = async () => {
      if (form.provinciaNombre) {
        try {
          // Find the provincia object to get its ID
          const provinciaBuscada = provincias.find(p => p.nombre === form.provinciaNombre)
          if (provinciaBuscada) {
            const response = await getLocalidadesByProvincia(provinciaBuscada.id)
            setLocalidades(response.data.localidades || [])
            console.log("[v0] Localidades cargadas:", response.data.localidades)
          }
        } catch (error) {
          console.error("Error al cargar localidades:", error)
          setLocalidades([])
        }
      } else {
        setLocalidades([])
      }
    }
    cargarLocalidades()
  }, [form.provinciaNombre, provincias])

  useEffect(() => {
    const cargarProfesional = async () => {
      if (profesional) {
        cargarDatosProfesional(profesional)
      } else if (id) {
        try {
          const response = await getProfesionales()
          const profesionalEncontrado = response.data.find((p) => p.id === Number.parseInt(id))

          if (profesionalEncontrado) {
            cargarDatosProfesional(profesionalEncontrado)
          } else {
            alert("Profesional no encontrado")
            navigate("/listarProfesionales")
          }
        } catch (error) {
          console.error("Error al cargar profesional:", error)
          alert("Error al cargar el profesional")
          navigate("/listarProfesionales")
        }
      }
    }

    // Esperamos a tener catálogos para formatear correctamente (provincias & especialidades)
    if (especialidadesDisponibles.length > 0 && provincias.length > 0) {
      cargarProfesional()
    }
  }, [id, profesional, navigate, especialidadesDisponibles, provincias])

  // CORRECCIÓN: al cargar profesional dejamos provinciaNombre y localidadNombre tal como estaban guardados
  // y formateamos especialidades para que tengan { id, nombre, matricula, esPrincipal }
  const cargarDatosProfesional = (prof) => {
    // Mapear especialidades del profesional a la forma usada en el form
    const especialidadesFormateadas = (prof.especialidades || [])
      .map((esp) => {
        // Si la especialidad ya trae id y nombre, usarlos; sino buscar por nombre en el catálogo
        const encontrada = especialidadesDisponibles.find((e) => {
          if (esp.id && e.id === esp.id) return true
          return e.nombre === esp.nombre
        })
        return {
          id: encontrada ? encontrada.id : esp.id || null,
          nombre: encontrada ? encontrada.nombre : esp.nombre,
          matricula: esp.matricula || "",
          esPrincipal: esp.esPrincipal || false,
        }
      })
      .filter((e) => e.id !== null && e.id !== undefined)

    // Asegurar que usamos las mismas propiedades que el formulario: provinciaNombre y localidadNombre
    const provinciaNombre = prof.provinciaNombre || prof.provincia || ""
    const localidadNombre = prof.localidadNombre || prof.localidad || ""

    if (prof.fotoUrl) {
      setFotoPreview(prof.fotoUrl)
    }

    setForm((prev) => ({
      ...prev,
      nombre: prof.nombre || "",
      apellido: prof.apellido || "",
      sexo: prof.sexo?.toLowerCase() || "",
      cuil: prof.cuil || "",
      email: prof.email || "",
      telefono: prof.telefono || "",
      calle: prof.calle || "",
      numero: prof.numero || "",
      codigoPostal: prof.codigoPostal || "",
      piso: prof.piso || "",
      departamento: prof.departamento || "",
      provinciaNombre: provinciaNombre,
      localidadNombre: localidadNombre,
      especialidadesSeleccionadas: especialidadesFormateadas,
      fotoUrl: prof.fotoUrl || "",
    }))
  }

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen no debe superar 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("Por favor seleccione un archivo de imagen válido")
        return
      }

      setFotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAgregarEspecialidadCatalogo = async () => {
    if (!nuevaEspecialidad.trim()) {
      alert("Por favor ingrese el nombre de la especialidad")
      return
    }

    setLoadingEspecialidad(true)
    try {
      const response = await createEspecialidad({ nombre: nuevaEspecialidad.trim() })
      const nuevaEsp = response.data

      setEspecialidadesDisponibles([...especialidadesDisponibles, nuevaEsp])
      alert("Especialidad agregada exitosamente")
      setMostrarModalEspecialidad(false)
      setNuevaEspecialidad("")
    } catch (error) {
      console.error("Error al crear especialidad:", error)
      alert(error.response?.data?.message || "Error al crear la especialidad")
    } finally {
      setLoadingEspecialidad(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(form.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras"
    }

    if (!form.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio"
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(form.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras"
    }

    if (!form.sexo) {
      newErrors.sexo = "Debe seleccionar un sexo"
    }

    const cuilLimpio = form.cuil.replace(/[-\s]/g, "")
    if (!cuilLimpio) {
      newErrors.cuil = "El CUIL es obligatorio"
    } else if (!/^\d{7,15}$/.test(cuilLimpio)) {
      newErrors.cuil = "El CUIL debe tener entre 7 y 15 dígitos"
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email no es válido"
    }

    const telefonoLimpio = form.telefono.replace(/[-\s()]/g, "")
    if (!telefonoLimpio) {
      newErrors.telefono = "El teléfono es obligatorio"
    } else if (!/^\d{6,15}$/.test(telefonoLimpio)) {
      newErrors.telefono = "El teléfono debe tener entre 6 y 15 dígitos"
    }

    if (!form.provinciaNombre) {
      newErrors.provinciaNombre = "La Provincia es obligatoria"
    }

    if (!form.localidadNombre) {
      newErrors.localidadNombre = "La Localidad es obligatoria"
    }

    if (form.especialidadesSeleccionadas.length === 0) {
      newErrors.especialidades = "Debe seleccionar al menos una especialidad"
    } else {
      // Validar que cada especialidad tenga matrícula (según tu requerimiento)
      const faltanMatriculas = form.especialidadesSeleccionadas.some((esp) => !esp.matricula?.trim())
      if (faltanMatriculas) {
        newErrors.especialidades = "Cada especialidad debe tener matrícula"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
    if (errors[name]) setErrors({ ...errors, [name]: "" })
  }

  // Agregar especialidad seleccionada al listado
  const handleAgregarEspecialidad = () => {
    const id = form.especialidadSeleccion
    if (!id) return
    if (form.especialidadesSeleccionadas.some((e) => e.id === Number(id))) return
    const especialidad = especialidadesDisponibles.find((e) => e.id === Number(id))
    if (especialidad) {
      setForm({
        ...form,
        especialidadesSeleccionadas: [
          ...form.especialidadesSeleccionadas,
          {
            id: especialidad.id,
            nombre: especialidad.nombre,
            matricula: "",
            esPrincipal: false,
          },
        ],
        especialidadSeleccion: "",
      })
    }
  }

  // Quitar especialidad del listado
  const handleQuitarEspecialidad = (id) => {
    setForm({
      ...form,
      especialidadesSeleccionadas: form.especialidadesSeleccionadas.filter((e) => e.id !== id),
    })
  }

  // Actualizar matrícula
  const handleActualizarMatricula = (id, matricula) => {
    setForm({
      ...form,
      especialidadesSeleccionadas: form.especialidadesSeleccionadas.map((e) =>
        e.id === id ? { ...e, matricula } : e
      ),
    })
  }

  // Marcar principal
  const handleMarcarPrincipal = (id) => {
    setForm({
      ...form,
      especialidadesSeleccionadas: form.especialidadesSeleccionadas.map((e) => ({
        ...e,
        esPrincipal: e.id === id,
      })),
    })
  }

  const handleAgregar = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      console.log("Formulario con errores:", errors)
      return
    }

    setLoading(true)

    try {
      let fotoUrlFinal = '/doc1.png'
      
      // Use the preview (which is base64) if a photo was selected
      if (fotoPreview) {
        fotoUrlFinal = fotoPreview
      } else if (form.fotoUrl && form.fotoUrl.startsWith('data:')) {
        // If already has base64 data, use it
        fotoUrlFinal = form.fotoUrl
      }

      const profesionalData = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        sexo: form.sexo.toUpperCase(),
        cuil: form.cuil.replace(/[-\s]/g, ""),
        email: form.email.trim(),
        telefono: form.telefono.replace(/[-\s()]/g, ""),
        calle: form.calle.trim(),
        numero: form.numero.trim(),
        codigoPostal: form.codigoPostal.trim(),
        piso: form.piso.trim(),
        departamento: form.departamento.trim(),
        provinciaNombre: form.provinciaNombre,
        localidadNombre: form.localidadNombre,
        especialidadesConMatricula: form.especialidadesSeleccionadas.map((esp) => ({
          especialidadId: Number(esp.id),
          matricula: esp.matricula.trim(),
          esPrincipal: esp.esPrincipal,
        })),
        fotoUrl: fotoUrlFinal,
      }

      console.log("[v0] Enviando datos al backend:", {
        ...profesionalData,
        fotoUrl: profesionalData.fotoUrl ? 'foto_present' : 'sin_foto'
      })

      if (modoEdicion) {
        const profesionalId = profesional?.id || id
        await actualizarProfesional(profesionalId, profesionalData)
        alert("Profesional actualizado exitosamente")

        if (onSave) {
          onSave({ ...profesionalData, id: profesionalId })
        }
      } else {
        await crearProfesional(profesionalData)
        alert("Profesional registrado exitosamente")
      }

      if (isModal && onClose) {
        onClose()
      } else {
        navigate("/listarProfesionales")
      }
    } catch (error) {
      console.error("Error al guardar profesional:", error)
      const mensajeError = error.response?.data?.message || "Error al guardar el profesional"
      alert(mensajeError)
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <div className={isModal ? "modal-form-container" : "registro-card2"}>
      <div className="container mt-5">
        <h2 className="text-center mb-4">{modoEdicion ? "Editar Profesional" : "Registrar Profesional"}</h2>

        <form className="mb-4" onSubmit={handleAgregar}>
          <div className="mb-4 text-center">
            <label className="form-label d-block">Foto del Profesional</label>
            <div className="d-flex flex-column align-items-center gap-3">
              <div className="position-relative" style={{ width: "150px", height: "150px" }}>
                <img
                  src={fotoPreview || "/doc1.png"}
                  alt="Preview"
                  className="rounded-circle object-fit-cover"
                  style={{ width: "100%", height: "100%", border: "3px solid #dee2e6" }}
                />
              </div>
              <div>
                <input
                  type="file"
                  id="foto-upload"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="foto-upload" className="btn btn-outline-primary btn-sm">
                  {fotoPreview ? "Cambiar Foto" : "Cargar Foto"}
                </label>
                {fotoPreview && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => {
                      setFotoPreview(null)
                      setFotoFile(null)
                      setForm({ ...form, fotoUrl: "" })
                    }}
                  >
                    Eliminar
                  </button>
                )}
              </div>
              <small className="text-muted">Formatos: JPG, PNG. Tamaño máximo: 5MB</small>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                name="nombre"
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan"
              />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellido *</label>
              <input
                type="text"
                name="apellido"
                className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
                value={form.apellido}
                onChange={handleChange}
                placeholder="Ej: Pérez"
              />
              {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo *</label>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sexo"
                  id="masculino"
                  value="masculino"
                  checked={form.sexo === "masculino"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="masculino">
                  Masculino
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sexo"
                  id="femenino"
                  value="femenino"
                  checked={form.sexo === "femenino"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="femenino">
                  Femenino
                </label>
              </div>
            </div>
            {errors.sexo && <div className="text-danger small mt-1">{errors.sexo}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">CUIL *</label>
            <input
              type="text"
              name="cuil"
              className={`form-control ${errors.cuil ? "is-invalid" : ""}`}
              value={form.cuil}
              onChange={handleChange}
              placeholder="Ej: 20345678901"
            />
            {errors.cuil && <div className="invalid-feedback">{errors.cuil}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={handleChange}
              placeholder="Ej: juan.perez@email.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono *</label>
            <input
              type="text"
              name="telefono"
              className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 1145678901"
            />
            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label">Dirección</label>

            <div className="row mb-2">
              <div className="col-md-6">
                <input
                  type="text"
                  name="calle"
                  className="form-control"
                  placeholder="Calle"
                  value={form.calle}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="numero"
                  className="form-control"
                  placeholder="Número"
                  value={form.numero}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="codigoPostal"
                  className="form-control"
                  placeholder="Código Postal"
                  value={form.codigoPostal}
                  onChange={handleChange}
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
                  value={form.piso}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="departamento"
                  className="form-control"
                  placeholder="Depto"
                  value={form.departamento}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <select
                  name="provinciaNombre"
                  className={`form-select ${errors.provinciaNombre ? "is-invalid" : ""}`}
                  value={form.provinciaNombre}
                  onChange={(e) => {
                    setForm({ ...form, provinciaNombre: e.target.value, localidadNombre: "" })
                    if (errors.provinciaNombre) {
                      setErrors({ ...errors, provinciaNombre: "" })
                    }
                  }}
                >
                  <option value="">Provincia *</option>
                  {provincias.map((prov) => (
                    <option key={prov.id} value={prov.nombre}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
                {errors.provinciaNombre && <div className="invalid-feedback">{errors.provinciaNombre}</div>}
              </div>
              <div className="col-md-3">
                <select
                  name="localidadNombre"
                  className={`form-select ${errors.localidadNombre ? "is-invalid" : ""}`}
                  value={form.localidadNombre}
                  onChange={handleChange}
                  disabled={!form.provinciaNombre || localidades.length === 0}
                >
                  <option value="">Localidad *</option>
                  {localidades.map((loc) => (
                    <option key={loc.nombre} value={loc.nombre}>
                      {loc.nombre}
                    </option>
                  ))}
                </select>
                {errors.localidadNombre && <div className="invalid-feedback">{errors.localidadNombre}</div>}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <label className="form-label mb-0">Especialidades *</label>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => setMostrarModalEspecialidad(true)}
              >
                + Agregar Nueva Especialidad
              </button>
            </div>

            {/* Select y botón alineados */}
            <div className="d-flex gap-2 mb-3">
              <select
                name="especialidadSeleccion"
                className="form-select"
                value={form.especialidadSeleccion}
                onChange={handleChange}
              >
                <option value="">Seleccione una especialidad</option>
                {especialidadesDisponibles.map((esp) => (
                  <option key={esp.id} value={esp.id}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-success"
                style={{ minWidth: "40px" }}
                onClick={handleAgregarEspecialidad}
                disabled={!form.especialidadSeleccion}
                title="Agregar especialidad"
              >
                +
              </button>
            </div>

            {/* Listado de especialidades seleccionadas */}
            {form.especialidadesSeleccionadas.length > 0 && (
              <ul className="list-group">
                {form.especialidadesSeleccionadas.map((esp) => (
                  <li key={esp.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center gap-3">
                      <span className="fw-bold" style={{ minWidth: "150px" }}>
                        {esp.nombre}
                      </span>
                      <div className="d-flex gap-3 align-items-center flex-grow-1">
                        {/* Input Matrícula - Centrado */}
                        <div className="flex-grow-1 d-flex justify-content-center">
                          <input
                            type="text"
                            placeholder="Matrícula"
                            value={esp.matricula}
                            onChange={(e) => handleActualizarMatricula(esp.id, e.target.value)}
                            className="form-control text-center"
                            style={{ maxWidth: "180px" }}
                          />
                        </div>
                        {/* Checkbox Principal */}
                        <div className="form-check mb-0 ms-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`principal-${esp.id}`}
                            checked={esp.esPrincipal}
                            onChange={() => handleMarcarPrincipal(esp.id)}
                          />
                          <label className="form-check-label" htmlFor={`principal-${esp.id}`}>
                            Principal
                          </label>
                        </div>
                        {/* Botón Eliminar */}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleQuitarEspecialidad(esp.id)}
                          title="Quitar especialidad"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {errors.especialidades && <div className="text-danger small mt-2">{errors.especialidades}</div>}
          </div>

          <button type="submit" className="btn btn-primary me-2" disabled={loading}>
            {loading ? "Guardando..." : modoEdicion ? "Actualizar Profesional" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (isModal && onClose) {
                onClose()
              } else {
                navigate("/listarProfesionales")
              }
            }}
            disabled={loading}
          >
            Cancelar
          </button>
        </form>
      </div>

      {mostrarModalEspecialidad && (
        <div className="modal-overlay" onClick={() => setMostrarModalEspecialidad(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3>Nueva Especialidad</h3>
              <button className="close-button" onClick={() => setMostrarModalEspecialidad(false)}>
                ×
              </button>
            </div>
            <div className="modal-body-especialidad">
              <div className="mb-3">
                <label className="form-label">Nombre de la Especialidad *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Cardiología"
                  value={nuevaEspecialidad}
                  onChange={(e) => setNuevaEspecialidad(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAgregarEspecialidadCatalogo()
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción *</label>
                {/* Description will be added through the dedicated page */}
              </div>
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setMostrarModalEspecialidad(false)
                    setNuevaEspecialidad("")
                  }}
                  disabled={loadingEspecialidad}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAgregarEspecialidadCatalogo}
                  disabled={loadingEspecialidad || !nuevaEspecialidad.trim()}
                >
                  {loadingEspecialidad ? "Agregando..." : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  if (isModal) {
    return formContent
  }

  return (
    <>
      <Fondo>
        <NavBar />
        {formContent}
      </Fondo>
    </>
  )
}
