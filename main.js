const express = require("express");
const app = express();
const costsRouter = require("./routes/addCost.js");

app.use("/", costsRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
