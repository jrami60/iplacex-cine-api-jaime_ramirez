import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = {
  db: "cine-db",
  collection: "actores"
};

const peliculaCollection = {
  db: "cine-db",
  collection: "peliculas"
};

// INSERTAR ACTOR
export async function handleInsertActorRequest(req, res) {
  try {
    const body = req.body;

    // Validar que venga el nombre de la película
    if (!body.nombrePelicula) {
      return res.status(400).json({
        message: "Debe indicar el nombre de la película"
      });
    }

    // Buscar la película por nombre
    const pelicula = await client
      .db(peliculaCollection.db)
      .collection(peliculaCollection.collection)
      .findOne({ nombre: body.nombrePelicula });

    if (!pelicula) {
      return res.status(404).json({
        message: "La película indicada no existe"
      });
    }

    // Crear actor
    const actor = {
      idPelicula: pelicula._id.toHexString(),
      nombre: body.nombre,
      edad: body.edad,
      estaRetirado: body.estaRetirado,
      premios: body.premios
    };

    await client
      .db(actorCollection.db)
      .collection(actorCollection.collection)
      .insertOne(actor)
      .then((data) => {
        if (!data || !data.insertedId) {
          return res.status(500).json({
            message: "No se pudo insertar el actor"
          });
        }

        return res.status(201).json({
          message: "Actor creado correctamente",
          id: data.insertedId
        });
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Error al insertar actor",
          error: e.message
        });
      });

  } catch (e) {
    return res.status(500).json({
      message: "Error inesperado al insertar actor",
      error: e.message
    });
  }
}

// OBTENER TODOS LOS ACTORES
export async function handleGetActoresRequest(req, res) {
  try {
    await client
      .db(actorCollection.db)
      .collection(actorCollection.collection)
      .find()
      .toArray()
      .then((data) => res.status(200).json(data))
      .catch((e) =>
        res.status(500).json({
          message: "Error al obtener actores",
          error: e.message
        })
      );
  } catch (e) {
    return res.status(500).json({
      message: "Error inesperado",
      error: e.message
    });
  }
}

// OBTENER ACTOR POR ID
export async function handleGetActorByIdRequest(req, res) {
  try {
    const { id } = req.params;
    let oid;

    try {
      oid = ObjectId.createFromHexString(id);
    } catch {
      return res.status(400).json({ message: "Id mal formado" });
    }

    await client
      .db(actorCollection.db)
      .collection(actorCollection.collection)
      .findOne({ _id: oid })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "Actor no encontrado" });
        }
        return res.status(200).json(data);
      })
      .catch((e) =>
        res.status(500).json({
          message: "Error al buscar actor",
          error: e.message
        })
      );
  } catch (e) {
    return res.status(500).json({
      message: "Error inesperado",
      error: e.message
    });
  }
}

// OBTENER ACTORES POR ID DE PELÍCULA
export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const { pelicula } = req.params;
    let oid;

    try {
      oid = ObjectId.createFromHexString(pelicula);
    } catch {
      return res.status(400).json({ message: "Id de película mal formado" });
    }

    await client
      .db(actorCollection.db)
      .collection(actorCollection.collection)
      .find({ idPelicula: oid.toHexString() })
      .toArray()
      .then((data) => res.status(200).json(data))
      .catch((e) =>
        res.status(500).json({
          message: "Error al obtener actores por película",
          error: e.message
        })
      );
  } catch (e) {
    return res.status(500).json({
      message: "Error inesperado",
      error: e.message
    });
  }
}

export default {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest
};
