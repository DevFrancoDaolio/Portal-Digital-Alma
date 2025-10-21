import api from "./api"

export const getEspecialidades = () => api.get("/api/especialidades")
export const createEspecialidad = (especialidad) => api.post("/api/especialidades", especialidad)
export const updateEspecialidad = (id) => api.put(`/api/especialidades/${id}`)
export const deleteEspecialidad = (id) => api.delete(`/api/especialidades/${id}`)