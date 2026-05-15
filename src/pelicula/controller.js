import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = {
  db: "cine-db",
  collection: "peliculas"
};

// INSERTAR PELÍCULA
export async function handleInsertPeliculaRequest(req, res) {
  try {
    const body = req.body;

    const pelicula = {
      nombre: body.nombre,
      géneros: body.géneros,
      anioEstreno: body.anioEstreno
    };

    await client
      .db(peliculaCollection.db)
      .collection(peliculaCollection.collection)
      .insertOne(pelicula)
      .then((data) => {
        if (!data || !data.insertedId) {
          return res.status(500).json({ message: "No se pudo insertar la película" });
        }

        return res.status(201).json({
          message: "Película creada correctamente",
          id: data.insertedId
        });
      })
      .catch((e) => {
        return res.status(500).json({ message: "Error al insertar película", error: e.message });
      });

  } catch (e) {
    return res.status(500).json({ message: "Error inesperado", error: e.message });
  }
}

// OBTENER TODAS LAS PELÍCULAS
export async function handleGetPeliculasRequest(req, res) {
  try {
    await client
      .db(peliculaCollection.db)
      .collection(peliculaCollection.collection)
      .find()
      .toArray()
      .then((data) => res.status(200).json(data))
      .catch((e) => res.status(500).json({ message: "Error al obtener películas", error: e.message }));

  } catch (e) {
    return res.status(500).json({ message: "Error inesperado", error: e.message });
  }
}

// OBTENER PELÍCULA POR ID
export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    let oid;

    try {
      oid = ObjectId.createFromHexString(id);
    } catch {
      return res.status(400).json({ message: "Id mal formado" });
    }

    await client
      .db(peliculaCollection.db)
      .collection(peliculaCollection.collection)
      .findOne({ _id: oid })
      .then((data) => {
        if (!data) return res.status(404).json({ message: "Película no encontrada" });
        return res.status(200).json(data);
      })
      .catch((e) => res.status(500).json({ message: "Error al buscar película", error: e.message }));

  } catch (e) {
    return res.status(500).json({ message: "Error inesperado", error: e.message });
  }
}

// ACTUALIZAR PELÍCULA POR ID
export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    let oid;

    try {
      oid = ObjectId.createFromHexString(id);
    } catch {
      return res.status(400).json({ message: "Id mal formado" });
    }

    const query = {
      $set: {
        nombre: body.nombre,
        géneros: body.géneros,
        anioEstreno: body.anioEstreno
      }
    };

    await client
      .db(peliculaCollection.db)
      .collection(peliculaCollection.collection)
      .updateOne({ _id: oid }, query)
      .then((data) => {
        if (!data || data.modifiedCount === 0) {
          return res.status(404).json({ message: "Película no encontrada o no actualizada" });
        }

        return res.status(200).json({ message: "Película actualizada correctamente" });
      })
      .catch((e) => res.status(500).json({ message: "Error al actualizar película", error: e.message }));

  } catch (e) {
    return res.status(500).json({ message: "Error inesperado", error: e.message });
  }
}

// ELIMINAR PELÍCULA POR ID
export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    let oid;

    try {
      oid = ObjectId.createFromHexString(id);
    } catch {
      return res.status(400).json({ message: "Id mal formado" });
    }

    await client
      .db(peliculaCollection.db)
      .collection(peliculaCollection.collection)
      .deleteOne({ _id: oid })
      .then((data) => {
        if (!data || data.deletedCount === 0) {
          return res.status(404).json({ message: "Película no encontrada o no eliminada" });
        }

        return res.status(200).json({ message: "Película eliminada correctamente" });
      })
      .catch((e) => res.status(500).json({ message: "Error al eliminar película", error: e.message }));

  } catch (e) {
    return res.status(500).json({ message: "Error inesperado", error: e.message });
  }
}

export default {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest
};
