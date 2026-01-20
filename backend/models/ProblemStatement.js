import { Schema, model } from "mongoose";

const ps = new Schema({
  title: { type: String, required: true },
  pdf: { type: String, required: true },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true
  }
});

export default model("ProblemStatement", ps);
