// models/Tag.ts
import mongoose, { Schema, Types } from "mongoose";

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  tagType: {
    type: String,
    required: false,
    enum: ["USER", "GLOBAL"],
    default: "USER",
  },
});

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
