import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUsuario, guardarSesion } from "../services/loginService"
import Fondo from "../componentes/Fondo"
import NavBar from "../componentes/NavBar"

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    try {
      const response = await loginUsuario(formData.email, formData.password)

      if (response.data.success) {
        const usuario = response.data.data
        
        // Guardar sesión
        guardarSesion(usuario)

        // Redirigir según el rol
        if (usuario.rol === "profesional") {
          navigate("/MisHorarios")
        } else {
          navigate("/ListarProfesionales")
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión")
    } finally {
      setCargando(false)
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
          <button type="submit" className="btn-primary" disabled={cargando}>
            {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        <p>
          ¿No tenés cuenta? <Link to="/CreateAccount">Crear cuenta</Link>
        </p>
        <p>
          ¿Olvidaste tu contraseña? <Link to="/RecuperarContrasena">Recuperarla aquí</Link>
        </p>
      </div>
    </Fondo>
  )
}
