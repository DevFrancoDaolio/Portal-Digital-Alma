import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Especialidad.css";


export default function AgregarEspecialidad() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    matricula: "",
    profesional: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    console.log("Nueva especialidad:", form);
    // Aquí podrías enviar a backend con fetch o axios
    // navigate("/ListarEspecialidades");
  };


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
          <li className={location.pathname === "/Especialidad" ? "active" : ""}><Link to="/ListarProfesionales">Profesionales</Link></li>
          <li className={location.pathname === "/ListarPaciente" ? "active" : ""}><Link to="/ListarPaciente">Pacientes</Link></li>
          <li className={location.pathname === "/Turnos" ? "active" : ""}><Link to="/Turnos">Turnos</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/login" className="btn-primary">Crear cuenta</Link>
      </div>
    </nav>

    <div className="registro-card">
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Especialidad</h2>

      <form className="mb-4" onSubmit={handleAgregar}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Cardiología"
          />
        </div>

        {/* 
        <div className="mb-3">
          <label className="form-label">Matrícula</label>
          <input
            type="text"
            name="matricula"
            className="form-control"
            value={form.matricula}
            onChange={handleChange}
            placeholder="Número de matrícula profesional"
          />
        </div>
         */}

        {/* <div className="mb-3">
          <label className="form-label">Profesional</label>
          <input
            type="text"
            name="profesional"
            className="form-control"
            value={form.profesional}
            onChange={handleChange}
            placeholder="Nombre del profesional asociado"
          />
        </div>
 */}

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción de la especialidad"
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("../RegistrarProfesional")}>
          Cancelar
        </button>
      </form>
    </div>
    </div>
    </div>
    </>
  );
  
}
