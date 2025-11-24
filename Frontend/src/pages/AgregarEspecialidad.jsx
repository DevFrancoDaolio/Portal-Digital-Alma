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
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAgregar = async (e) => {
        e.preventDefault()
        try {
            const nombreLimpio = form.nombre.trim()

            if (!nombreLimpio) {
                alert("Por favor ingrese un nombre para la especialidad")
                return
            }

            // Formatear: Primera letra mayúscula, resto minúsculas
            const nombreFormateado = nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1).toLowerCase()

            await createEspecialidad({
                nombre: nombreFormateado,
            })

            console.log("Especialidad creada:", { nombre: nombreFormateado })
            alert("Especialidad creada exitosamente")
            navigate("/ListarProfesionales")
        } catch (error) {
            console.error("Error al crear especialidad:", error)
            alert(error.response?.data?.message || "Error al crear la especialidad")
        }
    }

    return (
        <Fondo>
            <NavBar />
            <div className="registro-card">
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Agregar Especialidad</h2>
                    <form onSubmit={handleAgregar} className="especialidad-form">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre de la Especialidad *
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="form-control"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Cardiología"
                                required
                            />
                        </div>

                        <div className="d-flex gap-2 justify-content-center">
                            <button type="submit" className="btn btn-success">
                                Guardar Especialidad
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/ListarProfesionales")}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fondo>
    )
}
