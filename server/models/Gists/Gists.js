import mongoose from "mongoose";

const gistSchema = new mongoose.Schema(
  {
    gistName: {
      type: String,
      required: true,
    },
    gistDescription: {
      type: String,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileContent: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    Timestamps: true,
  }
);

const gistModel = mongoose.model("gists", gistSchema, "gists");
export default gistModel;
