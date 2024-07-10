const express = require("express");
const router = express.Router();
const video = require("../models/video");

// Handle video upload
router.post("/upload", (req, res) => {
  if (req.file) {
    const video = new Video({
      filename: req.file.filename,
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    });

    video
      .save()
      .then((savedVideo) => {
        res.json({
          success: true,
          message: "Video uploaded successfully!",
          videoUrl: savedVideo.url,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Video upload failed!",
          error: err.message,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "Video upload failed!",
    });
  }
});

module.exports = router;
