import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Turnos
export const obtenerTurnos = () => api.get('/turnos')

export const obtenerTurnosPorFecha = (fecha) => api.get(`/turnos/fecha/${fecha}`)

export const obtenerTurnosPorProfesionalYFecha = (profesionalId, fecha) =>
  api.get(`/turnos/profesional/${profesionalId}/fecha/${fecha}`)

export const crearTurno = (data) => api.post('/turnos', data)

export const actualizarTurno = (id, data) => api.put(`/turnos/${id}`, data)

export const cambiarEstadoTurno = (id, estado) => api.patch(`/turnos/${id}/estado`, { estado })

export const cancelarTurno = (id) => api.delete(`/turnos/${id}`)

// Referencia
export const obtenerProfesionales = () => api.get('/profesionales')

export const obtenerEspecialidades = () => api.get('/especialidades')

export const obtenerConsultorios = () => api.get('/consultorios')

export const obtenerPacientes = () => api.get('/pacientes')

export default api
