import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});

app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

const PORT = 3000;

async function startServer() {
  try {
    await client.connect();
    console.log("Conexión a Atlas exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en puerto ${PORT}`);
    });
  } catch (e) {
    console.log("Error al conectar a Atlas:", e);
  }
}

startServer();
