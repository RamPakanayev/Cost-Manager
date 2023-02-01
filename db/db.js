const mongoose = require("mongoose");

// Define the Mongoose schema and model here
let Schema = mongoose.Schema(
  {
    user_id: String,
    year: String,
    month: String,
    day: Number,
    description: String,
    category: String,
    sum: Number,
  },
  { versionKey: false }
);

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
