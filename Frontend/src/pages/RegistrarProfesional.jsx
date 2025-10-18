"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/Profesionales.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

export default function AgregarProfesional({ isModal = false, onClose = null, profesional = null, onSave = null }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const modoEdicion = !!id || !!profesional

  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([])
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    cuil: "",
    email: "",
    telefono: "",
    direccion: {
      calle: "",
      numero: "",
      codigoPostal: "",
      piso: "",
      dpto: "",
      provincia: "",
      localidad: "",
    },
    especialidades: [],
    servicio: "",
  })

  useEffect(() => {
    if (profesional) {
      cargarDatosProfesional(profesional)
    } else if (id) {
      const profesionalesGuardados = JSON.parse(localStorage.getItem("profesionales") || "[]")
      const profesionalEncontrado = profesionalesGuardados.find((p) => p.id === id)

      if (profesionalEncontrado) {
        cargarDatosProfesional(profesionalEncontrado)
      } else {
        alert("Profesional no encontrado")
        navigate("/listarProfesionales")
      }
    }
  }, [id, profesional, navigate])

  const cargarDatosProfesional = (prof) => {
    const direccionParseada = parseDireccion(prof.direccion || "")

    const especialidadesReconstruidas = (prof.especialidades || []).map((espNombre) => {
      const especialidad = especialidadesDisponibles.find((e) => e.nombre === espNombre)
      return {
        especialidadId: especialidad?.id || espNombre.toLowerCase().replace(/\s+/g, "-"),
        matricula: prof.matriculas?.[espNombre] || "",
        esPrincipal: false,
      }
    })

    setForm({
      nombre: prof.nombre || "",
      apellido: prof.apellido || "",
      sexo: prof.sexo || "",
      cuil: prof.cuil || "",
      email: prof.email || "",
      telefono: prof.telefono || "",
      direccion: direccionParseada,
      especialidades: especialidadesReconstruidas,
      servicio: prof.servicio || "",
    })
  }

  const parseDireccion = (direccionStr) => {
    if (!direccionStr || typeof direccionStr !== "string") {
      return {
        calle: "",
        numero: "",
        codigoPostal: "",
        piso: "",
        dpto: "",
        provincia: "",
        localidad: "",
      }
    }

    const partes = direccionStr.split(",").map((p) => p.trim())

    return {
      calle: partes[0]?.split(" ").slice(0, -1).join(" ") || "",
      numero: partes[0]?.split(" ").pop() || "",
      codigoPostal: "",
      piso: partes[1]?.includes("Piso") ? partes[1].split("Piso")[1]?.trim().split(" ")[0] || "" : "",
      dpto: partes[1]?.includes("Piso") ? partes[1].split("Piso")[1]?.trim().split(" ")[1] || "" : "",
      provincia: "",
      localidad: partes[2] || "",
    }
  }

  useEffect(() => {
    setEspecialidadesDisponibles([
      { id: "cardiologia", nombre: "Cardiología" },
      { id: "pediatria", nombre: "Pediatría" },
      { id: "dermatologia", nombre: "Dermatología" },
      { id: "neurologia", nombre: "Neurología" },
      { id: "clinica", nombre: "Clínica Médica" },
      { id: "kinesiologia", nombre: "Kinesiología" },
      { id: "psicologia", nombre: "Psicología" },
      { id: "fonoaudiologia", nombre: "Fonoaudiología" },
      { id: "psiquiatria", nombre: "Psiquiatría" },
      { id: "medico-clinico", nombre: "Médico Clínico" },
      { id: "psicomotricidad", nombre: "Psicomotricidad" },
    ])
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!form.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio"
    }

    if (!form.sexo) {
      newErrors.sexo = "Debe seleccionar un sexo"
    }

    const cuilLimpio = form.cuil.replace(/[-\s]/g, "")
    if (!cuilLimpio) {
      newErrors.cuil = "El CUIL es obligatorio"
    } else if (!/^\d{11}$/.test(cuilLimpio)) {
      newErrors.cuil = "El CUIL debe tener 11 dígitos"
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email no es válido"
    }

    const telefonoLimpio = form.telefono.replace(/[-\s()]/g, "")
    if (!telefonoLimpio) {
      newErrors.telefono = "El teléfono es obligatorio"
    } else if (!/^\d{8,15}$/.test(telefonoLimpio)) {
      newErrors.telefono = "El teléfono debe tener entre 8 y 15 dígitos"
    }

    if (form.especialidades.length === 0) {
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

  const handleEspecialidadesChange = (e) => {
    const seleccionadas = Array.from(e.target.selectedOptions, (opt) => opt.value)
    const nuevas = seleccionadas.map((id) => {
      const existente = form.especialidades.find((e) => e.especialidadId === id)
      return existente ?? { especialidadId: id, matricula: "", esPrincipal: false }
    })
    setForm({ ...form, especialidades: nuevas })
  }

  const handleMatriculaChange = (index, value) => {
    const copia = [...form.especialidades]
    copia[index].matricula = value
    setForm({ ...form, especialidades: copia })
  }

  const handlePrincipalChange = (id) => {
    const actualizadas = form.especialidades.map((e) => ({
      ...e,
      esPrincipal: e.especialidadId === id,
    }))
    setForm({ ...form, especialidades: actualizadas })
  }

  const handleAgregar = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const profesionalData = {
        id: modoEdicion ? profesional?.id || id : Date.now().toString(),
        nombre: form.nombre,
        apellido: form.apellido,
        sexo: form.sexo,
        cuil: form.cuil,
        email: form.email,
        telefono: form.telefono,
        direccion:
          `${form.direccion.calle} ${form.direccion.numero}${form.direccion.piso ? `, Piso ${form.direccion.piso}` : ""}${form.direccion.dpto ? ` ${form.direccion.dpto}` : ""}, ${form.direccion.localidad || ""} ${form.direccion.provincia || ""}`.trim(),
        especialidades: form.especialidades.map((esp) => {
          const especialidad = especialidadesDisponibles.find((e) => e.id === esp.especialidadId)
          return especialidad?.nombre || ""
        }),
        matriculas: form.especialidades.reduce((acc, esp) => {
          const especialidad = especialidadesDisponibles.find((e) => e.id === esp.especialidadId)
          if (especialidad && esp.matricula) {
            acc[especialidad.nombre] = esp.matricula
          }
          return acc
        }, {}),
        fotoUrl: profesional?.fotoUrl || "/doc1.png",
      }

      const profesionalesGuardados = JSON.parse(localStorage.getItem("profesionales") || "[]")

      if (modoEdicion) {
        const profesionalesActualizados = profesionalesGuardados.map((p) =>
          p.id === profesionalData.id ? { ...p, ...profesionalData } : p,
        )
        localStorage.setItem("profesionales", JSON.stringify(profesionalesActualizados))
        console.log("Profesional actualizado:", profesionalData)
        alert("Profesional actualizado exitosamente")

        if (onSave) {
          onSave(profesionalData)
        }
      } else {
        profesionalesGuardados.push(profesionalData)
        localStorage.setItem("profesionales", JSON.stringify(profesionalesGuardados))
        console.log("Nuevo profesional guardado:", profesionalData)
        alert("Profesional registrado exitosamente")
      }

      if (isModal && onClose) {
        onClose()
      } else {
        navigate("/listarProfesionales")
      }
    } else {
      console.log("Formulario con errores:", errors)
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
                  placeholder="Ej: Av. Corrientes"
                  value={form.direccion.calle}
                  onChange={handleDireccionChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="numero"
                  className="form-control"
                  placeholder="Ej: 1234"
                  value={form.direccion.numero}
                  onChange={handleDireccionChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="codigoPostal"
                  className="form-control"
                  placeholder="Ej: 5000"
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
                  placeholder="Ej: 3"
                  value={form.direccion.piso}
                  onChange={handleDireccionChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="dpto"
                  className="form-control"
                  placeholder="Ej: B"
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
                  const seleccionada = form.especialidades.find((e) => e.especialidadId === esp.id)
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
                                ? form.especialidades.filter((e) => e.especialidadId !== esp.id)
                                : [
                                    ...form.especialidades,
                                    { especialidadId: esp.id, matricula: "", esPrincipal: false },
                                  ]
                              setForm({ ...form, especialidades: nuevas })
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
                              const actualizadas = form.especialidades.map((item) =>
                                item.especialidadId === esp.id ? { ...item, matricula: e.target.value } : item,
                              )
                              setForm({ ...form, especialidades: actualizadas })
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
                              const actualizadas = form.especialidades.map((item) => ({
                                ...item,
                                esPrincipal: item.especialidadId === esp.id,
                              }))
                              setForm({ ...form, especialidades: actualizadas })
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

          <button type="submit" className="btn btn-primary me-2">
            {modoEdicion ? "Actualizar Profesional" : "Guardar"}
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
