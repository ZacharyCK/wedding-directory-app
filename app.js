require("dotenv").config();
const mongoose = require("mongoose");
const Guest = require("./Guests");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to our mongodb database!"))
  .catch((err) => console.log("error connecting to our mongodb database"));

const express = require("express");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Set view engine to ejs
app.set("view engine", "ejs");

// console.log(Guest.find());

app.get("/wedding-guests/data", (req, res) => {
  async function getGuests() {
    const allGuests = await Guest.find({});
    res.json(allGuests);
  }
  getGuests();
});

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
