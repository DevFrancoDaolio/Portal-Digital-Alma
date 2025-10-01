import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/login", // ajustá el puerto si es distinto
});

export default api;
