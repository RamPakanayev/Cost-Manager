const express = require("express");
const app = express();

const { costDoc, connectToDB } = require("./db/db");

const addcost = require("./routers/addCost");
const report = require("./routers/report");
const about = require("./routers/about");

app.use("/addcost", addcost);
app.use("/report", report);
app.use("/about", about);

(async () => {
  await connectToDB();
  app.listen(1300);
})();

//http://localhost:1300/addcost?user_id=123123&year=2023&month=1&day=4&id=456&description=money+well+spent&sum=100
//http://localhost:1300/report?user_id=123123&year=2023&month=1
