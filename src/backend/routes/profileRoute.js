import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";

import User from "../models/User.js";

/* GET LOGGED USER PROFILE */

router.get("/profile", authMiddleware, (req, res) => {

  const user = User.find((u) => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);

});
export default router;