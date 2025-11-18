import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registroUsuario, guardarSesion } from "../services/loginService"
import Fondo from "../componentes/Fondo"
import NavBar from "../componentes/NavBar"

export default function CreateAccount() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "profesional",
  })
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setMensaje("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    try {
      const response = await registroUsuario(formData)

      if (response.data.success) {
        const usuario = response.data.data
        
        // Guardar sesión automáticamente
        guardarSesion(usuario)

        setMensaje("Cuenta creada exitosamente")

        // Redirigir después de 1 segundo
        setTimeout(() => {
          if (usuario.rol === "profesional") {
            navigate("/MisHorarios")
          } else {
            navigate("/ListarProfesionales")
          }
        }, 1000)
      }
    } catch (err) {
      setMensaje(err.response?.data?.message || "Error al registrar usuario")
    } finally {
      setCargando(false)
    }
  }

  return (
    <Fondo>
      <NavBar />
      <div className="create-account-container">
        <h2>Crear cuenta</h2>
        <p className="subtitle">Registrarse para solicitar o gestionar turnos</p>

        {mensaje && (
          <p className={mensaje.includes("exitosamente") ? "success-message" : "error-message"}>
            {mensaje}
          </p>
        )}

        <form onSubmit={handleSubmit} className="create-account-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={cargando}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            disabled={cargando}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={cargando}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={cargando}
          />
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="form-control"
            style={{ marginBottom: "15px", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
            disabled={cargando}
          >
            <option value="profesional">Profesional</option>
            <option value="secretaria">Secretaria</option>
          </select>
          <button type="submit" className="btn-primary" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <p>
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </Fondo>
  )
}
