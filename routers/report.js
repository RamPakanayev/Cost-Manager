const express = require("express");
const router = express.Router();
const { costDoc } = require("../db/db");
const url = require("url");

// route to get report of expenses based on user_id, year, month, day
router.get("/", async (req, res) => {
  console.log("processing report"); // log to check if the endpoint is being hit

  // parse the query parameters from the request URL
  const queryObject = url.parse(req.url, true).query;
  let user_id = queryObject.user_id;
  let year = String(queryObject.year);
  let month = String(queryObject.month);
  let day = queryObject.day;

  // build the query to find expenses in the database
  let query = { cost_user_id: user_id };
  if (year) {
    query.cost_year = year;
  }
  if (month) {
    query.cost_month = month;
  }
  if (day) {
    query.cost_day = day;
  }

  // try to get the expenses from the database
  let result;
  try {
    result = await costDoc.find(query).exec();
  } catch (error) {
    console.log(error); // log any errors that might occur
  }

  // initializing the report object
  let report = {
    food: [],
    health: [],
    housing: [],
    sport: [],
    education: [],
    transportation: [],
    other: []
  };

  // loop through the expenses and add them to the report object based on their category
  for (let cost of result) {
    if (cost.category === "food") {
      report.food.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    } else if (cost.category === "health") {
      report.health.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    } else if (cost.category === "housing") {
      report.housing.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    } else if (cost.category === "sport") {
      report.sport.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    } else if (cost.category === "education") {
      report.education.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    } else if (cost.category === "transportation") {
      report.transportation.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    } else {
      report.other.push({
        day: cost.day,
        description: cost.description,
        sum: cost.sum
      });
    }
  }

  res.send(report); // send the report object as the response

});

module.exports = router;