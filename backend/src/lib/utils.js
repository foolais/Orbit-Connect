import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "24h",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV === "production",
  });
};
