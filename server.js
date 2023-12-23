import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import newsFilterRoutes from "./routes/newsFilterRoutes.js";

// config env
dotenv.config();

// database configuration
connectDB();

// REST Object
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

app.use("/api", newsRoutes);
app.use("/api", newsFilterRoutes);

// RESR API
app.use("/", (req, res) => {
  res.send("<h1>Welcome to News Api App</h1>");
});

// PORT

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
