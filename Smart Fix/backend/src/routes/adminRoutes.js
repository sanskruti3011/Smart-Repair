import express from "express";
import {
  getAllRequests,
  getDashboardAnalytics,
  getProvidersAdmin,
  getSupportTickets,
  getUsers,
  resolveTicket
} from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));
router.get("/analytics", getDashboardAnalytics);
router.get("/users", getUsers);
router.get("/providers", getProvidersAdmin);
router.get("/requests", getAllRequests);
router.get("/tickets", getSupportTickets);
router.patch("/tickets/:id", resolveTicket);

export default router;
