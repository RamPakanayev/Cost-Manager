const express = require("express");
const router = express.Router();
const axios = require("axios");
const { costDoc,userDoc } = require("../db/db");
const url = require("url");
// const {isValidUserId,isValidDate, idGenerator,isValidCategory}=require("./validation")


// Function to check if a given user_id exists in the users collection
const isValidUserId = async (userId) => {
  const user = await userDoc.findOne({ _id: userId });
  return user !== null;
};

// Function to check if a given day and month are valid
const isValidDate = (day, month,year) => {
  return day > 0 && day <= 31 && month > 0 && month <= 12 &&year>=1900;
};

const idGenerator=()=>{
  let date=new Date()
  return (date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0") +
    date
      .getHours()
      .toString()
      .padStart(2, "0") +
    date
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0"));
}

// Function to check if a given category is one of the valid categories
const isValidCategory = (category) => {
  const validCategories = [
    "food",
    "health",
    "housing",
    "sport",
    "education",
    "transportation",
    "other",
  ];
  return validCategories.includes(category);
};

// This route is for saving new costs to the database
router.post("/", async (req, res) => {
  // Logging message to track that the addCost route is being processed
  console.log("Processing new added cost...");

  // Getting the parameters passed in the URL
  const queryObject = url.parse(req.url, true).query;

  // Destructuring the parameters into separate variables
  let userId = queryObject.user_id;
  let year = queryObject.year || new Date().getFullYear();
  let month = queryObject.month || (new Date().getMonth() + 1);
  let day = queryObject.day || new Date().getDate();
  let description = queryObject.description;
  let category = queryObject.category;
  let sum = queryObject.sum;
  let id =idGenerator()

  // Check if the date is valid
  if (!isValidDate(day, month, year)) {
    return res.status(400).send("Invalid date.\n Day must be between 1 to 31 or an empty filed,\n Month must be between 1 to 12  or an empty filed,\n Year must be 1900 and above or an empty filed.\n \n # Note:\n An empty felid will be filled by the current date.");
  }
  
  // Check if the required fields (user_id, description, sum, category) are provided
  if (!userId || !description || !sum || !category) {
    return res.status(400).send("user_id, description, sum, and category are required fields");
  }

 // Check if the user_id exists in the users collection
 const userExists = await isValidUserId(userId);
 if (!userExists) {
   return res.status(400).send("Invalid user_id.");
 }

  // Check if the sum is a valid number
  if (isNaN(sum)) {
    return res.status(400).send("Invalid sum. Sum must be a number.");
  }

  // Check if the category is valid
  if (!isValidCategory(category)) {
    return res.status(400).send("Invalid category. \n The options are: \n food, health, housing, sport,\n education, transportation and other.");
  }
 
  // Creating a new cost document with the given parameters
  let cost = new costDoc({
    user_id: userId,
    year,
    month,
    day,
    id,
    description,
    category,
    sum,
  });

  // Trying to save the cost document to the database
  try {
    await cost.save();
    console.log("Cost was saved in the MongoDB dataBase");
  } catch (error) {
    console.error(error);
  }

  // Sending a response indicating that the cost was saved to the database
  res.send("Cost was saved in the MongoDB dataBase !");
});

module.exports = router;
