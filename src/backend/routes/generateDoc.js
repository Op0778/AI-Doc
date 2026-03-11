import express from "express";
const router = express.Router();
// import axios from "axios";

// This is a simple demo, in real case you may clone the repo and parse files
// const { generateDocumentationFromCode } = require("../utils/aiDocGenerator");
import { generateDocumentationFromCode } from "../utils/aiDocGenerator.js";

router.post("/", async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ message: "Repository URL is required" });
  }

  try {
    // Call your AI function to generate doc from repo
    const doc = await generateDocumentationFromCode(repoUrl);
    res.json({ doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate documentation" });
  }
});

// module.exports = router;
export default router;
