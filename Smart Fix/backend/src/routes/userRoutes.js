import express from "express";
import {
  getProfile,
  getUserNotifications,
  getUserRequests,
  markNotificationRead,
  profileValidation,
  reviewValidation,
  submitReview,
  updateProfile
} from "../controllers/userController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect, authorize("user", "admin"));
router.get("/profile", getProfile);
router.put("/profile", profileValidation, validate, updateProfile);
router.get("/requests", getUserRequests);
router.get("/notifications", getUserNotifications);
router.patch("/notifications/:id/read", markNotificationRead);
router.post("/reviews", reviewValidation, validate, submitReview);

export default router;
