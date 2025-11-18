// Servicio para comunicarse con la API de profesionales

const API_BASE_URL = 'http://localhost:5000/api'

// Crear objeto de configuración para fetch
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Profesionales
export const getProfesionales = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/profesionales`, fetchOptions)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json()
    return { data: data.data }
  } catch (error) {
    console.error('Error en getProfesionales:', error)
    throw error
  }
}

export const getProfesionalById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profesionales/${id}`, fetchOptions)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json()
    return { data: data.data }
  } catch (error) {
    console.error('Error en getProfesionalById:', error)
    throw error
  }
}

export const crearProfesional = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profesionales`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear profesional')
    }
    const result = await response.json()
    return { data: result.data }
  } catch (error) {
    console.error('Error en crearProfesional:', error)
    throw error
  }
}

export const actualizarProfesional = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profesionales/${id}`, {
      ...fetchOptions,
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar profesional')
    }
    const result = await response.json()
    return { data: result.data }
  } catch (error) {
    console.error('Error en actualizarProfesional:', error)
    throw error
  }
}

export const eliminarProfesional = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profesionales/${id}/dar-de-baja`, {
      ...fetchOptions,
      method: 'PUT',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al dar de baja')
    }
    const result = await response.json()
    return { data: result.data }
  } catch (error) {
    console.error('Error en eliminarProfesional:', error)
    throw error
  }
}

export const reactivarProfesional = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profesionales/${id}/reactivar`, {
      ...fetchOptions,
      method: 'PUT',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al reactivar profesional')
    }
    const result = await response.json()
    return { data: result.data }
  } catch (error) {
    console.error('Error en reactivarProfesional:', error)
    throw error
  }
}

// Especialidades
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

// Ubicación - API Local (reemplaza la externa)
export const getProvincias = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/referencia/provincias`, fetchOptions)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json()
    return { data: { provincias: data.data } }
  } catch (error) {
    console.error('Error en getProvincias:', error)
    throw error
  }
}

export const getLocalidadesByProvincia = async (provinciaId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/referencia/localidades/${provinciaId}`, fetchOptions)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json()
    return { data: { localidades: data.data } }
  } catch (error) {
    console.error('Error en getLocalidadesByProvincia:', error)
    throw error
  }
}
