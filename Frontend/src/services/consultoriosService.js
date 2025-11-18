// 🔷 SERVICIO DE CONSULTORIOS
// Este servicio maneja toda la comunicación con el backend

const API_BASE_URL = 'http://localhost:5000/api'

// Manejo de errores centralizado
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error en la solicitud')
  }
  return response.json()
}

// ✅ OBTENER TODOS LOS CONSULTORIOS
export const obtenerConsultorios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/consultorios`)
    const result = await handleResponse(response)
    return result.data
  } catch (error) {
    console.error('Error al obtener consultorios:', error)
    throw error
  }
}

// ✅ OBTENER UN CONSULTORIO POR ID
export const obtenerConsultorioPorId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consultorios/${id}`)
    const result = await handleResponse(response)
    return result.data
  } catch (error) {
    console.error('Error al obtener consultorio:', error)
    throw error
  }
}

// ✅ CREAR NUEVO CONSULTORIO
export const crearConsultorio = async (consultorioData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consultorios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultorioData),
    })
    const result = await handleResponse(response)
    return result.data
  } catch (error) {
    console.error('Error al crear consultorio:', error)
    throw error
  }
}

// ✅ ACTUALIZAR CONSULTORIO
export const actualizarConsultorio = async (id, consultorioData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consultorios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultorioData),
    })
    const result = await handleResponse(response)
    return result.data
  } catch (error) {
    console.error('Error al actualizar consultorio:', error)
    throw error
  }
}

// ✅ CAMBIAR ESTADO DEL CONSULTORIO
export const cambiarEstadoConsultorio = async (id, estado, tipoBaja = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consultorios/${id}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estado,
        tipoBaja,
      }),
    })
    const result = await handleResponse(response)
    return result.data
  } catch (error) {
    console.error('Error al cambiar estado:', error)
    throw error
  }
}

// ✅ ELIMINAR CONSULTORIO
export const eliminarConsultorio = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consultorios/${id}`, {
      method: 'DELETE',
    })
    const result = await handleResponse(response)
    return result.data
  } catch (error) {
    console.error('Error al eliminar consultorio:', error)
    throw error
  }
}
