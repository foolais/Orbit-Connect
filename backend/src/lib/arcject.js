import arcject, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const aj = arcject({
  key: ENV.ARCJECT_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
