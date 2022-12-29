const express = require("express");
const app = express();
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Connect to the database
connectToDatabase().then(() => {
  console.log("Connected to the database");
});

// Add your routes here

// app.post("/addcost", (req, res) => {
//   // Get the parameters from the POST request
//   const userId = req.body.user_id;
//   const sum = req.body.sum;
//   const category = req.body.category;
//   const description = req.body.description;

//   // Create a new cost item object
//   const newCostItem = {
//     user_id: userId,
//     sum: sum,
//     category: category,
//     description: description,
//   };

//   // Connect to the MongoDB database
//   connectToDatabase()
//     .then((client) => {
//       // Add the new cost item to the costs collection
//       const costsCollection = client.db("WebDB").collection("costs");
//       costsCollection.insertOne(newCostItem, (err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error adding cost item to the database");
//           return;
//         }
//         res.send("Cost item added successfully");
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error connecting to the database");
//     });
// });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
