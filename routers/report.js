const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const url = require("url");


mongoose.set("strictQuery", false);


router.get("/report", async (req, res) => {
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

  module.exports = router;