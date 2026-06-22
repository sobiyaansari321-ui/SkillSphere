import express from "express";
import { sendRequest , getMyRequests ,acceptRequest , rejectRequest } from "../controllers/requestController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send/:projectId", protect , sendRequest);
router.get("/my-requests", protect , getMyRequests);
router.put("/:id/accept", protect , acceptRequest);
router.put("/:id/reject", protect , rejectRequest);

export default router