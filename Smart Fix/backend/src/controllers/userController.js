import { body } from "express-validator";
import User from "../models/User.js";
import RepairRequest from "../models/RepairRequest.js";
import Notification from "../models/Notification.js";
import Review from "../models/Review.js";
import ServiceProvider from "../models/ServiceProvider.js";
import { createNotification } from "../utils/notification.js";

export const profileValidation = [
  body("fullName").optional().notEmpty(),
  body("phone").optional().isString(),
  body("address").optional().isString()
];

export const getProfile = async (req, res) => {
  res.json(req.auth.entity);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.auth.entity._id);
  ["fullName", "phone", "address", "avatar"].forEach((field) => {
    if (req.body[field] !== undefined) user[field] = req.body[field];
  });
  await user.save();
  res.json(user);
};

export const getUserRequests = async (req, res) => {
  const requests = await RepairRequest.find({ user: req.auth.entity._id })
    .populate("provider", "name skills location averageRating")
    .sort({ createdAt: -1 });
  res.json(requests);
};

export const getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({
    recipientType: "user",
    recipientId: req.auth.entity._id
  }).sort({ createdAt: -1 });
  res.json(notifications);
};

export const markNotificationRead = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipientType: "user", recipientId: req.auth.entity._id },
    { read: true },
    { new: true }
  );
  res.json(notification);
};

export const reviewValidation = [
  body("requestId").notEmpty(),
  body("providerId").notEmpty(),
  body("rating").isInt({ min: 1, max: 5 })
];

export const submitReview = async (req, res) => {
  const { requestId, providerId, rating, comment } = req.body;
  const request = await RepairRequest.findOne({
    _id: requestId,
    user: req.auth.entity._id,
    status: { $in: ["Completed", "Delivered", "Closed"] }
  });

  if (!request) return res.status(400).json({ message: "Completed request not found" });

  const existingReview = await Review.findOne({ request: requestId });
  if (existingReview) return res.status(400).json({ message: "Review already submitted" });

  await Review.create({
    request: requestId,
    user: req.auth.entity._id,
    provider: providerId,
    rating,
    comment
  });

  if (request.status !== "Closed") {
    request.status = "Closed";
    request.statusHistory.push({ label: "Closed", note: "User submitted a review and closed the request" });
    await request.save();
  }

  const reviews = await Review.find({ provider: providerId });
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  await ServiceProvider.findByIdAndUpdate(providerId, {
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews: reviews.length
  });

  await createNotification({
    recipientType: "provider",
    recipientId: providerId,
    title: "New review received",
    message: `${req.auth.entity.fullName} rated your service ${rating}/5`,
    type: "review",
    metadata: { requestId }
  });

  res.status(201).json({ message: "Review submitted" });
};
