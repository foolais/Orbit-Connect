import aj from "../lib/arcject.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjectProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too Many Requests" });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Spoofed Bot Detected" });
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
