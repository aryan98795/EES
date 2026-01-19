import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemStatement",
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
