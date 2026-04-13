import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
