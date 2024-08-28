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

// Middleware to parse JSON bodies
app.use(express.json());

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

// POST data for new guest
app.post("/newguest", async (req, res) => {
  try {
    const newGuest = new Guest(req.body);
    const savedGuest = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a guest from the mongodb database
app.delete("/guests", async (req, res) => {
  const { firstName, lastName } = req.query; // Extract firstname and lastName from query parameters

  // if firstName or lastName were NOT passed in
  if (!firstName || !lastName) {
    // tell client either one was not passed in
    return res
      .status(400)
      .json({ message: "First name and last name are required." });
  }

  // try catch block - database issue if error was catched
  try {
    // delete guest using the Guest mongoose model
    // and the findOneAndDelete method
    const deletedGuest = await Guest.findOneAndDelete({ firstName, lastName });

    // If a guest wasn't returned with the delete
    // return a 404 status and guest not found message
    if (!deletedGuest) {
      return res.status(404).json({ message: "Guest not found." });
    }

    // return a success message and 200 status if a guest was deleted
    res
      .status(200)
      .json({ message: "Guest deleted successfully.", deletedGuest });
  } catch (error) {
    // runs if there was an error with the database server connection
    console.log(error);
    res.status(500).json({ message: "Server error while deleting guest." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
