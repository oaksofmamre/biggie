"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const IdeaSchema = new Schema({
  topic: { type: String, required: true },
  details: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

mongoose.model("Idea", IdeaSchema);
