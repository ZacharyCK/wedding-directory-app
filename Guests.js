const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    isWeddingParty: Boolean,
    role: String,
    roleClass: String,
    pajamaSizes: { shirt: String, shorts: String },
    favorites: {
      color: String,
      snack: String,
      candy: String,
      alcohol: String,
      nonAlcohol: String,
    },
    allergies: [String],
    blockOutDates: [Date],
    numOfGuests: Number,
  },
  { collection: "guests" }
);

module.exports = mongoose.model("Guest", guestSchema, "guests");
