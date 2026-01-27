import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import pusherRoutes from "./routes/pusher.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

const allowedOrigins = [ENV.CLIENT_URL];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/pusher", pusherRoutes);

connectDB();

export default app;
