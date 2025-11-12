import api from "./api"

// Profesionales
export const getProfesionales = () => api.get("/profesionales")

export const crearProfesional = (data) => api.post("/profesionales", data)

export const actualizarProfesional = (id, data) => api.put(`/profesionales/${id}`, data)

export const eliminarProfesional = (id) => api.delete(`/profesionales/${id}`)

export const reactivarProfesional = (id) => api.put(`/profesionales/${id}/reactivar`)

export const buscarProfesionales = (params) =>
    api.get("/profesionales/buscar", { params })

// Ubicación (API externa)
export const getProvincias = () =>
    api.get("https://apis.datos.gob.ar/georef/api/provincias")

export const getLocalidadesByProvincia = (provinciaNombre) =>
    api.get("https://apis.datos.gob.ar/georef/api/localidades", {
        params: { provincia: provinciaNombre, campos: "id,nombre", max: 500 },
    })
