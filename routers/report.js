// Import the express module and create a new router object
const express = require('express');
const router = express.Router();

// Import the ObjectID property from the mongodb library
const { ObjectID } = require('mongodb');

// Define an array of categories for costs
const categories = [
'food',
'health',
'housing',
'sport',
'education',
'transportation',
'other'
];

// Handle GET requests to the / report endpoint
router.get('/', async (req, res) => {
// Destructure the year, month, and user_id parameters from the query
const { year, month, user_id } = req.query;

// If any of the required parameters is missing, return an error
if (!year || !month || !user_id) {
return res.status(400).send({ error: 'Invalid query parameters' });
}

try {
// Find costs in the database based on user_id, year, and month
const costs = await req.app.db.costDoc.find({
user_id: user_id,
year: year,
month: month
});// If no costs were found, return a message to the client
if (!costs.length) {
  return res.send({ message: "No costs found for specified user and month/year" });
}

// Create a report object by grouping the costs by category
const report = categories.reduce((result, category) => {
  result[category] = costs
    .filter(cost => cost.category === category)
    .map(cost => ({
      day: cost.day,
      description: cost.description,
      sum: cost.sum
    }));
  return result;
}, {});

// Send the report object as the response
res.send(report);} catch (err) {
  // If there is an error while fetching the costs, return an error
  return res.status(500).send({ error: 'Error while fetching costs' });
  }
  });
  
  // Export the router as a module
  module.exports = router;
