const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  gameNumber: {
    type: Number,
    required: true,
  },
  prize: {
    type: Number,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
