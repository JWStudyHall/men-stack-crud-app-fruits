const express = require("express");
const logger = require("morgan");
const db = require("./db/connection.js");

const app = express();

//routes
app.get("/", (req, res) => {
  //   res.send("You're on the landing page!!");
  res.render("index.ejs");
});

//server that needs to be ran
db.on("connected", () => {
  console.clear();
  console.log(`Connected to MongoDB!`);

  app.listen(3000, () => {
    console.log("Your server is running on PORT 3000");
  });
});
