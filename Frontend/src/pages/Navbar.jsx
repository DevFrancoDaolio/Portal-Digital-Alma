import { Link } from "react-router-dom";
import logo from "../assets/LogoSinLetras.png"; // 👈 si lo tenés en src/assets

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <span>Turnify </span>
          <img src={logo} alt="Logo Turnify" style={{ height: '45px', width: '40px' }} />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/ListarProfesionales">Profesionales</Link></li>
        <li><Link to="/ListarPaciente">Pacientes</Link></li>
        <li><Link to="/Turnos">Turnos</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/login" className="btn-primary">Crear cuenta</Link>
      </div>
    </nav>
  );
}
