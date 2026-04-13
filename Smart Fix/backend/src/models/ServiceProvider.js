import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    experience: { type: Number, default: 0 },
    location: { type: String, trim: true },
    bio: { type: String, trim: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("ServiceProvider", serviceProviderSchema);
