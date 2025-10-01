import api from "./api";

// GET todos los profesionales
export const getProfesionales = () => api.get("/");

// GET por ID
export const getProfesionalById = (id) => api.get(`/${id}`);

// POST nuevo profesional
export const crearProfesional = (data) => api.post("/nuevoProfesional", data);

// PUT actualizar profesional
export const actualizarProfesional = (id, data) => api.put(`/actualizar/${id}`, data);

// DELETE profesional
export const eliminarProfesional = (id) => api.delete(`/${id}`);

// PUT nuevo servicio para profesional
export const agregarServicio = (id, servicio) => api.put(`/nuevo-servicio/${id}`, servicio);

// GET especialidades
export const getEspecialidades = () => api.get("/especialidades");

// PUT agregar especialidad a profesional
export const agregarEspecialidadAProfesional = (id, especialidad) =>
  api.put(`/agregar-especialidad/${id}`, especialidad);

