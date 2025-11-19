// server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ParticipantsModel } = require("./models/participantsModels");
const User = require("./models/userModel");

const PORT = parseInt(process.env.PORT) || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ratingdb";

const app = express();
app.use(express.json());

// CORS (open for development)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Multer for optional image uploads (memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ---------- AUTH ROUTES ----------

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email & password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ---------- PARTICIPANT ROUTES ----------

// Add Participant (supports file upload or image url)
app.post("/addParticipants", upload.single("image"), async (req, res) => {
  try {
    const { name, department, email, description, teamNo } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });

    const image = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : req.body.image || "https://via.placeholder.com/300";

    const participant = await ParticipantsModel.create({
      name,
      department,
      email,
      description,
      teamNo,
      image,
    });

    res.status(201).json({ message: "Participant added", data: participant });
  } catch (err) {
    console.error("Add Participant Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// Get all participants (with pagination)
app.get("/allParticipants", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Fetch participants with pagination
    const participants = await ParticipantsModel.find(
      {},
      {
        name: 1,
        projectName: 1,
        email: 1,
        image: 1,
        description: 1,
        teamNo: 1,
        votes: 1,
      }
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ParticipantsModel.countDocuments();

    res.json({
      data: participants,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + participants.length < total,
      },
    });

  } catch (err) {
    console.error("Fetch Participants Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});


// Get participants sorted by votes desc (with pagination)
app.get("/allParticipantsByVotes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const participants = await ParticipantsModel.find()
      .sort({ votes: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ParticipantsModel.countDocuments();

    res.json({
      data: participants,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + participants.length < total,
      },
    });
  } catch (err) {
    console.error("Fetch By Votes Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// Vote (increments votes)
app.post("/voteParticipant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const participant = await ParticipantsModel.findById(id);
    if (!participant) return res.status(404).json({ error: "Participant not found" });

    participant.votes = (participant.votes || 0) + 1;
    await participant.save();
    res.json({ message: "Vote counted", votes: participant.votes });
  } catch (err) {
    console.error("Vote Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// Delete participant
app.delete("/deleteParticipant/:id", async (req, res) => {
  try {
    const deleted = await ParticipantsModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Participant not found" });
    res.json({ message: "Deleted", data: deleted });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// Health
app.get("/health", (req, res) => res.json({ status: "OK", time: new Date().toISOString() }));

// Root
app.get("/", (req, res) => res.send("🚀 Rating API Running"));

// ---------- DB connect & start ----------
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
