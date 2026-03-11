import mongoose from "mongoose";

const docSchema = new mongoose.Schema(
  {
    repoUrl: { type: String, required: true },
    generatedDoc: { type: String, required: true },
  },
  { timestamps: true },
);

const Doc = mongoose.model("Doc", docSchema);

export default Doc;
