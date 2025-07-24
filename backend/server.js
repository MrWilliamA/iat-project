const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  hours: Number,
  price: Number,
  img: String,
});

const Course = mongoose.model("Course", courseSchema); // Will use 'courses' collection by default

console.log(mongoose.modelNames()); // shows registered models

// Routes
app.get("/api/courses", async (req, res) => {
  console.log("Fetching courses...");

  try {
    const courses = await Course.find(); // Fetches all documents from 'courses'
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  console.log(`Fetching course with ID: ${req.params.id}`);
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
