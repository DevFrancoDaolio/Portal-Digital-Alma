import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  
import Login from "./pages/Login.jsx";
import Turnos from "./pages/Turnos.jsx";
import ListarProfesionales from "./pages/ListarProfesionales.jsx";
import RegistrarProfesional from "./pages/RegistrarProfesional.jsx";
import AgregarEspecialidad from "./pages/AgregarEspecialidad.jsx";
import ListarPaciente from "./pages/ListarPaciente.jsx";
import RegistrarPaciente from "./pages/RegistrarPaciente.jsx";
import EditarPaciente from "./pages/EditarPaciente.jsx";
import AgregarConsultorio  from "./pages/AgregarConsultorio.jsx";
import ListarConsultorio from "./pages/ListarConsultorio.jsx";
import Test from "./pages/test.jsx";
import EditarConsultorio from "./pages/EditarConsultorio.jsx";
import MisHorarios from "./pages/MisHorarios.jsx";
import RegistrarHorario from "./pages/RegistrarHorario.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import RegistrarTurno from "./pages/RegistrarTurno"
//import Navbar from "./components/Navbar";




function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Test" element={<Test/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/ListarProfesionales" element={<ListarProfesionales />} />
        <Route path="/RegistrarProfesional" element={<RegistrarProfesional />} />
        <Route path="/Especialidad" element={<AgregarEspecialidad />} />
        <Route path="/ListarPaciente" element={<ListarPaciente />} />
        <Route path="/RegistrarPaciente" element={<RegistrarPaciente />} />
        <Route path="/AgregarConsultorio" element={<AgregarConsultorio />} />
        <Route path="/ListarConsultorio" element={<ListarConsultorio />} />
        <Route path="/EditarConsultorio/:id" element={<EditarConsultorio />} />
        <Route path="/EditarPaciente/:id" element={<EditarPaciente />} />
        <Route path="/MisHorarios" element={<MisHorarios />} />
        <Route path="/RegistrarHorario" element={<RegistrarHorario />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/RegistrarTurno" element={<RegistrarTurno />} />

              
      </Routes>
    </BrowserRouter>
  );
}

export default App;