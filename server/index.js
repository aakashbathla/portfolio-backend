import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/"; // directory to store uploaded files
    const fullPath = path.join(uploadDir, file.originalname); // generate full file path

    // check if upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // check if file path is writable
    fs.access(fullPath, fs.constants.W_OK, (err) => {
      if (err) {
        console.error(`File path ${fullPath} is not writable: ${err.message}`);
        return cb(new Error("Internal server error"));
      }

      cb(null, uploadDir);
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
console.log("aakash");
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
