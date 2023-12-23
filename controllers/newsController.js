import axios from "axios";
import news from "../models/newsModel.js";

// METHOD: GET || news articles by category
const newsArticleByCategory = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const { category } = req.body;

    // Validation
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });
    }

    // Encode the category value
    const encodedCategory = encodeURIComponent(category);

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${encodedCategory}&apiKey=${apiKey}`
    );

    // validation
    if (!response) {
      return res.status(404).send({
        success: false,
        message: "Error in fetching news",
      });
    }
    // console.log(response.data);
    res.status(200).send({
      success: true,
      message: "Filtered by category articles fetched successfully",
      data: response.data.articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// METHOD : GET || Searching news using keyword
const searchNewsByKeyword = async (req, res) => {
  try {
    const { keyword } = req.query;

    // validation
    if (!keyword) {
      return res.status(400).send({
        success: false,
        message: "Need some words to search",
      });
    }

    // Searching news by keyword in title for that using aggregation operations
    const matching = await news.find({
      $or: [{ title: { $regex: keyword, $options: "i" } }],
    });

    // console.log(matching);
    if (!matching) {
      return res.status(404).send({
        success: false,
        message: "No news found with these keywords",
      });
    }
    res.status(200).send({
      success: true,
      message: "News with the searched keyword",
      data: matching,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export { newsArticleByCategory, searchNewsByKeyword };
