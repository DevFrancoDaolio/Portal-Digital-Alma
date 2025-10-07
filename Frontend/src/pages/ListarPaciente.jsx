import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Paciente.css'; //VERRR!!!

const pacientes = [
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Gómez',
    email: 'carlos.gomez@salud.com',
    direccion: 'Av. Paciente 101',
    dni: '30123456',
  },
  {
    id: 2,
    nombre: 'Lucía',
    apellido: 'Martínez',
    email: 'lucia.martinez@salud.com',
    direccion: 'Calle Esperanza 202',
    dni: '27876543',
  },
  {
    id: 3,
    nombre: 'Tomás',
    apellido: 'Fernández',
    email: 'tomas.fernandez@salud.com',
    direccion: 'Ruta Cuidados 303',
    dni: '32109876',
  },
    {
    id: 4,
    nombre: 'Felipe',
    apellido: 'Carbonetti',
    email: 'tomas.fernandez@salud.com',
    direccion: 'Ruta Cuidados 303',
    dni: '32109876',
  },  {
    id: 5,
    nombre: 'Gabriel',
    apellido: 'SCRUM MASTER',
    email: 'scrumasdas@salud.com',
    direccion: 'PRESENTE 07/10/2025',
    dni: '42528901',
  },
   {
    id: 6,
    nombre: 'Francisco Alejandro ',
    apellido: 'Aquino',
    email: 'Aquino@salud.com',
    direccion: 'Ruta Cuidados 303',
    dni: '22528901',
  },
  {
    id: 7,
    nombre: 'Maria Silvia',
    apellido: 'Arenas',
    email: 'Arenas@salud.com',
    direccion: 'Ruta Cuidados 303',
    dni: '12528901',
  },

];

export default function ListarPaciente() {
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{
    backgroundImage: 'url("../../public/FondoTurnify.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    }}>
    <div className="paciente-container">
      
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
        
        {/* Lista de pacientes */}
        <main className="paciente-list">
          <div className="header-pacientes">
            <h2>Pacientes</h2>
            <div className="d-flex justify-content-end mt-1 gap-2">
              <button
                type="button"
                className="Paciente-button"
                onClick={() => navigate("/RegistrarPaciente")}
              >
                + Agregar Paciente
              </button>
            </div>
          </div>

          <div className="cards-container">
            {pacientes.map((pac) => (
              <div
                key={pac.id}
                className={`paciente-card ${seleccionado?.id === pac.id ? 'selected' : ''}`}
                onClick={() => setSeleccionado(pac)}
              >
                <strong>{pac.nombre} {pac.apellido}</strong>
                <p>DNI: {pac.dni}</p>
              </div>
            ))}
          </div>

          {/* Detalle */}
          {seleccionado && (
            <div className="paciente-detail">
              <h3>Detalles de {seleccionado.nombre} {seleccionado.apellido}</h3>
              <p><strong>Email:</strong> {seleccionado.email}</p>
              <p><strong>Dirección:</strong> {seleccionado.direccion}</p>
              <p><strong>DNI:</strong> {seleccionado.dni}</p>
            </div>
          )}
        </main>
      </div>
    </div>
    </div>
  );
}