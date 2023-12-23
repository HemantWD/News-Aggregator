import axios from "axios";
import news from "../models/newsModel.js";

// METHOD : POST || All News Articles
const getAllNewsController = async (req, res) => {
  try {
    // making the api call using axios to get the news articles

    const apiKey = process.env.API_KEY;

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    );

    // validation
    if (!response) {
      return res.status(404).send({
        success: false,
        message: "Error in fetching news through API",
      });
    }
    // console.log(response.data);
    const articles = response.data.articles;

    // console.log(articles);

    // saving news articles in the database
    const savedArticles = await news.insertMany(
      articles.map((article) => ({
        source: article.source,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      }))
    );

    res.status(200).send({
      success: true,
      message: "Data Fetched Succeffully and Stored",
      data: savedArticles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error line 50",
    });
  }
};

// METHOD : POST || Creating a news article
const createNewsController = async (req, res) => {
  try {
    // getting data from the body
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = req.body;

    // validation
    if (!author) {
      return res.send({
        message: "Author is required",
      });
    }
    if (!title) {
      return res.send({
        message: "Title is required",
      });
    }
    if (!publishedAt) {
      return res.send({
        message: "Published date is required",
      });
    }
    const existingNews = await news.findOne({ title });
    if (existingNews) {
      return res.status(404).send({
        success: false,
        message: "News Article Already Registered",
      });
    }
    // saving it
    const createdArticle = await new news({
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Article created successfully",
      data: createdArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error line 114",
    });
  }
};

// METHOD : GET || Getting a single news article using id
const getSingleNewsController = async (req, res) => {
  try {
    const articleId = req.params.id;

    // getting the data using location id
    const article = await news.findById(articleId);
    // console.log(article);

    // validation
    if (!article) {
      return res.status(404).send({
        success: false,
        message: "Article not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Article Reterieved Successfully",
      data: article,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error 144",
    });
  }
};

// METHOD : PUT || Updating a news article
const updateNewsArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    // get updated data from the request body
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = req.body;

    // Find and update the article using id
    const updatedArticle = await news.findByIdAndUpdate(articleId, {
      $set: {
        source,
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content,
      },
    });
    // console.log(updatedArticle);

    // validation
    if (!updatedArticle) {
      return res.status(404).send({
        success: false,
        message: "News Article with ID not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "News Article updated with new data",
      data: updatedArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// METHOD : DELETE || Deleting a news article using ID
const deleteNewsController = async (req, res) => {
  try {
    const articleId = req.params.id;
    const deleteArticle = await news.findByIdAndDelete(articleId);

    // validation
    if (!deleteArticle) {
      return res.status(404).send({
        success: fase,
        message: "News Article not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "News Article delete successfully",
      data: deleteArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  getAllNewsController,
  createNewsController,
  getSingleNewsController,
  updateNewsArticle,
  deleteNewsController,
};
