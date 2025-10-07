import { Link } from "react-router-dom";
import "../styles/Home.css"; 

export default function Home() {
  return (
    <>
    <div style={{
    backgroundImage: 'url("../../public/FondoTurnify.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    }}>
      {/* 🔷 Navbar con solapas */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
          <span>Turnify </span>
          <img src={"/public/LogoSinLetras.png"} style={{ height: '45px', width: '40px' }}/>
          </Link>

        </div>
        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""} ><Link to="/">Inicio</Link></li>
          <li className={location.pathname === "/ListarProfesionales" ? "active" : ""} ><Link to="/ListarProfesionales">Profesionales</Link></li>
          <li className={location.pathname === "/ListarPaciente" ? "active" : ""} ><Link to="/ListarPaciente">Pacientes</Link></li>
          <li className={location.pathname === "/Turnos" ? "active" : ""}><Link to="/Turnos">Turnos</Link></li>
        </ul>
        <div className="nav-actions">
          <Link to="/login" className="btn-primary">Crear cuenta</Link>
        </div>
      </nav>

      {/* 🔷 Contenido principal del Home */}
      <div className="container mt-5 text-center">
        <h1 className="mb-4">Bienvenido a Turnify</h1>
        <p className="lead">Gestioná profesionales, pacientes y turnos desde un solo lugar.</p>

        <div className="d-flex flex-column align-items-center gap-3 mt-4">
          <Link to="/ListarProfesionales" className="btn-light-gray w-50">Profesionales</Link>
          <Link to="/ListarPaciente" className="btn-light-gray w-50">Ver Pacientes</Link>
          <Link to="/Turnos" className="btn-light-gray w-50">Administrar Turnos</Link>
        </div>
      </div>
      </div>
    </>
  );
}
