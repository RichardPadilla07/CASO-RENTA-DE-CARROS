import express from "express";
import "./config/mongoDB.js";
import cors from "cors";
import path from "path";
import usuarioRoutes from "./routes/usuario.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import guardadoRoutes from "./routes/guardado.routes.js";

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
  credentials: true
};
app.use(cors(corsOptions));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(path.resolve(), '../../frontend')));

// Redirigir todas las rutas que no sean API al index.html del frontend
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(path.resolve(), '../../frontend/index.html'));
});

// Esto es para manejar las solicitudes JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de inicio
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Rutas de la API
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/guardado", guardadoRoutes);

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` El servidor esta corriendo en el puerto ${PORT}.`);
});
