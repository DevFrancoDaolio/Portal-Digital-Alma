import api from '../api';

// GET todos los pacientes
export const getPacientes = () => api.get('/pacientes');

// GET paciente por ID
export const getPacienteById = (id) => api.get(`/pacientes/${id}`);

// POST nuevo paciente
export const crearPaciente = (data) => api.post('/pacientes/nuevo', data);

// PUT actualizar paciente
export const actualizarPaciente = (id, data) => api.put(`/pacientes/actualizar/${id}`, data);

// DELETE paciente
export const eliminarPaciente = (id) => api.delete(`/pacientes/${id}`);