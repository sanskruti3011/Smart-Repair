import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "RepairRequest", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
