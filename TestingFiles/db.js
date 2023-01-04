const { MongoClient } = require("mongodb");
require("dotenv").config();
//import { env } from process;
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

//==========================Main===========================================
async function main() {
  const uri = `mongodb+srv://root:root@cluster0.h7gutkk.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

//Create list
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
