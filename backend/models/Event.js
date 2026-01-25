import { Schema, model } from "mongoose";

const resourceSchema = new Schema(
  {
    week: String,
    links: [
      {
        title: String,
        url: String,
      },
    ],
  },
  { _id: false }
);

const coordinatorSchema = new Schema(
  {
    name: String,
    phone: String,
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    resources: [resourceSchema],
    coordinators: [coordinatorSchema],
  },
  { timestamps: true }
);

export default model("Event", eventSchema);
