import api from "./api"

// Registro de usuario
export const registroUsuario = (datos) => api.post("/auth/registro", datos)

// Login
export const loginUsuario = (email, password) => api.post("/auth/login", { email, password })

// Validar sesión
export const validarSesion = () => api.get("/auth/me")

export const recuperarContrasena = (email) => api.post("/auth/recuperar-contrasena", { email })

// Logout (local)
export const logoutUsuario = () => {
  localStorage.removeItem("sesion")
  localStorage.removeItem("usuarioActual")
}

// Guardar sesión
export const guardarSesion = (usuario) => {
  localStorage.setItem("usuarioActual", JSON.stringify(usuario))
}

// Obtener sesión actual
export const obtenerSesion = () => {
  const sesion = localStorage.getItem("usuarioActual")
  return sesion ? JSON.parse(sesion) : null
}

// Verificar si está autenticado
export const estaAutenticado = () => {
  return localStorage.getItem("usuarioActual") !== null
}

// Obtener rol del usuario
export const obtenerRol = () => {
  const usuario = obtenerSesion()
  return usuario?.rol || null
}
