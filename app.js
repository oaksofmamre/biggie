"use strict";
require("dotenv").config();
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
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      formatDate: (date, format) => {
        //ensure date rendered is that of the browser's local time, not wherever host's server is (heroku)
        return (
          moment
            .utc(date)
            // .local()
            .format(format)
        );
      },
      fromDate: date => {
        let start = moment(date);
        let end = moment();
        return start.from(end);
      }
    }
  })
);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

//
//load routes here
//

const ideaRoutes = require("./routes/ideaRoutes");
//anything that goes to /ideas route will use ideaRoutes.js
app.use("/ideas", ideaRoutes);

//the root route
app.get("/", (req, res) => {
  res.redirect("/ideas");
});

//handle undefined routes last
app.use("*", function(req, res) {
  res.redirect("/ideas");
});

//sever setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
