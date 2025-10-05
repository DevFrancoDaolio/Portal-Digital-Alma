import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
