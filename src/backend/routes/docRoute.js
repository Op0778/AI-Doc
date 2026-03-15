import express from "express";
import Doc from "../models/Doc.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", verifyToken, async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ message: "Repo URL required" });
    }

    // example generated documentation
    const generatedDoc = `# Documentation for ${repoUrl}`;
    const projectName = repoUrl.split("/").pop();

    const newDoc = new Doc({
      user: req.user.id,
      projectName: projectName,
      repoUrl: repoUrl,
      tech: [], // you can fill later if detected
      generatedDoc: generatedDoc,
    });

    await newDoc.save();

    res.status(201).json({
      message: "Documentation generated",
      doc: newDoc,
    });
  } catch (error) {
    console.error("Generate Doc Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
