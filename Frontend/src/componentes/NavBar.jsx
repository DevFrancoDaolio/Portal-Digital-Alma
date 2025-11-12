/* 🔷 Navbar con solapas */
import { Link, useLocation } from "react-router-dom"
import "../styles/NavBar.css"

const NavBar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <span>Turnify </span>
          <img src={"/LogoSinLetras.png"} style={{ height: "45px", width: "40px" }} />
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
            location.pathname === "/Especialidad"
              ? "active"
              : ""
          }
        >
          <Link to="/ListarProfesionales">Profesionales</Link>
        </li>
        <li
          className={
            location.pathname === "/ListarPaciente" || location.pathname === "/RegistrarPaciente" || location.pathname.startsWith("/EditarPaciente/") ? "active" : ""
          }
        >
          <Link to="/ListarPaciente">Pacientes</Link>
        </li>
        <li
          className={
            location.pathname === "/ListarConsultorio" || location.pathname === "/AgregarConsultorio" || location.pathname.startsWith("/EditarConsultorio/") ? "active" : ""
          }
        >
          <Link to="/ListarConsultorio">Consultorios</Link>
        </li>
        <li className={location.pathname === "/RegistrarTurno" ? "active" : ""}>
          <Link to="/RegistrarTurno">Turnos</Link>
        </li>
      </ul>
      <div className="nav-actions">
        <Link to="/login" className="btn-primary">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  )
}
export default NavBar
