import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"

export default function CreateAccount() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "profesional", // Por defecto profesional
  })
  const [mensaje, setMensaje] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setMensaje("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Obtener usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")

    // Verificar si el email ya existe
    if (usuarios.some((u) => u.email === formData.email)) {
      setMensaje("Este email ya está registrado")
      return
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: Date.now(),
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      password: formData.password,
      rol: formData.rol,
      profesionalId: formData.rol === "profesional" ? Date.now() : null,
    }

    // Guardar usuario
    usuarios.push(nuevoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    // Crear sesión automáticamente
    const sesion = {
      userId: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      profesionalId: nuevoUsuario.profesionalId,
    }
    localStorage.setItem("sesion", JSON.stringify(sesion))

    setMensaje("Cuenta creada exitosamente")

    // Redirigir después de 1 segundo
    setTimeout(() => {
      if (nuevoUsuario.rol === "profesional") {
        navigate("/MisHorarios")
      } else {
        navigate("/Profesionales")
      }
    }, 1000)
  }

  return (
    <Fondo>
      <NavBar />
      <div className="create-account-container">
        <h2>Crear cuenta</h2>
        <p className="subtitle">Registrarse para solicitar o gestionar turnos</p>

        {mensaje && <p className={mensaje.includes("exitosamente") ? "success-message" : "error-message"}>{mensaje}</p>}

        <form onSubmit={handleSubmit} className="create-account-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
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
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="form-control"
            style={{ marginBottom: "15px", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="profesional">Profesional</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" className="btn-primary">
            Registrar
          </button>
        </form>
        <p>
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </Fondo>
  )
}
