// Import express framework
const express = require("express");

// Create an instance of express
const app = express();

// Import the costDoc and connectToDB functions from db.js
const { connectToDB } = require("./db/db");

// Import the routers for the add cost, report, and about pages
const addCostRouter = require("./routers/addCost");
const reportRouter = require("./routers/report");
const aboutRouter = require("./routers/about");

// Use the routers for the add cost, report, and about pages
app.use("/addcost", addCostRouter);
app.use("/report", reportRouter);
app.use("/about", aboutRouter);

// Connect to the MongoDB database as soon as the application starts
(async () => {
await connectToDB();
})();

// Export the express app
module.exports = app;

// Example usage of the add cost API:
// http://localhost:1300/addcost?user_id=123123&year=2023&month=1&day=4&id=456&description=money+well+spent&category=food&sum=100

// Example usage of the report API:
// http://localhost:1300/report?user_id=123123&year=2023&month=1