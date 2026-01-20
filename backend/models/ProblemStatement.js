import mongoose from "mongoose";

const problemStatementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("ProblemStatement", problemStatementSchema);
