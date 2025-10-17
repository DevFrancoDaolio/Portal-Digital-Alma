import React, { useEffect, useState } from 'react';
import { getProfesionales } from '../services/profesionalesService';

export default function ListaProfesionales() {
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    getProfesionales()
      .then((res) => setProfesionales(res.data))
      .catch((err) => {
        console.error("Error al obtener profesionales:", err);
      });
  }, []);

  return (
    <div>
      <h2>Listado de Profesionales</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Ubicación</th>
            <th>Especialidades</th>
          </tr>
        </thead>
        <tbody>
          {profesionales.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.dni}</td>
              <td>{p.email}</td>
              <td>{p.telefono}</td>
              <td>{`${p.calle} ${p.numero}, Piso ${p.piso}, Dpto ${p.departamento}, CP ${p.codigoPostal}`}</td>
              <td>{`${p.localidad}, ${p.provincia}`}</td>
              <td>
                <ul>
                  {p.especialidades.map((e, index) => (
                    <li key={index}>{e.nombre} ({e.matricula})</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
