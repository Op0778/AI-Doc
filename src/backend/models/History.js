// models/History.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: String,
    repo: String,
    tech: [String],
  },
  { timestamps: true },
);

export default mongoose.model("History", historySchema);
