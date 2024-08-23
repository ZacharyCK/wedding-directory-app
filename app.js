const mongoose = require("mongoose");
const Guest = require("./Guests");

mongoose
  .connect(
    "mongodb+srv://zacharyckohs:33SchnitzelWiener65@wedding-directory.b3p1p.mongodb.net/wedding-guests?retryWrites=true&w=majority&appName=wedding-directory"
  )
  .then(() => console.log("connected to our mongodb database!"))
  .catch((err) => console.log("error connecting to our mongodb database"));

const express = require("express");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Set view engine to ejs
app.set("view engine", "ejs");

function numberToWords(num) {
  const ones = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else if (num < 100) {
    return (
      tens[Math.floor(num / 10)] + (num % 10 !== 0 ? "" + ones[num % 10] : "")
    );
  } else if (num < 1000) {
    return (
      ones[Math.floor(num / 100)] +
      "Hundred" +
      (num % 100 !== 0 ? "" + numberToWords(num % 100) : "")
    );
  } else {
    return "Number out of range";
  }
}

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
  // res.render("pages/index");
  async function getGuests() {
    const allGuests = await Guest.find({});
    res.render("pages/index", {
      allGuests: allGuests,
      numberToWordsFunc: numberToWords,
    });
  }
  getGuests();
});

// POST request for root
app.post("/", (req, res) => {
  res.send("You can post to this endpoint!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
