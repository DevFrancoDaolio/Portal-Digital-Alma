import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../styles/Profesionales.css'; // ✅ Import del CSS
import NavBar from "../componentes/NavBar";
import Fondo from '../componentes/Fondo';


const specialties = [
  'Kinesiología', 'Psicología', 'Cardiología', 'Pediatría', 'Fonoaudiología', 'Psiquiatría', 'Médico Clínico', 'Psicomotricidad'
];

const professionals = [
  {
    id: 1,
    nombre: 'Richard',
    apellido: 'James',
    email: 'richard.james@clinic.com',
    direccion: 'Av. Salud 123',
    especialidades: ['Pediatría', 'Psicomotricidad'],
  },
  {
    id: 2,
    nombre: 'Emily',
    apellido: 'Larson',
    email: 'emily.larson@clinic.com',
    direccion: 'Calle Bienestar 456',
    especialidades: ['Kinesiología', 'Psicología'],
  },
  {
    id: 3,
    nombre: 'Sarah',
    apellido: 'Patel',
    email: 'sarah.patel@clinic.com',
    direccion: 'Ruta Médica 789',
    especialidades: ['Cardiología', 'Medico Clínico'],
  },

   {
    id: 4,
    nombre: 'Juan',
    apellido: 'Puga',
    email: 'Puga@clinic.com',
    direccion: 'Ruta Médica 781',
    especialidades: [ 'Kinesiología', 'Psicología', 'Cardiología',  ],
  },


];


export default function ClinicProfessionals() {
  const [filtro, setFiltro] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();
  const filtrados = filtro
    ? professionals.filter(p => p.especialidades.includes(filtro))
    : professionals;

  const location = useLocation();


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
