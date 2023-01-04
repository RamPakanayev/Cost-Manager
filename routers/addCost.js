const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const url = require("url");

mongoose.set("strictQuery", false);

router.post("/addcost", async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let user_id = queryObject.user_id;
  let year = queryObject.year;
  let month = queryObject.month;
  let day = queryObject.day;
  let id = queryObject.id;
  let description = queryObject.description;
  let category = queryObject.category; //should be limited
  let sum = queryObject.sum;

  let uri1 =
    "mongodb+srv://root:root@cluster0.h7gutkk.mongodb.net/WebDB?retryWrites=true&w=majority";

  mongoose.set("strictQuery", true);
  mongoose.connect(uri1);
  let db = mongoose.connection;

  db.on("error", () => {
    console.log("error");
  });

  await new Promise((resolve, reject) => {
    db.once("open", resolve);
  });
  console.log("connected!");

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

  Schema.methods.printContent = function () {
    let str = `cost user_id : ${this.cost_user_id}\n 
      cost year : ${this.cost_year}\n
      cost month : ${this.cost_month}\n
      cost day : ${this.cost_day}\n
      cost id : ${this.cost_id}\n
      cost description : ${this.cost_description}\n
      cost category : ${this.cost_category}\n
      cost sum : ${this.cost_sum}\n`;
    console.log(str);
  };

  //collection name
  let costDoc = mongoose.model("costs", Schema);

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
