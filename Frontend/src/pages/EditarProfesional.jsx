"use client"

import { useEffect } from "react"
import "../styles/Profesionales.css"
import AgregarProfesional from "./RegistrarProfesional"

export default function EditarProfesionalModal({ profesional, onClose, onSave }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Profesional</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body-professional">
          <AgregarProfesional isModal={true} onClose={onClose} profesional={profesional} onSave={onSave} />
        </div>
      </div>
    </div>
  )
}
