import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import newsFilterRoutes from "./routes/newsFilterRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

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

// Get the directory name using fileURLToPath and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like your HTML file)
app.use(express.static(path.join(__dirname)));

// REST API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
