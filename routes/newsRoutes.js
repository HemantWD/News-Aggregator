import express from "express";
import {
  createNewsController,
  deleteNewsController,
  getAllNewsController,
  getSingleNewsController,
  updateNewsArticle,
} from "../controllers/newsCrudController.js";

// router object
const router = express.Router();

// post request for getting news articles and saving them in DB
router.post("/news", getAllNewsController);

// post request for creating a new news article
router.post("/new-news", createNewsController);

// get request to get single news article
router.get("/news/:id", getSingleNewsController);

// put request to update the news article
router.put("/news/:id", updateNewsArticle);

// delete request to delete the news article using id
router.delete("/news/:id", deleteNewsController);

export default router;
