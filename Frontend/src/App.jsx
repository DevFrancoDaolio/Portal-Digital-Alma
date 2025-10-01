import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Turnos from "./pages/Turnos.jsx";
import RegistrarProfesional from "./pages/RegistrarProfesional.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/RegistrarProfesional" element={<RegistrarProfesional />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;