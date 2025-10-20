import api from "./api"

export const getProfesionales = () => api.get("/profesionales")
export const crearProfesional = (data) => api.post("/profesionales", data)
export const actualizarProfesional = (id, data) => api.put(`/profesionales/${id}`, data)
export const eliminarProfesional = (id) => api.delete(`/profesionales/${id}`)
export const reactivarProfesional = (id) => api.put(`/profesionales/${id}/reactivar`)
export const buscarProfesionales = (params) => api.get("/profesionales/buscar", { params })

export const getProvincias = () => api.get("/api/provincias")

export const getLocalidadesByProvincia = (provinciaId) => api.get("/api/localidades", { params: { provinciaId } })

export const getEspecialidades = () => api.get("/api/especialidades")
