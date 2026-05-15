import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  géneros: { type: [String], required: true },
  anioEstreno: { type: Number, required: true }
});

// El nombre de la colección será "peliculas"
export const Pelicula = mongoose.model("Pelicula", peliculaSchema);
