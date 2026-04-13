import express from "express";
import { createTicket, getMyTickets, supportValidation } from "../controllers/supportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect);
router.post("/", supportValidation, validate, createTicket);
router.get("/mine", getMyTickets);

export default router;
