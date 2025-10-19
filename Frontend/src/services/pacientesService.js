const API_BASE_URL = "http://localhost:8080/api/pacientes"

const pacienteService = {
  // Listar todos los pacientes
  async listar() {
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error("Error al obtener los pacientes")
      }
      return await response.json()
    } catch (error) {
      console.error("Error en listar:", error)
      throw error
    }
  },

  // Obtener un paciente por ID
  async obtenerPorId(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Paciente no encontrado")
        }
        throw new Error("Error al obtener el paciente")
      }
      return await response.json()
    } catch (error) {
      console.error("Error en obtenerPorId:", error)
      throw error
    }
  },

  // Crear un nuevo paciente
  async crear(pacienteDto) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteDto),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Error al crear el paciente")
      }

      return await response.json()
    } catch (error) {
        console.error("Detalles del error:", error.response?.data || error.message);
      console.error("Error en crear:", error)
      throw error
    }
  },

  // Actualizar un paciente existente
  async actualizar(id, pacienteDto) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteDto),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Error al actualizar el paciente")
      }

      return await response.json()
    } catch (error) {
      console.error("Error en actualizar:", error)
      throw error
    }
  },

  // Buscar pacientes por DNI o nombre
  async buscar(dni = "", nombre = "") {
    try {
      const params = new URLSearchParams()
      if (dni) params.append("dni", dni)
      if (nombre) params.append("nombre", nombre)

      const response = await fetch(`${API_BASE_URL}/buscar?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Error al buscar pacientes")
      }
      return await response.json()
    } catch (error) {
      console.error("Error en buscar:", error)
      throw error
    }
  },

  async obtenerObrasSociales() {
    try {
      const response = await fetch("http://localhost:8080/api/obras-sociales")
      if (!response.ok) {
        throw new Error("Error al obtener las obras sociales")
      }
      return await response.json()
    } catch (error) {
      console.error("Error en obtenerObrasSociales:", error)
      throw error
    }
  },

  async obtenerProvincias() {
    try {
      const response = await fetch("http://localhost:8080/api/provincias")
      if (!response.ok) {
        throw new Error("Error al obtener las provincias")
      }
      return await response.json()
    } catch (error) {
      console.error("Error en obtenerProvincias:", error)
      throw error
    }
  },

  async obtenerLocalidades(provinciaId) {
    try {
      const response = await fetch(`http://localhost:8080/api/localidades?provinciaId=${provinciaId}`)
      if (!response.ok) {
        throw new Error("Error al obtener las localidades")
      }
      return await response.json()
    } catch (error) {
      console.error("Error en obtenerLocalidades:", error)
      throw error
    }
  },
}

export default pacienteService
