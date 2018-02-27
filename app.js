const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const appName = "Biggie";

//setup handlebars for view template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index", { appName });
});

app.get("/about", (req, res) => {
  res.render("about", { appName });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sever listening on localhost:${PORT}`);
});
