import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  idPelicula: { type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  estaRetirado: { type: Boolean, required: true },
  premios: { type: [String], required: true }
});

export const Actor = mongoose.model("Actor", actorSchema);
