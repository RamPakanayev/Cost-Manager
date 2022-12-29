const express = require("express");
const app = express();
const db = require('./db/db');

db.connectToDB();

// // Set up the database connection
// const uri =
//   "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Set up the addcost endpoint
app.post("/addcost/", (req, res) => {
  // Access request body and create new document in costs collection
  const newCost = {
    user_id: req.body.user_id,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    id: req.body.id,
    description: req.body.description,
    category: req.body.category,
    sum: req.body.sum,
  };

  // Save new document to costs collection
  costsCollection.insertOne(newCost, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

// Set up the report endpoint
app.get("/report/", (req, res) => {
  // Retrieve year and month from query parameters
  const year = req.query.year;
  const month = req.query.month;
  const user_id = req.query.id;
  // Find all documents in costs collection that match the specified year and month
  const query = { year: year, month: month, id:user_id };
  costsCollection.find(query).toArray((err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      // Create report object with properties for each category
      const report = {
        food: [],
        health: [],
        housing: [],
        sport: [],
        education: [],
        transportation: [],
        other: [],
      };

      // Iterate over results and add cost item objects to appropriate array in report object
      results.forEach((costItem) => {
        report[costItem.category].push({
          user_id: costItem.user_id,
          year: costItem.year,
          month: costItem.month,
          day: costItem.day,
          id: costItem.id,
          description: costItem.description,
          sum: costItem.sum,
        });
      });

      // Send report object as response
      res.json(report);
    }
  });
});

// Set up the about endpoint
app.get("/about/", (req, res) => {
  // Create array of developer objects
  const developers = [
    {
      firstname: "John",
      lastname: "Doe",
      id: "123456",
      email: "johndoe@example.com",
    },
    {
      firstname: "Jane",
      lastname: "Doe",
      id: "654321",
      email: "janedoe@example.com",
    },
  ];

  // Send array of developer objects as response
  res.json(developers);
});



// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
