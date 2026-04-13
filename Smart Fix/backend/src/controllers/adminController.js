import User from "../models/User.js";
import ServiceProvider from "../models/ServiceProvider.js";
import RepairRequest from "../models/RepairRequest.js";
import SupportTicket from "../models/SupportTicket.js";

export const getDashboardAnalytics = async (req, res) => {
  const [totalUsers, totalProviders, totalRequests, openTickets, statusBreakdown] = await Promise.all([
    User.countDocuments({ role: "user" }),
    ServiceProvider.countDocuments(),
    RepairRequest.countDocuments(),
    SupportTicket.countDocuments({ status: { $ne: "Resolved" } }),
    RepairRequest.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
  ]);

  res.json({ totalUsers, totalProviders, totalRequests, openTickets, statusBreakdown });
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const getProvidersAdmin = async (req, res) => {
  const providers = await ServiceProvider.find().select("-password").sort({ createdAt: -1 });
  res.json(providers);
};

export const getAllRequests = async (req, res) => {
  const requests = await RepairRequest.find()
    .populate("user", "fullName email")
    .populate("provider", "name email")
    .sort({ createdAt: -1 });
  res.json(requests);
};

export const getSupportTickets = async (req, res) => {
  const tickets = await SupportTicket.find().sort({ createdAt: -1 });
  res.json(tickets);
};

export const resolveTicket = async (req, res) => {
  const ticket = await SupportTicket.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status || "Resolved",
      resolution: req.body.resolution || "Ticket resolved by admin",
      assignedTo: req.auth.entity._id
    },
    { new: true }
  );
  res.json(ticket);
};
