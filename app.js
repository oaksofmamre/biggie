"use strict";
const express = require("express");
const exphbs = require("express-handlebars");
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

//setup handlebars as the view template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

//load routes here
const ideaRoutes = require("./routes/ideaRoutes");
//anything that goes to /ideas route will use ideaRoutes.js
app.use("/ideas", ideaRoutes);

//handle undefined routes last
app.use("*", function(req, res) {
  res.redirect("/ideas");
});

//the root route
app.get("/", (req, res) => {
  res.redirect("/ideas");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sever listening on localhost:${PORT}`);
});
