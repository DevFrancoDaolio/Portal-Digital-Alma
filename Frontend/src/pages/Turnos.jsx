import { useState } from "react";
import "../styles/Turnos.css";

export default function Turnos() {
  const [turnos, setTurnos] = useState([
    { id: 1, paciente: "Ana López", profesional: "Dr. Gómez", hora: "10:00" },
    { id: 2, paciente: "Luis Pérez", profesional: "Dra. Martínez", hora: "11:30" },
  ]);

  const [nuevoTurno, setNuevoTurno] = useState({
    paciente: "",
    profesional: "",
    hora: "",
  });

  const handleChange = (e) => {
    setNuevoTurno({ ...nuevoTurno, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoTurno.paciente || !nuevoTurno.profesional || !nuevoTurno.hora) return;
    const nuevo = {
      id: turnos.length + 1,
      ...nuevoTurno,
    };
    setTurnos([...turnos, nuevo]);
    setNuevoTurno({ paciente: "", profesional: "", hora: "" });
  };

  const handleEliminar = (id) => {
    setTurnos(turnos.filter((t) => t.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Turnos</h2>

      {/* Formulario */}
      <form className="row g-3 mb-4" onSubmit={handleAgregar}>
        <div className="col-md-4">
          <input
            type="text"
            name="paciente"
            className="form-control"
            placeholder="Paciente"
            value={nuevoTurno.paciente}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="profesional"
            className="form-control"
            placeholder="Profesional"
            value={nuevoTurno.profesional}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="hora"
            className="form-control"
            value={nuevoTurno.hora}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1 d-grid">
          <button type="submit" className="btn btn-success">+</button>
        </div>
      </form>

      {/* Tabla */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Profesional</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td>{turno.id}</td>
              <td>{turno.paciente}</td>
              <td>{turno.profesional}</td>
              <td>{turno.hora}</td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(turno.id)}>
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
