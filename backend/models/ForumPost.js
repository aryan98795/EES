import { Schema, model } from "mongoose";

const s = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileUrl: {
        type: String,
        required: true,
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

export default model("ForumPost", s);