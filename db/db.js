const mongoose = require("mongoose");
console.log("db.js file start");
// Define the Mongoose schema and model here
let Schema = mongoose.Schema(
  {
    user_id: String,
    year: String,
    month: String,
    day: String,
    id: String,
    description: String,
    category: String,
    sum: String,
  },
  { versionKey: false }
);

Schema.methods.printContent = function () {
  let str = `user_id : ${this.user_id}\n
    year : ${this.year}\n
    month : ${this.month}\n
    day : ${this.day}\n
    id : ${this.id}\n
    description : ${this.description}\n
    category : ${this.category}\n
    sum : ${this.sum}\n`;
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
console.log("db.js file end");

module.exports = {
  costDoc,
  connectToDB,
};
