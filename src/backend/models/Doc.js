import mongoose from "mongoose";

const docSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    projectName: {
      type: String,
      trim: true,
      default: "Untitled Project",
    },

    repoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    tech: [
      {
        type: String,
        trim: true,
      },
    ],

    generatedDoc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

const Doc = mongoose.model("Doc", docSchema);

export default Doc;
