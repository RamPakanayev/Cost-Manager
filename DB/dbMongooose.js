const express = require("express");
const mongoose = require("mongoose");
const url = require("url");

const app = express();
mongoose.set("strictQuery", false);

app.post("/addcost", async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let user_id = queryObject.user_id;
  let year = queryObject.year;
  let month = queryObject.month;
  let day = queryObject.day;
  let id = queryObject.id;
  let description = queryObject.description;
  let category = queryObject.category; //should be limited
  let sum = queryObject.sum;

  let uri1 =
    "mongodb+srv://root:root@cluster0.h7gutkk.mongodb.net/WebDB?retryWrites=true&w=majority";

  mongoose.set("strictQuery", true);
  mongoose.connect(uri1);
  let db = mongoose.connection;

  db.on("error", () => {
    console.log("error");
  });

  await new Promise((resolve, reject) => {
    db.once("open", resolve);
  });
  console.log("connected!");

  let Schema = mongoose.Schema(
    {
      cost_user_id: String,
      cost_year: String,
      cost_month: String,
      cost_day: String,
      cost_id: String,
      cost_description: String,
      cost_category: String,
      cost_sum: String,
    },
    { versionKey: false }
  );

  Schema.methods.printContent = function () {
    let str = `cost user_id : ${this.cost_user_id}\n 
    cost year : ${this.cost_year}\n
    cost month : ${this.cost_month}\n
    cost day : ${this.cost_day}\n
    cost id : ${this.cost_id}\n
    cost description : ${this.cost_description}\n
    cost category : ${this.cost_category}\n
    cost sum : ${this.cost_sum}\n`;
    console.log(str);
  };

  //collection name
  let costDoc = mongoose.model("costs", Schema);

  let cost = new costDoc({
    cost_user_id: user_id,
    cost_year: year,
    cost_month: month,
    cost_day: day,
    cost_id: id,
    cost_description: description,
    cost_category: category,
    cost_sum: sum,
  });

  try {
    await cost.save();
    console.log("cost was saved to mongodb");
    cost.printContent();
  } catch (error) {
    console.log(error);
  }

  try {
    let cost = await costDoc.find();
    //console.log(recipes);
  } catch (error) {
    console.log(error);
  }

  res.send("cost was saved to mongodb");
});

app.get("/report", async (req, res) => {
  // Parse the query parameters from the request URL
  const queryObject = url.parse(req.url, true).query;
  let year = queryObject.year;
  let month = queryObject.month;
  let user_id = queryObject.user_id;

  // Connect to the MongoDB database
  let uri =
    "mongodb+srv://root:root@cluster0.h7gutkk.mongodb.net/WebDB?retryWrites=true&w=majority";
  mongoose.connect(uri);
  let db = mongoose.connection;

  // Wait for the connection to be established
  await new Promise((resolve, reject) => {
    db.once("open", resolve);
  });

  // Define the schema for the costs collection
  let Schema = mongoose.Schema(
    {
      cost_user_id: String,
      cost_year: String,
      cost_month: String,
      cost_day: String,
      cost_id: String,
      cost_description: String,
      cost_category: String,
      cost_sum: String,
    },
    { versionKey: false }
  );

  // Create the model for the costs collection
  let costDoc = mongoose.model("costs", Schema);

  // Query the costs collection to get the costs for the specified month and year for the specified user
  let costs = await costDoc.find({
    cost_user_id: user_id,
    cost_year: year,
    cost_month: month,
  });

  // Create an object to hold the report data
  let report = {};

  // Iterate over the costs and add them to the report object
  costs.forEach((cost) => {
    let category = cost.cost_category;
    let costItem = {
      cost_user_id: cost.cost_user_id,
      cost_year: cost.cost_year,
      cost_month: cost.cost_month,
      cost_day: cost.cost_day,
      cost_id: cost.cost_id,
      cost_description: cost.cost_description,
      cost_category: cost.cost_category,
      cost_sum: cost.cost_sum,
    };
    if (report[category]) {
      report[category].push(costItem);
    } else {
      report[category] = [costItem];
    }
  });

  // Send the report data as a JSON response
  res.json(report);
});

app.get("/about", (req, res) => {
  let developers = [
    {
      firstname: "Ram",
      lastname: "Pakanayev",
      id: "313561433",
      email: "rampakanayev@gmail.com",
    },
    {
      firstname: "Shachar",
      lastname: "Baba",
      id: "208613083",
      email: "shaharbaba12@gmail.com",
    },
  ];
  res.json(developers);
});

app.listen(1300);

//http://localhost:1300/addcost?user_id=shahar1&year=1992&month=5&day=3&id=123&description=veryGood&category=food&sum=90.99
//http://localhost:1300/report?user_id=shahar1&year=1992&month=5
//http://localhost:1300/report?user_id=Ram1&year=2008&month=5
