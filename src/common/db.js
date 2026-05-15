import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://jaimeramirez765_db_user:D4pdXMsuoLdUQWz2@eva-u3-express.jhwznny.mongodb.net/?appName=eva-u3-express";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export default client;
