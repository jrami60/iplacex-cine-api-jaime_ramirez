import { Pelicula } from "./pelicula.js";

// INSERTAR PELÍCULA
export async function handleInsertPeliculaRequest(req, res) {
  try {
    const { nombre, géneros, anioEstreno } = req.body;

    const nuevaPelicula = new Pelicula({
      nombre,
      géneros,
      anioEstreno
    });

    const data = await nuevaPelicula.save();

    return res.status(201).json({
      message: "Película creada correctamente",
      id: data._id
    });

  } catch (e) {
    return res.status(500).json({ message: "Error al insertar película", error: e.message });
  }
}

// OBTENER TODAS LAS PELÍCULAS
export async function handleGetPeliculasRequest(req, res) {
  try {
    const data = await Pelicula.find();
    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({ message: "Error al obtener películas", error: e.message });
  }
}

// OBTENER PELÍCULA POR ID
export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;

    const data = await Pelicula.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    return res.status(200).json(data);

  } catch (e) {
    return res.status(400).json({ message: "Id mal formado o error", error: e.message });
  }
}

// ACTUALIZAR PELÍCULA POR ID
export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const { nombre, géneros, anioEstreno } = req.body;

    const data = await Pelicula.findByIdAndUpdate(
      id,
      { nombre, géneros, anioEstreno },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    return res.status(200).json({ message: "Película actualizada correctamente" });

  } catch (e) {
    return res.status(400).json({ message: "Id mal formado o error", error: e.message });
  }
}

// ELIMINAR PELÍCULA POR ID
export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;

    const data = await Pelicula.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    return res.status(200).json({ message: "Película eliminada correctamente" });

  } catch (e) {
    return res.status(400).json({ message: "Id mal formado o error", error: e.message });
  }
}

export default {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest
};
