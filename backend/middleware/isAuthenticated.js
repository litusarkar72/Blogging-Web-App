import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY is missing");
      return res.status(500).json({ success: false, message: "Server authentication is not configured" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired session" });
  }
};
