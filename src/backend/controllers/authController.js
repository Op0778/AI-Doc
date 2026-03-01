import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // 1️⃣ Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Save to DB
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User Registered Successfully" });
  user.save();
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id },
      //   process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
