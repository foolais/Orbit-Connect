import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { pusherAuth } from "../controllers/pusher.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/auth", pusherAuth);

export default router;
