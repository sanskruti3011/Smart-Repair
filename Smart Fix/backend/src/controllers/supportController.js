import { body } from "express-validator";
import SupportTicket from "../models/SupportTicket.js";

export const supportValidation = [body("subject").notEmpty(), body("description").notEmpty()];

export const createTicket = async (req, res) => {
  const ticket = await SupportTicket.create({
    createdByType: req.auth.role === "provider" ? "provider" : "user",
    createdById: req.auth.entity._id,
    subject: req.body.subject,
    description: req.body.description
  });

  res.status(201).json(ticket);
};

export const getMyTickets = async (req, res) => {
  const tickets = await SupportTicket.find({ createdById: req.auth.entity._id }).sort({ createdAt: -1 });
  res.json(tickets);
};
