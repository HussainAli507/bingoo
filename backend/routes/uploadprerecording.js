const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const Video = require("../models/video");
require("dotenv").config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto",
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => uuidv4(),
  },
});

const upload = multer({ storage });

// POST route for uploading thumbnail and video
router.post(
  "/upload",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { prize, colorCode } = req.body;
      const thumbnailUrl = req.files["thumbnail"][0].path;
      const videoUrl = req.files["video"][0].path;

      // Save video details to the database
      const newVideo = new Video({ prize, colorCode, thumbnailUrl, videoUrl });
      await newVideo.save();

      res.json({ success: true, thumbnailUrl, videoUrl });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).send("Server Error");
    }
  }
);

// GET route for fetching uploaded videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
