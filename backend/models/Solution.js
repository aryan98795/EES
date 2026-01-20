import { Schema, model } from "mongoose";

const solutionSchema = new Schema(
  {
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "ProblemStatement",
      required: true
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    filePath: {
      type: String,
      required: true
    }
  }
);

export default model("Solution", solutionSchema);

