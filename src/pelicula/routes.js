import express from "express";
import controller from "./controller.js";

const peliculaRoutes = express.Router();

// Crear película
peliculaRoutes.post("/pelicula", controller.handleInsertPeliculaRequest);

// Obtener todas las películas
peliculaRoutes.get("/peliculas", controller.handleGetPeliculasRequest);

// Obtener película por ID
peliculaRoutes.get("/pelicula/:id", controller.handleGetPeliculaByIdRequest);

// Actualizar película por ID
peliculaRoutes.put("/pelicula/:id", controller.handleUpdatePeliculaByIdRequest);

// Eliminar película por ID
peliculaRoutes.delete("/pelicula/:id", controller.handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
