import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  
import Login from "./pages/Login.jsx";
import Turnos from "./pages/Turnos.jsx";
import ListarProfesionales from "./pages/ListarProfesionales.jsx";
import RegistrarProfesional from "./pages/RegistrarProfesional.jsx";
import AgregarEspecialidad from "./pages/AgregarEspecialidad.jsx";
import ListarPaciente from "./pages/ListarPaciente.jsx";
import RegistrarPaciente from "./pages/RegistrarPaciente.jsx";
//import Navbar from "./components/Navbar";




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
        <Route path="/ListarPaciente" element={<ListarPaciente />} />
        <Route path="/RegistrarPaciente" element={<ListarPaciente />} />

              
      </Routes>
    </BrowserRouter>
  );
}

export default App;