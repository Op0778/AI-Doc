import express from "express";
import { verifyToken } from "../middleware/auth.js";
import History from "../models/Doc.js";

const router = express.Router();

router.get("/history", verifyToken, async (req, res) => {
  try {
    const history = await History.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
