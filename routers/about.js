const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let developers = [
    {
      firstname: "Ram",
      lastname: "Pakanayev",
      id: "313561433",
      email: "rampakanayev@gmail.com",
    },
    {
      firstname: "Shachar",
      lastname: "Baba",
      id: "208613083",
      email: "shaharbaba12@gmail.com",
    },
  ];
  res.json(developers);
});

module.exports = router;
