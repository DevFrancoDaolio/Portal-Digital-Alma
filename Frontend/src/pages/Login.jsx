import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://tu-api.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al crear cuenta');
      const result = await response.json();
      console.log('Cuenta creada:', result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      {/* 🔷 Navbar con solapas */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Turnify</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/RegistrarProfesional">Profesionales</Link></li>
          <li><Link to="/Pacientes">Pacientes</Link></li>
          <li><Link to="/Turnos">Turnos</Link></li>
        </ul>
        <div className="nav-actions">
          <Link to="/signup" className="btn-primary">Crear cuenta</Link>
        </div>
      </nav>

      {/* 🔐 Formulario de registro */}
      <div className="create-account-container">
        <h2>Crear cuenta</h2>
        <p className="subtitle">Registrarse para solicitar turnos</p>
        <form onSubmit={handleSubmit} className="create-account-form">
          <input
            type="text"
            name="fullName"
            placeholder="Nombre y Apellido"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary">Registrar</button>
        </form>
        <p>
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </>
  );
}
