import mongoose from "mongoose";

// Note: don't throw at module import time so the app can start in environments
// without a MongoDB connection (eg. during static checks or when running
// frontend-only pages). The actual check is performed inside connectDB.

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Very aggressive timeouts for serverless to prevent 504s
    const opts = {
      bufferCommands: false,
      // Much shorter timeouts - fail fast rather than hang
      serverSelectionTimeoutMS: process.env.NODE_ENV === "development" ? 5000 : 10000,
      connectTimeoutMS: process.env.NODE_ENV === "development" ? 5000 : 10000,
      socketTimeoutMS: 45000, // Socket timeout
      heartbeatFrequencyMS: 10000, // Check connection health more frequently
      // Serverless optimizations
      maxPoolSize: 10,
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      // Additional reliability settings
      retryWrites: true,
      retryReads: true,
    };

    console.log("Attempting MongoDB connection with aggressive timeouts...");
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connection successful");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        cached.promise = null; // Reset promise on failure
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Failed to establish MongoDB connection:", e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
