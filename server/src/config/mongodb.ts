import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_CONN_STRING as string;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db(process.env.DB_NAME);

export default db;
