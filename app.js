"use strict";
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const moment = require("moment");
// const mongoose = require("mongoose");

const app = express();

//setup middleware to use PUT and DELETE http verbs
app.use(methodOverride("_method"));

//setup bodyParser middleware
//puts form data in request object, namely req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup handlebars as the view template engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      formatDate: (date, format) => {
        return moment(date).format(format);
      },
      fromDate: date => {
        let start = moment(date);
        let end = new Date();
        return start.from(end);
      }
    }
  })
);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

//establish database connection
// app.use((req, res, next) => {
//   if (mongoose.connection.readyState) {
//     next();
//   } else {
//     require("./mongo")()
//       .then(() => console.log("MongoDB connected DC!"))
//       .then(() => next())
//       .catch(err => console.log(err));
//   }
// });

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

//sever setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});

// const PORT = process.env.PORT || 3000;
// const HOST = "localhost";

// let args;
// process.env.NODE_ENV === "production" ? (args = [PORT]) : (args = [PORT, HOST]);

// args.push(() => {
//   console.log(`Server listening on ${HOST}:${PORT}`);
// });

// app.listen.apply(app, args);

// module.exports = app;
