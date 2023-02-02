const express = require('express');
const router = express.Router();
const axios = require('axios');
const { costDoc } = require('../db/db');
const url = require('url');

// This route is for saving new costs to the database
router.post('/', async (req, res) => {
  // Logging message to track that the addCost route is being processed
  console.log('Processing the new added cost...');

  // Getting the parameters passed in the URL
  const queryObject = url.parse(req.url, true).query;

  // Destructuring the parameters into separate variables
  let userId = queryObject.user_id;
  let year = String(queryObject.year);
  let month = String(queryObject.month);
  let day = queryObject.day;
  let description = queryObject.description;
  let category = queryObject.category;
  let sum = queryObject.sum;
  let id = 0; // Not sure what the purpose of this is

  // Creating a new cost document with the given parameters
  let cost = new costDoc({
    user_id: userId,
    year,
    month,
    day,
    id, // Not sure what the purpose of this is
    description,
    category,
    sum,
  });

  // Trying to save the cost document to the database
  try {
    await cost.save();
    console.log('Cost was saved in the MongoDB dataBase');
    // cost.printContent(); // Not sure what the purpose of this is
    id += 1; // Not sure what the purpose of this is
  } catch (error) {
    console.error(error);
  }

  // Sending a response indicating that the cost was saved to the database
  res.send('Cost was saved in the MongoDB dataBase !');
});

module.exports = router;
