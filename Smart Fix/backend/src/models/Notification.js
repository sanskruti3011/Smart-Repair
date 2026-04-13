import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientType: { type: String, enum: ["user", "provider", "admin"], required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "info" },
    read: { type: Boolean, default: false },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
