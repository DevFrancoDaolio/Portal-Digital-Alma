import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profesionales.css'; // ✅ Import del CSS


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
    email: 'Juanka.patel@clinic.com',
    direccion: 'Ruta Médica 781',
    especialidades: [ 'Kinesiología' ],
  },


];


export default function ClinicProfessionals() {
  const [filtro, setFiltro] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();
  const filtrados = filtro
    ? professionals.filter(p => p.especialidades.includes(filtro))
    : professionals;

  return (


    <div style={{
    backgroundImage: 'url("../../public/FondoTurnify.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  }}>

    <div className="clinic-container">
      
      {/* 🔷 Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
          <span>Turnify </span>
          <img src={"/public/LogoSinLetras.png"} style={{ height: '45px', width: '40px' }}/>
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
                    className="Profesional-button"
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
    </div>
  );
}
