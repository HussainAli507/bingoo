const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      MinLength: [3, "FirstName should be in e characters"],
    },
    mname: {
      type: String,
      MinLength: [3, "FirstName should be in e characters"],
    },
    lname: {
      type: String,
      required: true,
      MinLength: [3, "FirstName should be in e characters"],
    },
    suffix: {
      type: String,
    },
    addr1: {
      type: String,
      required: true,
    },
    addr2: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
