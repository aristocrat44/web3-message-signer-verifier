import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler, notFound } from "./middleware/errorHandler";
import verifyRoutes from "./routes/verify.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api", verifyRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
