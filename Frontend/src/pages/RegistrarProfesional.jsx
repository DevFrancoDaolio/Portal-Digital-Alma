import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { crearProfesional } from "../services/profesionalesService";
//import { getEspecialidades } from "../services/especialidadesService";
import "../styles/Profesionales.css";

export default function AgregarProfesional() {
  const navigate = useNavigate();
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);

  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    email: "",
    telefono: "",
    direccion: {
      calle: "",
      numero: "",
      codigoPostal: "",
      piso: "",
      dpto: "",
      provincia: "",
      localidad: "",
    },
    especialidades: [],
    principal: "",
  });

/*   useEffect(() => {
    getEspecialidades()
      .then((res) => setEspecialidadesDisponibles(res.data))
      .catch((err) => console.error("Error al cargar especialidades:", err));
  }, []); */

  // ... resto del código igual que antes


// export default function AgregarProfesional() {
//   const especialidades = [
//     "Cardiología",
//     "Pediatría",
//     "Dermatología",
//     "Neurología",
//     "Clínica Médica",
//   ];

//   const [form, setForm] = useState({
//     nombre: "",
//     email: "",
//     telefono: "",
//     especialidad: "",
//     servicio: "",
//   });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    // Acá podrías enviar a backend o usar context para compartir con Profesionales.jsx
    console.log("Nuevo profesional:", form);
    //navigate("/ListarProfesionales");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Profesional</h2>

      <form className="mb-4" onSubmit={handleAgregar}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3 d-flex align-items-center gap-3">
          <div style={{ flex: 1 }}>
            <label className="form-label">Especialidades</label>
            <select
              multiple
              name="especialidades"
              className="form-select"
              value={form.especialidades}
              onChange={(e) => {
                const opciones = Array.from(e.target.selectedOptions, (opt) => opt.value);
                setForm({ ...form, especialidades: opciones });
              }}
            >
              {especialidadesDisponibles.map((esp) => (
                <option key={esp.id} value={esp.id}>{esp.nombre}</option>
              ))}
            </select>
          </div>

          <div className="boton-agregar">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => navigate("/Especialidad")}
            >
              +
            </button>
          </div>
          </div>

        <div className="mb-3">
          <label className="form-label">Tipo de servicio</label>
          <input
            type="text"
            name="servicio"
            className="form-control"
            value={form.servicio}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
