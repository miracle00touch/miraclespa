import mongoose from "mongoose";

// Connection queue to prevent multiple simultaneous connections
let connectionQueue = [];
let isConnecting = false;
let connectionRetries = 0;
const MAX_RETRIES = 3;

// Note: don't throw at module import time so the app can start in environments
// without a MongoDB connection (eg. during static checks or when running
// frontend-only pages). The actual check is performed inside connectDB.

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, lastAttempt: 0 };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not defined");
    throw new Error(
      "Please define the MONGODB_URI environment variable in your deployment environment"
    );
  }

  // Log environment for debugging (without exposing sensitive data)
  console.log("MongoDB connection attempt:", {
    hasUri: !!MONGODB_URI,
    environment: process.env.NODE_ENV || "development",
    isVercel: !!process.env.VERCEL,
    connectionState: cached.conn?.readyState,
  });

  // Return existing connection immediately
  if (cached.conn && cached.conn.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  // Prevent too frequent connection attempts (rate limiting)
  const now = Date.now();
  if (now - cached.lastAttempt < 500) {
    // Reduced to 500ms for better responsiveness
    console.log("Connection attempt rate limited");
    throw new Error("Connection attempt rate limited - too many requests");
  }

  // If already connecting, queue this request
  if (isConnecting) {
    console.log("Connection in progress, queueing request...");
    return new Promise((resolve, reject) => {
      connectionQueue.push({ resolve, reject });
      // Set timeout for queued requests
      setTimeout(() => {
        const index = connectionQueue.findIndex(
          (item) => item.resolve === resolve
        );
        if (index > -1) {
          connectionQueue.splice(index, 1);
          reject(new Error("Queued connection request timeout"));
        }
      }, 10000);
    });
  }

  if (!cached.promise) {
    isConnecting = true;
    cached.lastAttempt = now;

    // Serverless-optimized timeouts
    const opts = {
      bufferCommands: false,
      // More aggressive timeouts for Vercel serverless
      serverSelectionTimeoutMS: 5000, // Reduced from 8000 for faster failures
      connectTimeoutMS: 5000, // Reduced from 8000
      socketTimeoutMS: 15000, // Reduced socket timeout for serverless
      heartbeatFrequencyMS: 30000, // Less frequent heartbeats
      // Strict serverless optimizations
      maxPoolSize: 3, // Reduced from 5 for serverless
      minPoolSize: 0, // No minimum connections
      maxIdleTimeMS: 10000, // Reduced from 15000 for faster cleanup
      // Additional reliability settings
      retryWrites: true,
      retryReads: false, // Disable retry reads for faster failures
      // Serverless-specific optimizations
      compressors: ["zlib"], // Enable compression
      readPreference: "primary", // Force primary reads for consistency
    };

    console.log(
      `Attempting MongoDB connection (attempt ${
        connectionRetries + 1
      }/${MAX_RETRIES})...`
    );

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connection successful");
        isConnecting = false;
        connectionRetries = 0;

        // Resolve all queued requests
        connectionQueue.forEach(({ resolve }) => resolve(mongoose));
        connectionQueue = [];

        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        isConnecting = false;
        cached.promise = null;
        connectionRetries++;

        // Reject all queued requests
        connectionQueue.forEach(({ reject }) => reject(error));
        connectionQueue = [];

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
