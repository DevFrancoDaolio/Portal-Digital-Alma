"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")

    // Buscar usuario
    const usuario = usuarios.find((u) => u.email === formData.email && u.password === formData.password)

    if (usuario) {
      // Guardar sesión
      const sesion = {
        userId: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        profesionalId: usuario.profesionalId || null,
      }
      localStorage.setItem("sesion", JSON.stringify(sesion))

      // Redirigir según el rol
      if (usuario.rol === "profesional") {
        navigate("/MisHorarios")
      } else {
        navigate("/Profesionales")
      }
    } else {
      setError("Email o contraseña incorrectos")
    }
  }

  return (
    <Fondo>
      <NavBar />
      <div className="create-account-container">
        <h2>Iniciar sesión</h2>
        <p className="subtitle">Ingresá para gestionar turnos y horarios</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="create-account-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary">
            Iniciar sesión
          </button>
        </form>
        <p>
          ¿No tenés cuenta? <Link to="/CreateAccount">Crear cuenta</Link>
        </p>
      </div>
    </Fondo>
  )
}
