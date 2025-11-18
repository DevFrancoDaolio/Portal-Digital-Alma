// Servicio para comunicarse con la API de especialidades

const API_BASE_URL = 'http://localhost:5000/api'

// Crear objeto de configuración para fetch
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// GET: Obtener todas las especialidades
export const getEspecialidades = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/especialidades`, fetchOptions)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json()
    return { data: data.data }
  } catch (error) {
    console.error('Error en getEspecialidades:', error)
    throw error
  }
}

// POST: Crear nueva especialidad
export const createEspecialidad = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/especialidades`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear especialidad')
    }
    const result = await response.json()
    return { data: result.data }
  } catch (error) {
    console.error('Error en createEspecialidad:', error)
    throw error
  }
}
