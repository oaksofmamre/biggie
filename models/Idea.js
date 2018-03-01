"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const IdeaSchema = new Schema({
  topic: { type: String, required: true },
  details: { type: String, required: false },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date }
});

mongoose.model("Idea", IdeaSchema);
