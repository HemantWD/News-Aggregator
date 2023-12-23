import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  source: {
    name: String,
  },
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

export default mongoose.model("news", newsSchema);
