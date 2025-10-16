import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/RegistrarPaciente.css"; // Asegurate de tener este archivo
import NavBar from "../componentes/NavBar";
import Fondo from '../componentes/Fondo';

export default function RegistrarPaciente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    obraSocial: "",
    direccion: {
      calle: "",
      numero: "",
      codigoPostal: "",
      piso: "",
      dpto: "",
      provincia: "",
      localidad: "",
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDireccionChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      direccion: {
        ...form.direccion,
        [name]: value,
        ...(name === "provincia" ? { localidad: "" } : {}),
      },
    });
  };

  const handleRegistrar = (e) => {
    e.preventDefault();
    console.log("Nuevo paciente:", form);
    // Aquí podrías usar crearPaciente(form)
    // navigate("/listarPacientes");
  };

  const provincias = [
    { id: "cordoba", nombre: "Córdoba" },
    { id: "buenos_aires", nombre: "Buenos Aires" },
    { id: "santa_fe", nombre: "Santa Fe" },
  ];

  const localidadesPorProvincia = {
    cordoba: ["Córdoba Capital", "Villa María", "Río Cuarto"],
    buenos_aires: ["La Plata", "Mar del Plata", "Bahía Blanca"],
    santa_fe: ["Rosario", "Santa Fe Capital", "Rafaela"],
  };

  return (
    <>
    
    <Fondo>
  
      {/* 🔷 Navbar */}
      <NavBar />


      {/* 🔷 Formulario */}
        <div className="registro-card">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Registrar Paciente</h2>

          <form onSubmit={handleRegistrar}>
            {/* Datos personales */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" name="apellido" className="form-control" value={form.apellido} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">DNI</label>
              <input type="text" name="dni" className="form-control" value={form.dni} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" className="form-control" value={form.fechaNacimiento} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Obra Social</label>
              <input type="text" name="obraSocial" className="form-control" value={form.obraSocial} onChange={handleChange} />
            </div>

            {/* Dirección */}
            <div className="mb-4">
              <label className="form-label">Dirección</label>
              <div className="row mb-2">
                <div className="col-md-6">
                  <input type="text" name="calle" className="form-control" placeholder="Calle" value={form.direccion.calle} onChange={handleDireccionChange} />
                </div>
                <div className="col-md-3">
                  <input type="text" name="numero" className="form-control" placeholder="Número" value={form.direccion.numero} onChange={handleDireccionChange} />
                </div>
                <div className="col-md-3">
                  <input type="text" name="codigoPostal" className="form-control" placeholder="Código Postal" value={form.direccion.codigoPostal} onChange={handleDireccionChange} />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-3">
                  <input type="text" name="piso" className="form-control" placeholder="Piso" value={form.direccion.piso} onChange={handleDireccionChange} />
                </div>
                <div className="col-md-3">
                  <input type="text" name="dpto" className="form-control" placeholder="Dpto" value={form.direccion.dpto} onChange={handleDireccionChange} />
                </div>
                <div className="col-md-3">
                  <select name="provincia" className="form-select" value={form.direccion.provincia} onChange={handleDireccionChange}>
                    <option value="">Provincia</option>
                    {provincias.map((prov) => (
                      <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select name="localidad" className="form-select" value={form.direccion.localidad} onChange={handleDireccionChange} disabled={!form.direccion.provincia}>
                    <option value="">Localidad</option>
                    {(localidadesPorProvincia[form.direccion.provincia] || []).map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Botones */}
            <button type="submit" className="btn btn-primary me-2">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/ListarPaciente")}>Cancelar</button>
          </form>
        </div>
      </div>
  

      </Fondo>
    </>
  );
}