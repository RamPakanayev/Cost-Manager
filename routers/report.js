const express = require("express");
const router = express.Router();
const { costDoc } = require("../db/db");
const url = require("url");

router.get("/", async (req, res) => {
  console.log("2-2");
  const queryObject = url.parse(req.url, true).query;
  let user_id = queryObject.user_id;
  let year = String(queryObject.year);
  let month = String(queryObject.month);
  let day = queryObject.day;
  let id = queryObject.id;
  let description = queryObject.description;
  let category = queryObject.category; //should be limited
  let sum = queryObject.sum;

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
  if (id) {
    query.cost_id = id;
  }
  if (description) {
    query.cost_description = description;
  }
  if (category) {
    query.cost_category = category;
  }
  if (sum) {
    query.cost_sum = sum;
  }

  let result;
  try {
    result = await costDoc.find(query).exec();
  } catch (error) {
    console.log(error);
  }

  res.send(result);
});

module.exports = router;
