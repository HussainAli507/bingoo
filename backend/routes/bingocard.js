const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const BingoCard = require("../models/bingocards");

// Generate and distribute bingo cards
router.get("/generate", (req, res) => {
  const card = Array.from(
    { length: 25 },
    () => Math.floor(Math.random() * 75) + 1
  );
  const cardId = uuidv4();

  const bingoCard = new BingoCard({ cardId, card });

  bingoCard
    .save()
    .then((savedCard) => {
      res.json({
        success: true,
        cardId: savedCard.cardId,
        card: savedCard.card,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to generate bingo card!",
        error: err.message,
      });
    });
});

// Verify bingo card
router.post("/verify", (req, res) => {
  const { cardId, numbers } = req.body;

  BingoCard.findOne({ cardId })
    .then((card) => {
      if (!card) {
        return res.status(404).json({
          success: false,
          message: "Card not found!",
        });
      }

      const isValid = numbers.every((num) => card.card.includes(num));
      res.json({
        success: isValid,
        message: isValid ? "Bingo!" : "Invalid numbers.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Verification failed!",
        error: err.message,
      });
    });
});

module.exports = router;
