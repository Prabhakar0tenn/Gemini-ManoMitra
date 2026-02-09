import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================= MONGODB ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

/* =====================================================
   📝 DIARY (PURANA – PRESERVED 100%)
===================================================== */
const diarySchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Diary = mongoose.model("Diary", diarySchema);

// Create diary entry
app.post("/api/diary", async (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ error: "Empty diary entry" });
  }

  const entry = new Diary({ content: req.body.content });
  await entry.save();
  res.json({ success: true });
});

// Get diary entries
app.get("/api/diary", async (req, res) => {
  const entries = await Diary.find().sort({ createdAt: -1 });
  res.json(entries);
});

// Delete diary entry
app.delete("/api/diary/:id", async (req, res) => {
  try {
    await Diary.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* =====================================================
   🎧 RELAXATION LIBRARY (NEW)
===================================================== */
const relaxationSchema = new mongoose.Schema({
  title: String,
  category: String,   // sleep | focus | anxiety | meditation
  duration: String,
  youtubeUrl: String,
  icon: String,
  createdAt: { type: Date, default: Date.now }
});

const Relaxation = mongoose.model("Relaxation", relaxationSchema);

// Get relaxation resources
app.get("/api/relax", async (req, res) => {
  const data = await Relaxation.find().sort({ createdAt: -1 });
  res.json(data);
});

// Add relaxation resource (future admin use)
app.post("/api/relax", async (req, res) => {
  const item = new Relaxation(req.body);
  await item.save();
  res.json({ success: true });
});

/* =====================================================
   🎵 PLAYLISTS (USER CREATED)
===================================================== */
const playlistSchema = new mongoose.Schema({
  name: String,
  items: [relaxationSchema],
  createdAt: { type: Date, default: Date.now }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

// Get playlists
app.get("/api/playlists", async (req, res) => {
  const lists = await Playlist.find().sort({ createdAt: -1 });
  res.json(lists);
});

// Create playlist
app.post("/api/playlists", async (req, res) => {
  const playlist = new Playlist(req.body);
  await playlist.save();
  res.json({ success: true });
});

/* ================= SERVER ================= */
app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running");
});

// ================= PEER FORUM =================

// Forum Schema
const forumSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: [String],
  createdAt: { type: Date, default: Date.now }
});

const ForumPost = mongoose.model("ForumPost", forumSchema);

// Get all posts
app.get("/api/forum", async (req, res) => {
  const posts = await ForumPost.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Add new post
app.post("/api/forum", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const post = new ForumPost({ title, content });
  await post.save();
  res.json({ success: true });
});

// Like post
app.post("/api/forum/:id/like", async (req, res) => {
  await ForumPost.findByIdAndUpdate(req.params.id, {
    $inc: { likes: 1 }
  });
  res.json({ success: true });
});

// Add comment
app.post("/api/forum/:id/comment", async (req, res) => {
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: "Empty comment" });

  await ForumPost.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment }
  });
  res.json({ success: true });
});
