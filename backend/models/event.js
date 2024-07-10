const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  startDate: Date,
  endDate: Date,
  prize: Number,
  details: String,
  eventType: String,
  startTime: String,
  endTime: String,
  thumbnail: String, // Add thumbnail field to store image URL
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", eventSchema);
