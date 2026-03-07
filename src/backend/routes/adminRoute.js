import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust path
import History from "../models/History.js"; // adjust path

const router = express.Router();

/* ===============================
   VERIFY TOKEN MIDDLEWARE
================================ */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "mysecretecode"); // use same secret used in login
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/* ===============================
   ADMIN CHECK MIDDLEWARE
================================ */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

// get all users
router.get("/admin/users", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/admin/history", async (req, res) => {
  const histories = await History.find();
  res.json(histories);
});

// get user by id
router.get("/admin/user/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });

    res.json(user);
  } catch (err) {
    console.error("user fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// profile update
router.patch(
  "/admin/user/update/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { username, role, email, password } = req.body;
    try {
      const updateFields = {};
      if (username) updateFields.username = username;
      if (role) updateFields.role = role;
      if (email) updateFields.email = email;
      if (password) updateFields.password = password;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true },
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

//delete user
router.delete(
  "/admin/user/remove/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User removed successfully" });
    } catch (error) {
      console.error("Remove user error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
