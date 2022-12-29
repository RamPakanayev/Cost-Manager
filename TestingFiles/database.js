const { MongoClient } = require("mongodb");

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.h7gutkk.mongodb.net/?retryWrites=true&w=majority`;

module.exports = {
  connectToDatabase: () => {
    const client = new MongoClient(uri);
    return client.connect();
  },
};
