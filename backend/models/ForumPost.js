import { Schema, model } from "mongoose";

const s = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    formUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model("ForumPost", s);
