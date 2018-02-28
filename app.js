"use strict";

const appName = "Biggie";
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//setup bodyParser middleware
//puts form data in request object, namely req.body
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

//connext to database
mongoose
  .connect("mongodb://localhost/biggie-dev")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//load Idea model here
require("./models/Idea");
const Idea = mongoose.model("Idea");

//setup handlebars for view template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index", { appName });
});

//add idea here
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add", { appName });
});

//process form submit from add idea
app.post("/ideas", (req, res) => {
  let errors = [];
  let { topic, details } = req.body;
  if (!topic) {
    errors.push({ text: "You'll need at least a topic" });
  }
  if (errors.length) {
    res.render("ideas/add", { errors, topic, details, appName });
  } else {
    res.send("valid");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sever listening on localhost:${PORT}`);
});
