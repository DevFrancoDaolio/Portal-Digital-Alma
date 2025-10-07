import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
//import { crearProfesional } from "../services/profesionalesService";
//import { getEspecialidades } from "../services/especialidadesService";
import { getEspecialidades } from "../services/especialidades-service";
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
    especialidades: [], // [{ especialidadId, matricula, esPrincipal }]
    servicio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEspecialidadesChange = (e) => {
    const seleccionadas = Array.from(e.target.selectedOptions, (opt) => opt.value);
    const nuevas = seleccionadas.map((id) => {
      const existente = form.especialidades.find((e) => e.especialidadId === id);
      return existente ?? { especialidadId: id, matricula: "", esPrincipal: false };
    });
    setForm({ ...form, especialidades: nuevas });
  };

  const handleMatriculaChange = (index, value) => {
    const copia = [...form.especialidades];
    copia[index].matricula = value;
    setForm({ ...form, especialidades: copia });
  };

  const handlePrincipalChange = (id) => {
    const actualizadas = form.especialidades.map((e) => ({
      ...e,
      esPrincipal: e.especialidadId === id,
    }));
    setForm({ ...form, especialidades: actualizadas });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    console.log("Nuevo profesional:", form);
    // navigate("/ListarProfesionales");
  };

  const handleDireccionChange = (e) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    direccion: {
      ...form.direccion,
      [name]: value,
      ...(name === "provincia" ? { localidad: "" } : {}), // reset localidad si cambia provincia
    },
  });
};


  useEffect(() => {
  // Simulación de especialidades disponibles
  setEspecialidadesDisponibles([
    { id: "cardiologia", nombre: "Cardiología" },
    { id: "pediatria", nombre: "Pediatría" },
    { id: "dermatologia", nombre: "Dermatología" },
    { id: "neurologia", nombre: "Neurología" },
    { id: "clinica", nombre: "Clínica Médica" },
  ]);
}, []);

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
          <li className={location.pathname === "/RegistrarProfesional" ? "active" : ""}><Link to="/ListarProfesionales">Profesionales</Link></li>
          <li className={location.pathname === "/ListarPaciente" ? "active" : ""}><Link to="/ListarPaciente">Pacientes</Link></li>
          <li className={location.pathname === "/Turnos" ? "active" : ""}><Link to="/Turnos">Turnos</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/login" className="btn-primary">Crear cuenta</Link>
      </div>
    </nav>

    
    <div style={{
    backgroundImage: 'url("../../public/FondoTurnify.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  }}> 



    <div className="registro-card2">
    {/* 🔷 Formulario de registro de profesional */}
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Profesional</h2>

      <form className="mb-4" onSubmit={handleAgregar}>
        {/* Datos básicos */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
        </div>

{/* Dirección */}
<div className="mb-4">
  <label className="form-label">Dirección</label>

  <div className="row mb-2">
    <div className="col-md-6">
      <input
        type="text"
        name="calle"
        className="form-control"
        placeholder="Calle"
        value={form.direccion.calle}
        onChange={handleDireccionChange}
      />
    </div>
    <div className="col-md-3">
      <input
        type="text"
        name="numero"
        className="form-control"
        placeholder="Número"
        value={form.direccion.numero}
        onChange={handleDireccionChange}
      />
    </div>
    <div className="col-md-3">
      <input
        type="text"
        name="codigoPostal"
        className="form-control"
        placeholder="Código Postal"
        value={form.direccion.codigoPostal}
        onChange={handleDireccionChange}
      />
    </div>
  </div>

  <div className="row mb-2">
    <div className="col-md-3">
      <input
        type="text"
        name="piso"
        className="form-control"
        placeholder="Piso"
        value={form.direccion.piso}
        onChange={handleDireccionChange}
      />
    </div>
    <div className="col-md-3">
      <input
        type="text"
        name="dpto"
        className="form-control"
        placeholder="Dpto"
        value={form.direccion.dpto}
        onChange={handleDireccionChange}
      />
    </div>
    <div className="col-md-3">
      <select
        name="provincia"
        className="form-select"
        value={form.direccion.provincia}
        onChange={handleDireccionChange}
      >
        <option value="">Provincia</option>
        {provincias.map((prov) => (
          <option key={prov.id} value={prov.id}>{prov.nombre}</option>
        ))}
      </select>
    </div>
    <div className="col-md-3">
      <select
        name="localidad"
        className="form-select"
        value={form.direccion.localidad}
        onChange={handleDireccionChange}
        disabled={!form.direccion.provincia}
      >
        <option value="">Localidad</option>
        {(localidadesPorProvincia[form.direccion.provincia] || []).map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  </div>
</div>


        {/* Tabla de especialidades */}
<div className="mb-4">
  <label className="form-label">Especialidades</label>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Seleccionar</th>
        <th>Matrícula</th>
        <th>Principal</th>
      </tr>
    </thead>
    <tbody>
      {especialidadesDisponibles.map((esp) => {
        const seleccionada = form.especialidades.find((e) => e.especialidadId === esp.id);
        return (
          <tr key={esp.id}>
            <td>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={!!seleccionada}
                  onChange={() => {
                    const yaExiste = !!seleccionada;
                    const nuevas = yaExiste
                      ? form.especialidades.filter((e) => e.especialidadId !== esp.id)
                      : [...form.especialidades, { especialidadId: esp.id, matricula: "", esPrincipal: false }];
                    setForm({ ...form, especialidades: nuevas });
                  }}
                />
                <label className="form-check-label ms-2">{esp.nombre}</label>
              </div>
            </td>
            <td>
              {seleccionada && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Matrícula"
                  value={seleccionada.matricula}
                  onChange={(e) => {
                    const actualizadas = form.especialidades.map((item) =>
                      item.especialidadId === esp.id ? { ...item, matricula: e.target.value } : item
                    );
                    setForm({ ...form, especialidades: actualizadas });
                  }}
                />
              )}
            </td>
            <td className="text-center">
              {seleccionada && (
                <input
                  type="radio"
                  name="principal"
                  checked={seleccionada.esPrincipal}
                  onChange={() => {
                    const actualizadas = form.especialidades.map((item) => ({
                      ...item,
                      esPrincipal: item.especialidadId === esp.id,
                    }));
                    setForm({ ...form, especialidades: actualizadas });
                  }}
                />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <div className="d-flex justify-content-end mt-2">
  <button
    type="button"
    className="btn btn-success"
    onClick={() => navigate("/Especialidad")}
  >
    + Agregar especialidad
  </button>
  </div>

  </div>

        {/* Servicio */}
        <div className="mb-3">
          <label className="form-label">Tipo de servicio</label>
          <input type="text" name="servicio" className="form-control" value={form.servicio} onChange={handleChange} />
        </div>

        {/* Botones */}
        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/listarProfesionales")}>
          Cancelar
        </button>
      </form>
    </div>
    </div>
    </div> 
    
  </>
  );
}
