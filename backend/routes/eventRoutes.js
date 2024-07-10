const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer and Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/eventsCards",
    resource_type: "auto",
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => uuidv4(),
  },
});

const upload = multer({ storage });

// Create a new event with image URL
router.post("/create", upload.single("thumbnail"), async (req, res) => {
  const {
    eventName,
    startDate,
    endDate,
    eventType,
    details,
    startTime,
    endTime,
  } = req.body;

  const event = new Event({
    eventName,
    startDate,
    endDate,
    eventType,
    details,
    startTime: new Date(`${startDate}T${startTime}`),
    endTime: new Date(`${endDate}T${endTime}`),
    thumbnail: req.file.path, // Store the Cloudinary URL in the database
  });

  try {
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
