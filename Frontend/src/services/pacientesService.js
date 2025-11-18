const API_URL = 'http://localhost:5000/api'

const pacienteService = {
  // Pacientes CRUD
  async listar() {
    const response = await fetch(`${API_URL}/pacientes`)
    if (!response.ok) throw new Error('Error al obtener pacientes')
    const json = await response.json()
    return json.data || []
  },

  async obtenerPorId(id) {
    const response = await fetch(`${API_URL}/pacientes/${id}`)
    if (!response.ok) throw new Error('Paciente no encontrado')
    const json = await response.json()
    return json.data
  },

  async crear(pacienteDto) {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteDto),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error al crear paciente')
    }
    const json = await response.json()
    return json.data
  },

  async actualizar(id, pacienteDto) {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteDto),
    })
    if (!response.ok) throw new Error('Error al actualizar paciente')
    const json = await response.json()
    return json.data
  },

  async eliminar(id) {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Error al eliminar paciente')
    const json = await response.json()
    return json.data
  },

  // Datos de referencia
  async obtenerObrasSociales() {
    const response = await fetch(`${API_URL}/referencia/obras-sociales`)
    if (!response.ok) throw new Error('Error al obtener obras sociales')
    const json = await response.json()
    return json.data || []
  },

  async obtenerProvincias() {
    const response = await fetch(`${API_URL}/referencia/provincias`)
    if (!response.ok) throw new Error('Error al obtener provincias')
    const json = await response.json()
    return json.data || []
  },

  async obtenerLocalidades(provinciaId) {
    const response = await fetch(`${API_URL}/referencia/localidades/${provinciaId}`)
    if (!response.ok) throw new Error('Error al obtener localidades')
    const json = await response.json()
    return json.data || []
  },
}

export default pacienteService
