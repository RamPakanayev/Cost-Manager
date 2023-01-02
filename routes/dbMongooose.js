const mongoose = require("mongoose");
const url = require("url");
const http = require("http");

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  const queryObject = url.parse(req.url, true).query;
  let name = queryObject.name;
  let content = queryObject.content;
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

  let recipeSchema = mongoose.Schema({
    cost_name: String,
    cost_value: String,
  });

  recipeSchema.methods.printContent = function () {
    let str =
      "Cost name: " + this.cost_name + "\nCost value: " + this.cost_value;
    console.log(str);
  };
  recipeSchema.methods.printName = () => {
    let str = "Recipe name: " + this.cost_name;
    console.log(str);
  };

  //collection name
  let Recipe = mongoose.model("costs", recipeSchema);

  let recipe = new Recipe({ cost_name: name, cost_value: content });

  try {
    await recipe.save();
    console.log("recipe was saved to mongodb");
    recipe.printContent();
  } catch (error) {
    console.log(error);
  }

  try {
    let recipes = await Recipe.find();
    //console.log(recipes);
  } catch (error) {
    console.log(error);
  }
});

server.listen(1300);
