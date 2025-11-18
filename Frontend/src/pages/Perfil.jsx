import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import { obtenerSesion } from "../services/loginService"
import "../styles/Perfil.css"

export default function Perfil() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const sesion = obtenerSesion()
    if (sesion) {
      setUsuario(sesion)
    }
    setCargando(false)
  }, [])

  if (cargando) return <div>Cargando...</div>

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Fondo>
      <NavBar />
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="perfil-header">
            <h1>Mi Perfil</h1>
            <span className={`role-badge role-${usuario.rol}`}>{usuario.rol.toUpperCase()}</span>
          </div>

          <div className="perfil-content">
            <div className="perfil-info-group">
              <h3>Información Personal</h3>
              <div className="info-item">
                <label>Nombre:</label>
                <p>{usuario.nombre}</p>
              </div>
              <div className="info-item">
                <label>Apellido:</label>
                <p>{usuario.apellido}</p>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <p>{usuario.email}</p>
              </div>
              <div className="info-item">
                <label>Rol:</label>
                <p className="rol-text">{usuario.rol}</p>
              </div>
            </div>

            <div className="perfil-info-group">
              <h3>Estado de la Cuenta</h3>
              <div className="info-item">
                <label>Estado:</label>
                <p className={usuario.activo ? "activo" : "inactivo"}>
                  {usuario.activo ? "✓ Activo" : "✗ Inactivo"}
                </p>
              </div>
              <div className="info-item">
                <label>Fecha de Registro:</label>
                <p>{formatearFecha(usuario.fechaCreacion)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fondo>
  )
}
