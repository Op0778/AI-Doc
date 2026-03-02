import express from "express";
import History from "../models/History.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET Logged-in user's history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
    res.redirect("/login");
  }
});

export default router;
