// services/especialidad-service.js

export const getEspecialidades = () => {
  return Promise.resolve([
    { id: 1, nombre: "Cardiología" },
    { id: 2, nombre: "Pediatría" },
    { id: 3, nombre: "Dermatología" },
    { id: 4, nombre: "Neurología" },
    { id: 5, nombre: "Clínica Médica" },
  ]);
};
