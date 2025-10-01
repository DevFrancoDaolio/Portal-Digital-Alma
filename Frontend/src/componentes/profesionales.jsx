import { useEffect, useState } from "react";
import {
  getProfesionales,
  crearProfesional,
  eliminarProfesional,
} from "../../services/profesionalesService";

export default function Profesionales() {
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    getProfesionales()
      .then((res) => setProfesionales(res.data))
      .catch((err) => console.error("Error al cargar profesionales:", err));
  }, []);

  const handleAgregar = (e) => {
    e.preventDefault();
    const nuevo = {
      nombre: "Felipe",
      email: "felipe@turnify.com",
      telefono: "3511234567",
      especialidad: 1,
      servicios: [],
    };
    crearProfesional(nuevo)
      .then(() => getProfesionales().then((res) => setProfesionales(res.data)))
      .catch((err) => console.error("Error al crear profesional:", err));
  };

  // resto del componente...
}
