import express from "express";
import { generateDoc } from "../controllers/docController.js";

const router = express.Router();
router.post("/generate", generateDoc);

export default router;
