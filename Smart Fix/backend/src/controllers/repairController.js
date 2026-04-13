import { body } from "express-validator";
import RepairRequest from "../models/RepairRequest.js";
import ServiceProvider from "../models/ServiceProvider.js";
import { createNotification } from "../utils/notification.js";

export const createRepairValidation = [
  body("productType").notEmpty(),
  body("issueType").notEmpty(),
  body("description").notEmpty(),
  body("providerId").notEmpty(),
  body("address").optional().isString()
];

export const createRepairRequest = async (req, res) => {
  const provider = await ServiceProvider.findById(req.body.providerId);
  if (!provider) return res.status(404).json({ message: "Provider not found" });

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  const request = await RepairRequest.create({
    user: req.auth.entity._id,
    provider: req.body.providerId,
    productType: req.body.productType,
    issueType: req.body.issueType,
    description: req.body.description,
    imageUrl,
    serviceAddress: req.body.address || req.auth.entity.address || "",
    statusHistory: [{ label: "Pending", note: "Repair request created" }]
  });

  await createNotification({
    recipientType: "provider",
    recipientId: provider._id,
    title: "New repair request",
    message: `${req.auth.entity.fullName} submitted a ${req.body.productType} repair request`,
    type: "request",
    metadata: { requestId: request._id }
  });

  const populated = await RepairRequest.findById(request._id)
    .populate("provider", "name skills location averageRating")
    .populate("user", "fullName email");

  res.status(201).json(populated);
};

export const getRepairRequestById = async (req, res) => {
  const request = await RepairRequest.findById(req.params.id)
    .populate("provider", "name skills location averageRating totalReviews")
    .populate("user", "fullName email phone address");

  if (!request) return res.status(404).json({ message: "Repair request not found" });

  const ownsRequest =
    request.user._id.toString() === req.auth.entity._id.toString() ||
    request.provider?._id?.toString() === req.auth.entity._id.toString() ||
    req.auth.role === "admin";

  if (!ownsRequest) return res.status(403).json({ message: "Access denied" });
  res.json(request);
};

export const confirmPriceValidation = [body("approve").isBoolean()];

export const confirmPriceUpdate = async (req, res) => {
  const request = await RepairRequest.findOne({ _id: req.params.id, user: req.auth.entity._id });
  if (!request) return res.status(404).json({ message: "Repair request not found" });
  if (request.status !== "Price Proposed") {
    return res.status(400).json({ message: "Price can only be confirmed when a proposal is pending" });
  }

  if (req.body.approve) {
    request.approvedCost = request.proposedCost;
    request.priceChangeRequested = false;
    request.status = "Approved";
    request.statusHistory.push({ label: "Approved", note: "User approved the proposed cost" });
  } else {
    request.priceChangeRequested = false;
    request.status = "Cancelled";
    request.statusHistory.push({ label: "Cancelled", note: "User rejected the proposed price" });
  }

  await request.save();

  await createNotification({
    recipientType: "provider",
    recipientId: request.provider,
    title: "Price confirmation updated",
    message: req.body.approve
      ? "User approved your repair cost"
      : "User rejected your repair cost proposal",
    type: "price",
    metadata: { requestId: request._id }
  });

  res.json(request);
};

export const cancelRepairRequest = async (req, res) => {
  const request = await RepairRequest.findOne({ _id: req.params.id, user: req.auth.entity._id });
  if (!request) return res.status(404).json({ message: "Repair request not found" });

  if (["Completed", "Delivered", "Closed", "Rejected"].includes(request.status)) {
    return res.status(400).json({ message: "This request can no longer be cancelled" });
  }

  request.status = "Cancelled";
  request.statusHistory.push({
    label: "Cancelled",
    note: req.body.note || "User cancelled the repair request"
  });
  await request.save();

  await createNotification({
    recipientType: "provider",
    recipientId: request.provider,
    title: "Repair request cancelled",
    message: "The customer cancelled this repair request",
    type: "status",
    metadata: { requestId: request._id }
  });

  res.json(request);
};
