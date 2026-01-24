import mongoose from "mongoose";

const problemStatementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    formUrl: {
      type:String
    }
  },
  { timestamps: true },
);

export default mongoose.model("ProblemStatement", problemStatementSchema);
