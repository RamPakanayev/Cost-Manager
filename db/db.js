const mongoose = require("mongoose");

// Define the Mongoose schema and model here
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

const connectToDB = async () => {
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
  console.log("connected to MongoDB!");
};

module.exports = {
  costDoc,
  connectToDB,
};
