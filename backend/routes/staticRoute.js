const express = require("express");
const router = express.Router();
const bingocards = require("../models/bingocards");

function generateBingoCard() {
  return Array.from({ length: 25 }, () => Math.floor(Math.random() * 100) + 1);
}

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

// Render the main event form (Comment this out or change path to avoid conflict with root route)
// router.get("/", (req, res) => {
//   res.render("event");
// });

// Render the video upload form
router.get("/upload", (req, res) => {
  res.render("upload");
});

// Render the bingo card generation form
router.get("/generate", (req, res) => {
  res.render("generate");
});

// Handle bingo card generation
router.get("/generate-card", (req, res) => {
  const card = generateBingoCard();
  res.render("generate", { card });
});

// Render the bingo card verification form
router.get("/verify", (req, res) => {
  res.render("verify", { result: null });
});

// Handle bingo card verification
router.post("/verify-card", (req, res) => {
  const { cardId } = req.body;

  // Mock verification logic, replace with actual logic
  const result = { message: "Card is valid" };

  res.render("verify", { result });
});

module.exports = router;
