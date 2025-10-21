"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { crearProfesional, actualizarProfesional, getProvincias, getLocalidadesByProvincia, getProfesionales } from "../services/profesionalesService"
import { getEspecialidades } from "../services/especialidadesService"

import "../styles/Profesionales.css"

import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"


export default function AgregarProfesional({ isModal = false, onClose = null, profesional = null, onSave = null }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const modoEdicion = !!id || !!profesional

  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([])
  const [provincias, setProvincias] = useState([])
  const [localidades, setLocalidades] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

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
    provinciaId: "",
    localidadId: "",
    especialidadesConMatricula: [],
  })

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [especialidadesRes, provinciasRes] = await Promise.all([getEspecialidades(), getProvincias()])
        setEspecialidadesDisponibles(especialidadesRes.data || [])
        setProvincias(provinciasRes.data || [])
      } catch (error) {
        console.error("Error al cargar catálogos:", error)
        alert("Error al cargar los datos necesarios")
      }
    }
    cargarCatalogos()
  }, [])

  useEffect(() => {
    const cargarLocalidades = async () => {
      if (form.provinciaId) {
        try {
          const response = await getLocalidadesByProvincia(form.provinciaId)
          setLocalidades(response.data || [])
        } catch (error) {
          console.error("Error al cargar localidades:", error)
          setLocalidades([])
        }
      } else {
        setLocalidades([])
      }
    }
    cargarLocalidades()
  }, [form.provinciaId])

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

    if (especialidadesDisponibles.length > 0 && provincias.length > 0) {
      cargarProfesional()
    }
  }, [id, profesional, navigate, especialidadesDisponibles, provincias])

  const cargarDatosProfesional = (prof) => {
    const especialidadesFormateadas = (prof.especialidades || [])
      .map((esp) => {
        const especialidad = especialidadesDisponibles.find((e) => e.nombre === esp.nombre)
        return {
          especialidadId: especialidad?.id || null,
          matricula: esp.matricula || "",
          esPrincipal: esp.esPrincipal || false,
        }
      })
      .filter((e) => e.especialidadId !== null)

    const provincia = provincias.find((p) => p.nombre === prof.provincia)

    setForm({
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
      provinciaId: provincia?.id || "",
      localidadId: "",
      especialidadesConMatricula: especialidadesFormateadas,
    })
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

    if (!form.provinciaId) {
      newErrors.provinciaId = "La provincia es obligatoria"
    }

    if (!form.localidadId) {
      newErrors.localidadId = "La localidad es obligatoria"
    }

    if (form.especialidadesConMatricula.length === 0) {
      newErrors.especialidades = "Debe seleccionar al menos una especialidad"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const handleAgregar = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      console.log("Formulario con errores:", errors)
      return
    }

    setLoading(true)

    try {
      const profesionalData = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        sexo: form.sexo.toUpperCase(), // MASCULINO o FEMENINO
        cuil: form.cuil.replace(/[-\s]/g, ""),
        email: form.email.trim(),
        telefono: form.telefono.replace(/[-\s()]/g, ""),
        calle: form.calle.trim(),
        numero: form.numero.trim(),
        codigoPostal: form.codigoPostal.trim(),
        piso: form.piso.trim(),
        departamento: form.departamento.trim(),
        provinciaId: Number.parseInt(form.provinciaId),
        localidadId: Number.parseInt(form.localidadId),
        especialidadesConMatricula: form.especialidadesConMatricula.map((esp) => ({
          especialidadId: Number.parseInt(esp.especialidadId),
          matricula: esp.matricula.trim(),
          esPrincipal: esp.esPrincipal,
        })),
      }

      console.log("[v0] Enviando datos al backend:", profesionalData)

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
                  name="provinciaId"
                  className={`form-select ${errors.provinciaId ? "is-invalid" : ""}`}
                  value={form.provinciaId}
                  onChange={(e) => {
                    setForm({ ...form, provinciaId: e.target.value, localidadId: "" })
                    if (errors.provinciaId) {
                      setErrors({ ...errors, provinciaId: "" })
                    }
                  }}
                >
                  <option value="">Provincia *</option>
                  {provincias.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
                {errors.provinciaId && <div className="invalid-feedback">{errors.provinciaId}</div>}
              </div>
              <div className="col-md-3">
                <select
                  name="localidadId"
                  className={`form-select ${errors.localidadId ? "is-invalid" : ""}`}
                  value={form.localidadId}
                  onChange={handleChange}
                  disabled={!form.provinciaId}
                >
                  <option value="">Localidad *</option>
                  {localidades.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.nombre}
                    </option>
                  ))}
                </select>
                {errors.localidadId && <div className="invalid-feedback">{errors.localidadId}</div>}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Especialidades *</label>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Matrícula</th>
                  <th>Principal</th>
                </tr>
              </thead>
              <tbody>
                {especialidadesDisponibles.map((esp) => {
                  const seleccionada = form.especialidadesConMatricula.find((e) => e.especialidadId === esp.id)
                  return (
                    <tr key={esp.id}>
                      <td>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={!!seleccionada}
                            onChange={() => {
                              const yaExiste = !!seleccionada
                              const nuevas = yaExiste
                                ? form.especialidadesConMatricula.filter((e) => e.especialidadId !== esp.id)
                                : [
                                    ...form.especialidadesConMatricula,
                                    { especialidadId: esp.id, matricula: "", esPrincipal: false },
                                  ]
                              setForm({ ...form, especialidadesConMatricula: nuevas })
                              if (nuevas.length > 0 && errors.especialidades) {
                                setErrors({ ...errors, especialidades: "" })
                              }
                            }}
                          />
                          <label className="form-check-label ms-2">{esp.nombre}</label>
                        </div>
                      </td>
                      <td>
                        {seleccionada && (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: MN 12345"
                            value={seleccionada.matricula}
                            onChange={(e) => {
                              const actualizadas = form.especialidadesConMatricula.map((item) =>
                                item.especialidadId === esp.id ? { ...item, matricula: e.target.value } : item,
                              )
                              setForm({ ...form, especialidadesConMatricula: actualizadas })
                            }}
                          />
                        )}
                      </td>
                      <td className="text-center">
                        {seleccionada && (
                          <input
                            type="radio"
                            name="principal"
                            checked={seleccionada.esPrincipal}
                            onChange={() => {
                              const actualizadas = form.especialidadesConMatricula.map((item) => ({
                                ...item,
                                esPrincipal: item.especialidadId === esp.id,
                              }))
                              setForm({ ...form, especialidadesConMatricula: actualizadas })
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {errors.especialidades && <div className="text-danger small mt-1">{errors.especialidades}</div>}
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
