require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // test a simple query
    const databases = await client.db().admin().listDatabases();
    console.log("📂 Databases:");
    databases.databases.forEach(db => console.log(` - ${db.name}`));

  } catch (err) {
    console.error("Connection failed", err);
  } finally {
    await client.close();
  }
}

run();
