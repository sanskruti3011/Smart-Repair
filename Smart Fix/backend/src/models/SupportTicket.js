import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    createdByType: { type: String, enum: ["user", "provider"], required: true },
    createdById: { type: mongoose.Schema.Types.ObjectId, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Open", "In Review", "Resolved"], default: "Open" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolution: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("SupportTicket", supportTicketSchema);
