import express from "express";
import {
  getPost,
  getPosts,
  addPost,
  deletePost,
  updatePost,
  getUserPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/users", getUserPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
