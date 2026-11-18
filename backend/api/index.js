import app from "../server.js";
import connectDB from "../database/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("API initialization failed:", error);
    return res.status(500).json({
      success: false,
      message: "API initialization failed. Check server environment variables and database access.",
    });
  }
}
