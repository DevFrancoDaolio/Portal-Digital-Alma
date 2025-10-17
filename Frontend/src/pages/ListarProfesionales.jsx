import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getProfesionales } from '../services/profesionalesService';
import '../styles/Profesionales.css'; // ✅ Import del CSS
import NavBar from "../componentes/NavBar";
import Fondo from '../componentes/Fondo';
 

const specialties = [
  'Kinesiología', 'Psicología', 'Cardiología', 'Pediatría', 'Fonoaudiología', 'Psiquiatría', 'Médico Clínico', 'Psicomotricidad'
];



export default function ClinicProfessionals() {
  const [filtro, setFiltro] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [professionals, setProfessionals] = useState([]);
  const navigate = useNavigate();
  
  const filtrados = filtro
    ? professionals.filter(p => p.especialidades.includes(filtro))
    : professionals;

  const location = useLocation();

  useEffect(() => {
  getProfesionales()
    .then(response => {
      setProfessionals(response.data);
    })
    .catch(error => {
      console.error("Error al obtener profesionales:", error);
    });
}, []);


  return (

    <Fondo>

    <div className="clinic-container">
      
      {/* 🔷 Navbar */}
      <NavBar />


      {/* Layout principal */}
      <div className="main-layout">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Especialidades</h3>
          <ul className="specialty-list">
            {specialties.map((esp) => (
              <li key={esp}>
                <button
                  className={`specialty-button ${filtro === esp ? 'active' : ''}`}
                  onClick={() => setFiltro(filtro === esp ? null : esp)}
                >
                  {esp}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Lista de profesionales */}
        <main className="professional-list">
          <div className="header-profesionales">
            <h2>Profesionales</h2>
              <div className="d-flex justify-content-end mt-1">
                <button
                    type="button"
                    className="boton-agregar"
                    onClick={() => navigate("/RegistrarProfesional")}
                >
                    + Agregar Profesional
                </button>
                </div>
          </div>

        <div className="cards-container">
  {filtrados.map((prof) => (
    <div
            key={prof.id}
            className={`professional-card ${seleccionado?.id === prof.id ? 'selected' : ''}`}
            onClick={() => setSeleccionado(prof)}
          >
            <img
              src={prof.fotoUrl || '/doc1.png'}
              alt={`${prof.nombre} ${prof.apellido}`}
              className="doctor-photo"
            />
            <strong>{prof.nombre} {prof.apellido}</strong>
            <p>Especialidades: {prof.especialidades.join(', ')}</p>
          </div>
        ))}
      </div>
      
          {/* Detalle */}
          {seleccionado && (
            <div className="professional-detail">
              <h3>Detalles de {seleccionado.nombre} {seleccionado.apellido}</h3>
              <p><strong>Email:</strong> {seleccionado.email}</p>
              <p><strong>Dirección:</strong> {seleccionado.direccion}</p>
                  <button
                  className="btn btn-warning mt-2"
                  onClick={() => navigate(`/EditarProfesional/${seleccionado.id}`)}
                  >
                  Editar Profesional
                  </button>
            </div>
          )}
        </main>
      </div>
    </div>
    </Fondo>
  );
}
