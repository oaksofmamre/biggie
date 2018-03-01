"use strict";
const appName = "Biggie";
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const moment = require("moment");

const app = express();

//setup middleware to use PUT and DELETE http verbs
app.use(methodOverride("_method"));

//setup bodyParser middleware
//puts form data in request object, namely req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
mongoose
  .connect("mongodb://localhost/biggie-dev")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//load Idea model here
require("./models/Idea");
const Idea = mongoose.model("Idea");

//setup handlebars as the view template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

//
//define routes here
//
app.get("/", (req, res) => {
  res.redirect("/ideas");
});

//add form for ideas
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add", { appName });
});

//process 'add form' submission
app.post("/ideas", (req, res) => {
  let errors = [];
  let { topic, details } = req.body;
  if (!topic) {
    const errorText = "You'll need at least a Topic to get started";
    errors.push({ errorText });
  }
  if (errors.length) {
    res.render("ideas/add", { errors, appName });
  } else {
    const newUser = {
      topic,
      details
    };
    new Idea(newUser).save().then(result => {
      res.redirect("/ideas");
    });
  }
});

//ideas index page
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ createDate: "desc" })
    .then(result => {
      const ideas = result;
      res.render("ideas/index", { appName, ideas });
    })
    .catch(err => console.log(err));
});

//edit form for ideas
app.get("/ideas/edit/:id", (req, res) => {
  const { id } = req.params;
  Idea.findOne({ _id: id }).then(result => {
    const idea = result;
    res.render("ideas/edit", { idea, appName });
  });
});

//process 'edit form' submission
app.put("/ideas/:id", (req, res) => {
  const { id } = req.params;
  const { topic, details } = req.body;
  Idea.findOne({ _id: id })
    .then(result => {
      result.topic = topic;
      result.details = details;
      result.updateDate = new Date();
      result.save().then(result => {
        res.redirect("/ideas");
      });
    })
    .catch(err => console.log(err));
});

//process delete of idea
app.get("/ideas/delete/:id", (req, res) => {
  const { id } = req.params;
  Idea.remove({ _id: id }).then(() => {
    res.redirect("/ideas");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sever listening on localhost:${PORT}`);
});
