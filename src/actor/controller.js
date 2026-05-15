import { Actor } from "./actor.js";
import { Pelicula } from "../pelicula/pelicula.js";

// INSERTAR ACTOR
export async function handleInsertActorRequest(req, res) {
  try {
    const { nombrePelicula, nombre, edad, estaRetirado, premios } = req.body;

    if (!nombrePelicula) {
      return res.status(400).json({ message: "Debe indicar el nombre de la película" });
    }

    // Buscar película por nombre
    const pelicula = await Pelicula.findOne({ nombre: nombrePelicula });

    if (!pelicula) {
      return res.status(404).json({ message: "La película indicada no existe" });
    }

    // Crear actor
    const nuevoActor = new Actor({
      idPelicula: pelicula._id,
      nombre,
      edad,
      estaRetirado,
      premios
    });

    const data = await nuevoActor.save();

    return res.status(201).json({
      message: "Actor creado correctamente",
      id: data._id
    });

  } catch (e) {
    return res.status(500).json({ message: "Error al insertar actor", error: e.message });
  }
}

// OBTENER TODOS LOS ACTORES
export async function handleGetActoresRequest(req, res) {
  try {
    const data = await Actor.find();
    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({ message: "Error al obtener actores", error: e.message });
  }
}

// OBTENER ACTOR POR ID
export async function handleGetActorByIdRequest(req, res) {
  try {
    const { id } = req.params;

    const data = await Actor.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Actor no encontrado" });
    }

    return res.status(200).json(data);

  } catch (e) {
    return res.status(400).json({ message: "Id mal formado o error", error: e.message });
  }
}

// OBTENER ACTORES POR ID DE PELÍCULA
export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const { pelicula } = req.params;

    const data = await Actor.find({ idPelicula: pelicula });

    return res.status(200).json(data);

  } catch (e) {
    return res.status(400).json({ message: "Id mal formado o error", error: e.message });
  }
}

export default {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest
};
