"use strict";
const appName = "Biggie";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");

//load Idea model here
require("../models/Idea");
const Idea = mongoose.model("Idea");

const db = require("../config/database");

//connect to database
mongoose
  .connect(db.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//add form for ideas
router.get("/add", (req, res) => {
  res.render("ideas/add", { appName });
});

//process 'add form' submission
router.post("/", (req, res) => {
  let errors = [];
  let { topic, details } = req.body;
  if (!topic) {
    const text = "You'll need at least a Topic to get started";
    errors.push({ text });
  }
  if (errors.length) {
    res.status(206);
    res.render("ideas/add", { errors, appName });
  } else {
    const newUser = {
      topic,
      details
    };
    new Idea(newUser)
      .save()
      .then(result => {
        res.redirect("/ideas");
      })
      .catch(err => console.log(err));
  }
});

//ideas index page
router.get("/", (req, res) => {
  Idea.find({})
    .sort({ createDate: "desc" })
    .then(result => {
      const ideas = result;
      res.render("ideas/index", { appName, ideas });
    })
    .catch(err => console.log(err));
});

//edit form for ideas
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  Idea.findOne({ _id: id })
    .then(result => {
      const idea = result;
      res.render("ideas/edit", { idea, appName });
    })
    .catch(err => console.log(err));
});

//process 'edit form' submission
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { topic, details } = req.body;
  Idea.findOne({ _id: id })
    .then(result => {
      result.topic = topic;
      result.details = details;
      result.updateDate = moment.utc();
      result.save().then(result => {
        res.redirect("/ideas");
      });
    })
    .catch(err => console.log(err));
});

//process delete of idea
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  Idea.remove({ _id: id })
    .then(() => {
      res.redirect("/ideas");
    })
    .catch(err => console.log(err));
});

module.exports = router;
