import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER_NAME, // folder name for uploaded files
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // allowed file formats
    public_id: (req, file) => Date.now() + "-" + file.originalname, // generate unique public ID for each file
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  console.log(req);
  const file = req.file.path;
  return res.status(200).json(file);
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
  return res.json("Hello");
});

app.listen(8800, () => {
  console.log("Server Connected");
});
