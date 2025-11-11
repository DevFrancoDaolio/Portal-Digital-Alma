import { Link } from "react-router-dom";
import "../styles/Home.css";
import NavBar from "../componentes/NavBar";
import Fondo from '../componentes/Fondo';

export default function Home() {
  return (
    <>
    
    <Fondo>

      {/* 🔷 Navbar */}
      <NavBar />

      {/* 🔷 Contenido principal del Home */}
      <div className="container mt-5 text-center">
        <h1 className="mb-4">Bienvenido a Turnify</h1>
        <p className="lead">Gestioná profesionales, pacientes y turnos desde un solo lugar.</p>

        <div className="d-flex flex-column align-items-center gap-3 mt-4">
          <Link to="/ListarProfesionales" className="btn-light-gray w-50">Profesionales</Link>
          <Link to="/ListarPaciente" className="btn-light-gray w-50">Pacientes</Link>
          <Link to="/ConsultarTurnos" className="btn-light-gray w-50">Turnos</Link>
          <Link to="/ListarConsultorio" className="btn-light-gray w-50">Consultorios</Link>
        </div>
      </div>
      </Fondo>
    </>
  );
}
