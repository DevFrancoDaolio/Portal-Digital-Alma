import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import NavBar from "../componentes/NavBar";
import Fondo from '../componentes/Fondo';


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
    <Fondo>

      {/* 🔷 Navbar con solapas */}
      <NavBar />


      {/* 🔐 Formulario de registro */}
      <div className="create-account-container">
        <h2>Crear cuenta</h2>
        <p className="subtitle">Registrarse para solicitar o gestionar turnos</p>
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
      </Fondo>
    </>
  );
}
