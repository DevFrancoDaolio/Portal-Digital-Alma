import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Turnos from "./pages/Turnos.jsx";
import ListarProfesionales from "./pages/ListarProfesionales.jsx";
import RegistrarProfesional from "./pages/RegistrarProfesional.jsx";
import AgregarEspecialidad from "./pages/AgregarEspecialidad.jsx";
import Home from "./pages/Home";  




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/ListarProfesionales" element={<ListarProfesionales />} />
        <Route path="/RegistrarProfesional" element={<RegistrarProfesional />} />
        <Route path="/Especialidad" element={<AgregarEspecialidad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;