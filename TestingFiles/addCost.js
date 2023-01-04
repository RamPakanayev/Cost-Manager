const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.post("/addcost", async (req, res) => {
  const sum = req.body.sum;
  const category = req.body.category;
  const description = req.body.description;
  const user_id = req.body.user_id;

  const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.h7gutkk.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  // mongoose.connect(uri)
  try {
    await client.connect();
    const costsCollection = client.db("databaseName").collection("costs");
    const result = await costsCollection.insertOne({
      sum: sum,
      category: category,
      description: description,
      user_id: user_id,
    });
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
