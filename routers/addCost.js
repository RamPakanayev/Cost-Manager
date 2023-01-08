const express = require("express");
const router = express.Router();
const axios = require("axios");
const { costDoc } = require("../db/db");
const url = require("url");

router.post("/", async (req, res) => {
  console.log("processing addCost");
  const queryObject = url.parse(req.url, true).query;
  let user_id = queryObject.user_id;
  let year = String(queryObject.year);
  let month = String(queryObject.month);
  let day = queryObject.day;
  let id = queryObject.id;
  let description = queryObject.description;
  let category = queryObject.category; //should be limited
  let sum = queryObject.sum;

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

  res.send("cost was saved to mongodb");
});

module.exports = router;
