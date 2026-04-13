import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import ServiceProvider from "../models/ServiceProvider.js";
import RepairRequest from "../models/RepairRequest.js";
import Notification from "../models/Notification.js";
import Review from "../models/Review.js";
import SupportTicket from "../models/SupportTicket.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    ServiceProvider.deleteMany(),
    RepairRequest.deleteMany(),
    Notification.deleteMany(),
    Review.deleteMany(),
    SupportTicket.deleteMany()
  ]);

  const hashed = await bcrypt.hash("password123", 10);
  const [admin, user] = await User.create([
    {
      fullName: "Admin User",
      email: "admin@smartrepair.com",
      password: hashed,
      role: "admin",
      phone: "9000000000",
      address: "Head Office"
    },
    {
      fullName: "Riya Sharma",
      email: "user@smartrepair.com",
      password: hashed,
      role: "user",
      phone: "9876543210",
      address: "Bangalore"
    }
  ]);

  const [providerOne, providerTwo] = await ServiceProvider.create([
    {
      name: "TechFix Pro",
      email: "provider1@smartrepair.com",
      password: hashed,
      phone: "9011111111",
      skills: ["Mobile", "Screen", "Battery"],
      experience: 6,
      location: "Bangalore",
      bio: "Mobile and tablet repair specialist",
      averageRating: 4.8,
      totalReviews: 24
    },
    {
      name: "Laptop Care Hub",
      email: "provider2@smartrepair.com",
      password: hashed,
      phone: "9022222222",
      skills: ["Laptop", "Keyboard", "Motherboard"],
      experience: 8,
      location: "Hyderabad",
      bio: "Laptop diagnostics and board-level repairs",
      averageRating: 4.7,
      totalReviews: 18
    }
  ]);

  const request = await RepairRequest.create({
    user: user._id,
    provider: providerOne._id,
    productType: "Mobile",
    issueType: "Screen",
    description: "Display cracked after a drop. Touch is working intermittently.",
    serviceAddress: "Bangalore",
    status: "In Progress",
    proposedCost: 3500,
    approvedCost: 3500,
    statusHistory: [
      { label: "Pending", note: "Repair request created" },
      { label: "Accepted", note: "Provider accepted request" },
      { label: "Price Proposed", note: "Initial quote shared" },
      { label: "Approved", note: "User approved the quote" },
      { label: "Picked Up", note: "Technician picked up the device" },
      { label: "In Progress", note: "Repair work started" }
    ]
  });

  await Notification.create([
    {
      recipientType: "user",
      recipientId: user._id,
      title: "Repair in progress",
      message: "Your mobile repair is now in progress",
      type: "status",
      metadata: { requestId: request._id }
    },
    {
      recipientType: "provider",
      recipientId: providerOne._id,
      title: "New review soon",
      message: "Complete this job to unlock user review",
      type: "info"
    }
  ]);

  await SupportTicket.create({
    createdByType: "user",
    createdById: user._id,
    subject: "Delayed pickup",
    description: "Pickup time changed twice. Need an updated ETA."
  });

  console.log("Seed data inserted");
  process.exit(0);
};

seed();
