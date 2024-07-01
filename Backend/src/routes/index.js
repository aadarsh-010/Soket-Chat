import express from "express";
import ConversationRoutes from "./conversation.route.js";
import authRoutes from "./auth.route.js";
const router = express.Router();



router.use("/auth", authRoutes);
router.use("/conversation", ConversationRoutes);
export default router;