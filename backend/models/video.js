const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  prize: String,
  colorCode: String,
  thumbnailUrl: String,
  videoUrl: String,
});

module.exports = mongoose.model("Video", videoSchema);
