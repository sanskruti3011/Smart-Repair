import mongoose from "mongoose";

const repairRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
    productType: { type: String, required: true, trim: true },
    issueType: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Price Proposed",
        "Approved",
        "Picked Up",
        "In Progress",
        "Completed",
        "Delivered",
        "Closed",
        "Rejected",
        "Cancelled"
      ],
      default: "Pending"
    },
    proposedCost: { type: Number, default: 0 },
    approvedCost: { type: Number, default: 0 },
    priceChangeRequested: { type: Boolean, default: false },
    statusHistory: [
      {
        label: String,
        note: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    serviceAddress: { type: String, trim: true, default: "" },
    pickupScheduledAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    deliveredAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("RepairRequest", repairRequestSchema);
