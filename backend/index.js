const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config/config.env" });

const uploadRoutes = require("./routes/uploadprerecording"); // Ensure correct path
const eventRoutes = require("./routes/eventRoutes");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRoute");
const videoRoutes = require("./routes/video");
const bingoCard = require("./routes/bingocard");
const videoStreamingRoute = require("./routes/videostreaming");
// const paymentRoutes = require("./routes/paymentRoutes");
const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend"))); // Adjust path for static files

// Routes
app.use("/user", userRoute);
app.use("/", staticRoute);
app.use("/video-stream", videoStreamingRoute);
app.use("/api/events", eventRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", uploadRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/bingo", bingoCard);
app.use('/api/payments', paymentRoutes);

// Route for handling form submission
app.post("/set-bingo-type", async (req, res) => {
  console.log("POST /set-bingo-type request received");
  const { bingoType } = req.body;

  try {
    const newEvent = new Event({ gameType: bingoType });
    await newEvent.save(); // Save the event to the database
    res.render("confirmation", { gameType: bingoType });
  } catch (err) {
    console.error("Error saving event to database:", err);
    res.status(500).send("Server Error");
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});