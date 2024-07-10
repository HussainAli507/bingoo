const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BingoCardSchema = new Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  card: {
    type: [Number],
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BingoCard", BingoCardSchema);
