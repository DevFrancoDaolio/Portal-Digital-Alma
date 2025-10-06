import { useState } from "react";
import "../styles/Profesionales.css";

export default function Profesionales() {
  const especialidades = [
    "Cardiología",
    "Pediatría",
    "Dermatología",
    "Neurología",
    "Clínica Médica",
  ];

  const [profesionales, setProfesionales] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    servicio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    const nuevo = {
      id: profesionales.length + 1,
      ...form,
    };
    setProfesionales([...profesionales, nuevo]);
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      especialidad: "",
      servicio: "",
    });
  };

  const handleEliminar = (id) => {
    setProfesionales(profesionales.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Profesionales</h2>

      {/* Formulario vertical */}
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
        <div className="mb-3">
          <label className="form-label">Especialidad</label>
          <select
            name="especialidad"
            className="form-select"
            value={form.especialidad}
            onChange={handleChange}
          >
            <option value="">Seleccionar especialidad</option>
            {especialidades.map((esp, i) => (
              <option key={i} value={esp}>{esp}</option>
            ))}
          </select>
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
        <button type="submit" className="btn btn-primary">Agregar profesional</button>
      </form>

      {/* Tabla de profesionales */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Especialidad</th>
            <th>Servicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesionales.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.email}</td>
              <td>{p.telefono}</td>
              <td>{p.especialidad}</td>
              <td>{p.servicio}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-outline-warning me-2">Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
