// imports and configurations
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
require("dotenv").config();

// App initialization and configurations
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Define paths for images
const publicDir = path.join(__dirname, "public");
const largeImagesPath = path.join(publicDir, "images/large");
const thumbImagesPath = path.join(publicDir, "images/thumb");
const clientImagesPath = path.join(__dirname, "../frontend/public/images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, largeImagesPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique name here, e.g. timestamp + original extension
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Serve images statically at /images URL path
app.use("/images", express.static(clientImagesPath));

// Try/catch connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB failed to connect:", err));

// Schema & Model
const courseSchema = new mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  duration: Number,
  price: Number,
  img: String,
  modules: [{ name: String, marks: Number }],
  enrolled: { type: Boolean, default: false },
  instructor: String,
  category: String,
});

const Course = mongoose.model("Course", courseSchema);

// Routes
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// enroll in course
app.patch("/api/courses/:id/enroll", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.enrolled = !course.enrolled;
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new course with image upload
app.post("/api/courses", upload.single("img"), async (req, res) => {
  try {
    const {
      title,
      summary,
      description,
      duration,
      price,
      instructor,
      category,
      enrolled,
    } = req.body;

    const modules = JSON.parse(req.body.modules);

    // Path to the uploaded large image file
    const largeImagePath = path.join(largeImagesPath, req.file.filename);

    // Path where thumbnail will be saved
    const thumbImagePath = path.join(thumbImagesPath, req.file.filename);

    // Use sharp Middleware to resize and create thumbnail
    await sharp(largeImagePath).resize({ width: 330 }).toFile(thumbImagePath);

    const newCourse = new Course({
      title,
      summary,
      description,
      duration: Number(duration),
      price: Number(price),
      instructor,
      category,
      enrolled: enrolled === "true",
      modules,
      img: req.file.filename,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(400).json({ message: "Error saving course", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
