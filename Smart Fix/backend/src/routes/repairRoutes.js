import express from "express";
import {
  cancelRepairRequest,
  confirmPriceUpdate,
  confirmPriceValidation,
  createRepairRequest,
  createRepairValidation,
  getRepairRequestById
} from "../controllers/repairController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect);
router.post("/", authorize("user", "admin"), upload.single("image"), createRepairValidation, validate, createRepairRequest);
router.get("/:id", getRepairRequestById);
router.post("/:id/confirm-price", authorize("user", "admin"), confirmPriceValidation, validate, confirmPriceUpdate);
router.patch("/:id/cancel", authorize("user", "admin"), cancelRepairRequest);

export default router;
