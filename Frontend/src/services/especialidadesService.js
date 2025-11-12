import api from "./api"

// Especialidades
export const getEspecialidades = () => api.get("/especialidades")

export const createEspecialidad = (especialidad) =>
    api.post("/especialidades", especialidad)

export const updateEspecialidad = (id, data) =>
    api.put(`/especialidades/${id}`, data)

export const deleteEspecialidad = (id) =>
    api.delete(`/especialidades/${id}`)
