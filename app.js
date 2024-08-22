const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// GET request for root
app.get("/", (req, res) => {
  res.render("pages/index");
});

// POST request for root
app.post("/", (req, res) => {
  res.send("You can post to this endpoint!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
