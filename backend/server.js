import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();

/* ================================
   0️⃣ NODE_ENV AWARE SETTINGS
================================ */
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.disable("x-powered-by");
}

/* ================================
   1️⃣ MIDDLEWARE
================================ */
app.use(express.json());

app.use(
  cors({
    origin: isProduction ? process.env.FRONTEND_URL || false : "*",
  }),
);

/* ================================
   2️⃣ ENV DEBUG (SAFE)
================================ */
if (!isProduction) {
  console.log("🔍 ENV CHECK");
  console.log("Cloudinary Cloud:", !!process.env.CLOUDINARY_CLOUD_NAME);
  console.log("Cloudinary Key:", !!process.env.CLOUDINARY_API_KEY);
  console.log("Cloudinary Secret:", !!process.env.CLOUDINARY_API_SECRET);
  console.log("Mongo URI:", !!process.env.MONGO_URI);
  console.log("--------------------------------");
}

/* ================================
   3️⃣ CLOUDINARY CONFIG
================================ */
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌ Cloudinary env variables missing");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "esperanza_uploads",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mkv", "pdf"],
  },
});

const upload = multer({ storage });

/* ================================
   4️⃣ MONGODB CONNECTION
================================ */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing");
}

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

/* ================================
   5️⃣ SCHEMAS & MODELS
================================ */

const MediaAssetSchema = {
  url: String,
  publicId: String,
  type: { type: String, default: "image" },
};

const RegistrationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    college: String,
    phone: String,
    degree: String,
    course: String,
    year: String,
    isVeltechStudent: Boolean,
    vmNumber: String,
    idCardUrl: String,
    paymentScreenshotUrl: String,
    eventOfInterest: String,
    paymentStatus: { type: String, default: "Pending" },
  },
  { timestamps: true },
);
const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  description: String,
  category: String,
  registeredCount: Number,
  maxSlots: Number,
  image: MediaAssetSchema,
  participationType: String,
  ticketTiers: [String],
  rules: [String],
  teamSize: String,
});
const EventModel = mongoose.model("Event", EventSchema);

const ContentSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroBackgroundMedia: MediaAssetSchema,
  marqueeText: String,
  eventDate: String,
  ticketPrices: {
    diamond: Number,
    gold: Number,
    silver: Number,
  },
  upiId: String,
  qrCodeUrl: String,
  galleryImages: [MediaAssetSchema],
  faqs: [{ question: String, answer: String }],
  isTicketPassEnabled: Boolean,
});
const ContentModel = mongoose.model("Content", ContentSchema);

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  category: String,
  image: MediaAssetSchema,
  instagram: String,
  linkedin: String,
  order: Number,
  isActive: { type: Boolean, default: true },
});
const TeamMemberModel = mongoose.model("TeamMember", TeamMemberSchema);

/* ================================
   6️⃣ ROUTES
================================ */

app.get("/", (req, res) => {
  res.send("✅ Esperanza backend is LIVE");
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    data: {
      url: req.file.path,
      publicId: req.file.filename,
      type: req.file.mimetype,
    },
  });
});

app.post("/api/admin/login", (req, res) => {
  if (req.body.password === process.env.ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    await new RegistrationModel(req.body).save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/admin/registrations", async (req, res) => {
  const data = await RegistrationModel.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
});

app.get("/api/events", async (req, res) => {
  res.json(await EventModel.find());
});

app.post("/api/events/update", async (req, res) => {
  await EventModel.deleteMany({});
  await EventModel.insertMany(req.body.events || []);
  res.json({ success: true });
});

app.get("/api/content", async (req, res) => {
  res.json({ success: true, data: await ContentModel.findOne() });
});

app.post("/api/content/update", async (req, res) => {
  await ContentModel.deleteMany({});
  await new ContentModel(req.body.content).save();
  res.json({ success: true });
});

app.get("/api/team", async (req, res) => {
  res.json({
    success: true,
    data: await TeamMemberModel.find().sort({ order: 1 }),
  });
});

app.post("/api/team/update", async (req, res) => {
  await TeamMemberModel.deleteMany({});
  await TeamMemberModel.insertMany(req.body.teamMembers || []);
  res.json({ success: true });
});

/* ================================
   7️⃣ START SERVER
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
