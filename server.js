import express from "express";
import cors from "cors";
import { connectDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base
app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});

// Rutas API
app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;

// Conexión a BD + inicio del servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en puerto ${PORT}`);
  });
});

