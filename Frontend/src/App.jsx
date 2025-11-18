import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login.jsx"
import ListarProfesionales from "./pages/ListarProfesionales.jsx"
import RegistrarProfesional from "./pages/RegistrarProfesional.jsx"
import AgregarEspecialidad from "./pages/AgregarEspecialidad.jsx"
import ListarPaciente from "./pages/ListarPaciente.jsx"
import RegistrarPaciente from "./pages/RegistrarPaciente.jsx"
import EditarPaciente from "./pages/EditarPaciente.jsx"
import AgregarConsultorio from "./pages/AgregarConsultorio.jsx"
import ListarConsultorio from "./pages/ListarConsultorio.jsx"
import Test from "./pages/test.jsx"
import EditarConsultorio from "./pages/EditarConsultorio.jsx"
import MisHorarios from "./pages/MisHorarios.jsx"
import RegistrarHorario from "./pages/RegistrarHorario.jsx"
import CreateAccount from "./pages/CreateAccount.jsx"
import RegistrarTurno from "./pages/RegistrarTurno"
import ProtectedRoute from "./componentes/ProtectedRoute"
import RecuperarContrasena from "./pages/RecuperarContrasena.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena />} />


        <Route
          path="/ListarProfesionales"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <ListarProfesionales />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RegistrarProfesional"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <RegistrarProfesional />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Especialidad"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <AgregarEspecialidad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListarPaciente"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <ListarPaciente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RegistrarPaciente"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <RegistrarPaciente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AgregarConsultorio"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <AgregarConsultorio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListarConsultorio"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <ListarConsultorio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditarConsultorio/:id"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <EditarConsultorio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditarPaciente/:id"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <EditarPaciente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RegistrarTurno"
          element={
            <ProtectedRoute rolesPermitidos={["secretaria"]}>
              <RegistrarTurno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MisHorarios"
          element={
            <ProtectedRoute rolesPermitidos={["profesional", "secretaria"]}>
              <MisHorarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RegistrarHorario"
          element={
            <ProtectedRoute rolesPermitidos={["profesional"]}>
              <RegistrarHorario />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
