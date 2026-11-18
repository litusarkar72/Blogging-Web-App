import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from environment variables");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    }).then((connection) => {
      console.log("MongoDB connected successfully");
      return connection;
    }).catch((error) => {
      connectionPromise = null;
      console.error("MongoDB connection error:", error.message);
      throw error;
    });
  }

  return connectionPromise;
};

export default connectDB;
