import { Navigate } from "react-router-dom"
import { obtenerSesion, obtenerRol } from "../services/loginService"

export default function ProtectedRoute({ children, rolesPermitidos = [] }) {
  const usuario = obtenerSesion()
  const rol = obtenerRol()

  // Si no está autenticado, redirigir a login
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Si hay roles permitidos y el usuario no tiene uno, redirigir
  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rol)) {
    return <Navigate to="/" replace />
  }

  return children
}
