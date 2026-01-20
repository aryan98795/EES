import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
  }
);

const Event = model("Event", eventSchema);

export default Event;
