import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/history.js";
import adminRoutes from "./routes/adminRoute.js";
import docRoute from "./routes/docRoute.js";
import profileRoute from "./routes/profileRoute.js";
// dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/doc", docRoute);
app.use("/api",profileRoute);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
