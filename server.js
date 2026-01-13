const express = require("express");
const logger = require("morgan");
const methodOverride = require("method-override");
const db = require("./db/connection.js");
const Fruit = require("./models/fruit.js");

const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));

//routes
app.get("/", (req, res) => {
  //   res.send("You're on the landing page!!");
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", {
    fruits: allFruits,
  });
});

app.get("/fruits/:fruitId", async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", {
    fruit: fruit,
  });
});
app.delete("/fruits/:fruitId", async(req, res) => {
 //you have to remember the model
 await Fruit.findByIdAndDelete(req.params.fruitId);
 res.redirect("/fruits")
});


//server that needs to be ran
db.on("connected", () => {
  console.clear();
  console.log(`Connected to MongoDB!`);

  app.listen(3000, () => {
    console.log("Your server is running on PORT 3000");
  });
});
