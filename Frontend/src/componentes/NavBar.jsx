import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerSesion, logoutUsuario } from "../services/loginService"
import "../styles/NavBar.css"

const NavBar = () => {
  const location = useLocation()
  const [usuarioActual, setUsuarioActual] = useState(null)

  useEffect(() => {
    // Cargar usuario al montar
    const usuario = obtenerSesion()
    setUsuarioActual(usuario)

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const usuarioActualizado = obtenerSesion()
      setUsuarioActual(usuarioActualizado)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleVerPerfil = () => {
    if (usuarioActual) {
      window.location.href = "/Perfil"
    }
  }

  const handleLogout = () => {
    logoutUsuario()
    setUsuarioActual(null)
    window.location.href = "/login"
  }

  const handleProfesionalesClick = (e) => {
    if (usuarioActual && usuarioActual.rol === "profesional") {
      e.preventDefault()
      window.location.href = "/MisHorarios"
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <span>Turnify </span>
          <img src={"/LogoSinLetras.png"} style={{ height: "45px", width: "40px" }} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Inicio</Link>
        </li>
        <li
          className={
            location.pathname === "/ListarProfesionales" ||
            location.pathname === "/RegistrarProfesional" ||
            location.pathname === "/Especialidad" ||
            location.pathname === "/MisHorarios"
              ? "active"
              : ""
          }
        >
          <Link 
            to={usuarioActual?.rol === "profesional" ? "/MisHorarios" : "/ListarProfesionales"}
            onClick={handleProfesionalesClick}
          >
            Profesionales
          </Link>
        </li>
        <li
          className={
            location.pathname === "/ListarPaciente" ||
            location.pathname === "/RegistrarPaciente" ||
            location.pathname.startsWith("/EditarPaciente/")
              ? "active"
              : ""
          }
        >
          <Link to="/ListarPaciente">Pacientes</Link>
        </li>
        <li
          className={
            location.pathname === "/ListarConsultorio" ||
            location.pathname === "/AgregarConsultorio" ||
            location.pathname.startsWith("/EditarConsultorio/")
              ? "active"
              : ""
          }
        >
          <Link to="/ListarConsultorio">Consultorios</Link>
        </li>
        <li className={location.pathname === "/RegistrarTurno" ? "active" : ""}>
          <Link to="/RegistrarTurno">Turnos</Link>
        </li>
      </ul>
      <div className="nav-actions">
        {usuarioActual ? (
          <div className="user-section">
            <span className="user-info">
              {usuarioActual.nombre} {usuarioActual.apellido}
            </span>
            <button onClick={handleVerPerfil} className="profile-btn">
              Ver Perfil
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
