import { Link } from "react-router-dom"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import { obtenerSesion } from "../services/loginService"
import "../styles/Inicio.css"

export default function Inicio() {
  const usuario = obtenerSesion()

  return (
    <Fondo>
      <NavBar />
      <div className="inicio-container">
        {!usuario ? (
          <div className="inicio-content">
            <div className="inicio-hero">
              <h1>Bienvenido a Turnify</h1>
              <p className="hero-subtitle">Sistema de Gestión de Turnos Médicos</p>
              <p className="hero-description">Administra tus consultas, pacientes y profesionales de forma fácil y segura.</p>
            </div>

            <div className="inicio-cards">
              <div className="info-card">
                <div className="card-icon">👨‍⚕️</div>
                <h3>Para Profesionales</h3>
                <p>Gestiona tus horarios, consultas y datos de pacientes de manera eficiente.</p>
                <Link to="/login" className="btn-card btn-blue">
                  Acceder como Profesional
                </Link>
              </div>

              <div className="info-card">
                <div className="card-icon">📋</div>
                <h3>Para Secretarias</h3>
                <p>Administra profesionales, pacientes, consultorios y turnos desde una plataforma centralizada.</p>
                <Link to="/login" className="btn-card btn-yellow">
                  Acceder como Secretaria
                </Link>
              </div>

              <div className="info-card">
                <div className="card-icon">🏥</div>
                <h3>Directorio de Profesionales</h3>
                <p>Consulta nuestro directorio de profesionales y sus especialidades disponibles.</p>
                <Link to="/ListarProfesionales" className="btn-card btn-green">
                  Ver Profesionales
                </Link>
              </div>
            </div>

            <div className="inicio-footer">
              <p>¿No tienes cuenta? <Link to="/CreateAccount" className="link-register">Regístrate aquí</Link></p>
            </div>
          </div>
        ) : (
          <div className="inicio-content">
            <div className="welcome-box">
              <h1>¡Bienvenido {usuario.nombre}!</h1>
              <p>Selecciona una opción del menú superior para comenzar.</p>
            </div>
          </div>
        )}
      </div>
    </Fondo>
  )
}
