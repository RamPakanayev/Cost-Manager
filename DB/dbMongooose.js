const express = require("express");
const mongoose = require("mongoose");
const url = require("url");

const app = express();


app.get("/addcost", async (req, res) => {
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
    let str = "Cost user_id: " + this.user_id + "\nCost year: " + this.year;
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

  try {
    let cost = await costDoc.find();
    //console.log(recipes);
  } catch (error) {
    console.log(error);
  }

  res.send("cost was saved to mongodb");
});

app.listen(1300);

//http://localhost:1300/addcost?user_id=shahar1&year=1992&month=5&day=3&id=123&description=veryGood&category=food&sum=90.99
