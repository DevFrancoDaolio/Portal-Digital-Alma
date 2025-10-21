"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Especialidad.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import { createEspecialidad } from "../services/especialidadesService"

export default function AgregarEspecialidad() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAgregar = async (e) => {
    e.preventDefault()
    try {
      await createEspecialidad(form)
      console.log("Especialidad creada:", form)
      navigate("/ListarEspecialidades")
    } catch (error) {
      console.error("Error al crear especialidad:", error)
      alert("Error al crear la especialidad")
    }
  }

  return (
    <>
      <Fondo>
        {/* 🔷 Navbar */}
        <NavBar />

        <div className="registro-card">
          <div className="container mt-5">
            <h2 className="text-center mb-4">Agregar Especialidad</h2>

            <form className="mb-4" onSubmit={handleAgregar}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Cardiología"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Breve descripción de la especialidad"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary me-2" onClick={() => navigate("../ListarProfesionales")}>
                Guardar
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("../ListarProfesionales")}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </Fondo>
    </>
  )
}
