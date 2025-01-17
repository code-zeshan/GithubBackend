import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    user_view_type: {
      type: String,
      enum: ["Public"],
    },
    site_admin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    userVerify: {
      phone: {
        type: Boolean,
        default: false,
      },
      email: {
        type: Boolean,
        default: false,
      },
    },
    userVerifyToken: {
      phone: { type: String },
      email: { type: String },
    },
    hireable: {
      type: Boolean,
    },
    bio: {
      type: String,
    },
    twitter_username: {
      type: String,
    },
    public_repos: {
      type: Number,
    },
    public_gists: {
      type: Number,
    },
    followers: { type: Number },
    following: { type: Number },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema, "user");

export default userModel;
