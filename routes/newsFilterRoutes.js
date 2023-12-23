import express from "express";
import {
  newsArticleByCategory,
  searchNewsByKeyword,
} from "../controllers/newsController.js";

// router object
const router = express.Router();

// filter routes by category
router.get("/filter", newsArticleByCategory);

// search request using keyword
router.get("/search", searchNewsByKeyword);

export default router;
