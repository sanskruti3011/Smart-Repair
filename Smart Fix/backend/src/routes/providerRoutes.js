import express from "express";
import {
  costValidation,
  getProviderNotifications,
  getProviderProfile,
  getProviderRequests,
  getProviders,
  proposeCost,
  requestActionValidation,
  respondToRequest,
  statusValidation,
  updateProviderProfile,
  updateRequestStatus
} from "../controllers/providerController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getProviders);
router.get("/directory", getProviders);
router.use(protect);
router.get("/me", authorize("provider"), getProviderProfile);
router.put("/me", authorize("provider"), updateProviderProfile);
router.get("/requests", authorize("provider"), getProviderRequests);
router.post("/requests/:id/action", authorize("provider"), requestActionValidation, validate, respondToRequest);
router.post("/requests/:id/cost", authorize("provider"), costValidation, validate, proposeCost);
router.patch("/requests/:id/status", authorize("provider"), statusValidation, validate, updateRequestStatus);
router.get("/notifications", authorize("provider"), getProviderNotifications);

export default router;
