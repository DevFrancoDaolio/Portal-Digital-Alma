import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { recuperarContrasena } from "../services/loginService"
import Fondo from "../componentes/Fondo"
import NavBar from "../componentes/NavBar"
import "../styles/Login.css"

const RecuperarContrasena = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMensaje("")
    setCargando(true)

    try {
      const response = await recuperarContrasena(email)
      if (response.data.success) {
        setMensaje(
          "Se ha enviado un código de recuperación al email. Por favor revisa tu bandeja de entrada."
        )
        setEmail("")
        setTimeout(() => navigate("/login"), 3000)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al recuperar contraseña")
    } finally {
      setCargando(false)
    }
  }

  return (
    <Fondo>
      <NavBar />
      <div className="login-container">
        <div className="login-form">
          <h1>Recuperar Contraseña</h1>
          <p>Ingresa tu email para recibir un código de recuperación</p>

          {error && <div className="error-message">{error}</div>}
          {mensaje && <div className="success-message">{mensaje}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={cargando}
            >
              {cargando ? "Enviando..." : "Enviar código"}
            </button>
          </form>

          <div className="login-links">
            <Link to="/login">Volver al login</Link>
          </div>
        </div>
      </div>
    </Fondo>
  )
}

export default RecuperarContrasena
