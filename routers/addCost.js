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
  let description = queryObject.description;
  let category = queryObject.category; 
  let sum = queryObject.sum;
  let id= parseInt(0);//what to do with this

  let cost = new costDoc({
    user_id: user_id,
    year: year,
    month: month,
    day: day,
    id: id,// as well...
    description: description,
    category: category,
    sum: sum,
  });

  try {
    await cost.save();
    console.log("cost was saved to mongodb");
    // cost.printContent();
    id=id+1;
  } catch (error) {
    console.log(error);
  }

  res.send("cost was saved to mongodb");
});

module.exports = router;
