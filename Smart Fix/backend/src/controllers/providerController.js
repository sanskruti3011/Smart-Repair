import { body } from "express-validator";
import ServiceProvider from "../models/ServiceProvider.js";
import RepairRequest from "../models/RepairRequest.js";
import Notification from "../models/Notification.js";
import { createNotification } from "../utils/notification.js";

export const getProviderProfile = async (req, res) => {
  res.json(req.auth.entity);
};

export const updateProviderProfile = async (req, res) => {
  const provider = await ServiceProvider.findById(req.auth.entity._id);
  ["name", "phone", "location", "bio", "experience", "status"].forEach((field) => {
    if (req.body[field] !== undefined) provider[field] = req.body[field];
  });
  if (req.body.skills !== undefined) {
    provider.skills = Array.isArray(req.body.skills)
      ? req.body.skills
      : String(req.body.skills)
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
  }
  await provider.save();
  res.json(provider);
};

export const getProviders = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 8);
  const search = req.query.search || "";
  const skill = req.query.skill || "";
  const query = {
    status: "active",
    $and: [
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } }
        ]
      }
    ]
  };
  if (skill) query.skills = { $regex: skill, $options: "i" };

  const [items, total] = await Promise.all([
    ServiceProvider.find(query)
      .sort({ averageRating: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password"),
    ServiceProvider.countDocuments(query)
  ]);

  res.json({ items, page, totalPages: Math.ceil(total / limit), total });
};

export const requestActionValidation = [body("action").isIn(["accept", "reject"]), body("note").optional().isString()];
export const costValidation = [body("cost").isNumeric(), body("note").optional().isString()];
export const statusValidation = [
  body("status").isIn(["Picked Up", "In Progress", "Completed", "Delivered", "Closed"]),
  body("note").optional().isString()
];

export const getProviderRequests = async (req, res) => {
  const requests = await RepairRequest.find({ provider: req.auth.entity._id })
    .populate("user", "fullName email phone address")
    .sort({ createdAt: -1 });
  res.json(requests);
};

export const respondToRequest = async (req, res) => {
  const request = await RepairRequest.findOne({ _id: req.params.id, provider: req.auth.entity._id });
  if (!request) return res.status(404).json({ message: "Repair request not found" });
  if (request.status !== "Pending") {
    return res.status(400).json({ message: "Only pending requests can be accepted or rejected" });
  }

  if (req.body.action === "accept") {
    request.status = "Accepted";
    request.statusHistory.push({ label: "Accepted", note: req.body.note || "Technician accepted the request" });
  } else {
    request.status = "Rejected";
    request.statusHistory.push({ label: "Rejected", note: req.body.note || "Technician rejected the request" });
  }

  await request.save();
  await createNotification({
    recipientType: "user",
    recipientId: request.user,
    title: "Repair request updated",
    message: `Your repair request has been ${request.status.toLowerCase()}`,
    type: "status",
    metadata: { requestId: request._id }
  });

  res.json(request);
};

export const proposeCost = async (req, res) => {
  const request = await RepairRequest.findOne({ _id: req.params.id, provider: req.auth.entity._id });
  if (!request) return res.status(404).json({ message: "Repair request not found" });
  if (!["Accepted", "Price Proposed", "Approved"].includes(request.status)) {
    return res.status(400).json({ message: "Price can only be proposed after the request is accepted" });
  }

  request.proposedCost = Number(req.body.cost);
  request.priceChangeRequested = true;
  request.status = "Price Proposed";
  request.statusHistory.push({
    label: request.status,
    note: req.body.note || `Repair price proposed at ${req.body.cost}`
  });
  await request.save();

  await createNotification({
    recipientType: "user",
    recipientId: request.user,
    title: "Price proposal updated",
    message: `Provider proposed a repair cost of ${req.body.cost}`,
    type: "price",
    metadata: { requestId: request._id, cost: req.body.cost }
  });

  res.json(request);
};

export const updateRequestStatus = async (req, res) => {
  const request = await RepairRequest.findOne({ _id: req.params.id, provider: req.auth.entity._id });
  if (!request) return res.status(404).json({ message: "Repair request not found" });

  const validTransitions = {
    Approved: ["Picked Up"],
    "Picked Up": ["In Progress"],
    "In Progress": ["Completed"],
    Completed: ["Delivered"],
    Delivered: ["Closed"]
  };

  if (!validTransitions[request.status]?.includes(req.body.status)) {
    return res.status(400).json({ message: `Cannot move request from ${request.status} to ${req.body.status}` });
  }

  request.status = req.body.status;
  request.statusHistory.push({
    label: req.body.status,
    note: req.body.note || `Status changed to ${req.body.status}`
  });
  if (req.body.status === "Picked Up") request.pickedUpAt = new Date();
  if (req.body.status === "Completed") request.completedAt = new Date();
  if (req.body.status === "Delivered") request.deliveredAt = new Date();
  await request.save();

  await createNotification({
    recipientType: "user",
    recipientId: request.user,
    title: "Repair status updated",
    message: `Repair request is now ${req.body.status}`,
    type: "status",
    metadata: { requestId: request._id }
  });

  res.json(request);
};

export const getProviderNotifications = async (req, res) => {
  const notifications = await Notification.find({
    recipientType: "provider",
    recipientId: req.auth.entity._id
  }).sort({ createdAt: -1 });
  res.json(notifications);
};
