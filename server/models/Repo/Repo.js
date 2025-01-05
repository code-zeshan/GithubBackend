import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
  {
    repo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },
    branch: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    Timestamps: true,
  }
);

const repoModel = mongoose.model("repo", repoSchema, "repo");

export default repoModel;
