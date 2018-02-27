"use strict";

const appName = "Biggie";
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sever listening on localhost:${PORT}`);
});
