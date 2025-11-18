import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { recuperarContrasena } from "../services/loginService"
import Fondo from "../componentes/Fondo"
import NavBar from "../componentes/NavBar"
import "../styles/Recuperar.css"

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

      {/* Cambié las clases aquí */}
      <div className="recuperar-container">
        <h1>Recuperar Contraseña</h1>
        <p className="recuperar-subtitle">
          Ingresa tu email para recibir un código de recuperación
        </p>

        {error && <div className="error-message">{error}</div>}
        {mensaje && <div className="success-message">{mensaje}</div>}

        <form className="recuperar-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          <button
            type="submit"
            className="btn-primary"
            disabled={cargando}
          >
            {cargando ? "Enviando..." : "Enviar código"}
          </button>
        </form>

        <div className="volver-login">
          <Link to="/login">Volver al login</Link>
        </div>
      </div>
    </Fondo>
  )
}

export default RecuperarContrasena
