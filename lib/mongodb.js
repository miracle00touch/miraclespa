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
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // Return existing connection immediately
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // Prevent too frequent connection attempts (rate limiting)
  const now = Date.now();
  if (now - cached.lastAttempt < 2000) { // Wait at least 2 seconds between attempts
    throw new Error("Connection attempt rate limited - too many requests");
  }

  // If already connecting, queue this request
  if (isConnecting) {
    console.log("Connection in progress, queueing request...");
    return new Promise((resolve, reject) => {
      connectionQueue.push({ resolve, reject });
      // Set timeout for queued requests
      setTimeout(() => {
        const index = connectionQueue.findIndex(item => item.resolve === resolve);
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
    
    // Very aggressive timeouts for serverless to prevent 504s
    const opts = {
      bufferCommands: false,
      // Much shorter timeouts - fail fast rather than hang
      serverSelectionTimeoutMS: 8000, // Reduced from 10000
      connectTimeoutMS: 8000, // Reduced from 10000
      socketTimeoutMS: 20000, // Reduced socket timeout
      heartbeatFrequencyMS: 10000,
      // Strict serverless optimizations
      maxPoolSize: 5, // Reduced from 10
      minPoolSize: 0,
      maxIdleTimeMS: 15000, // Reduced from 30000
      // Additional reliability settings
      retryWrites: true,
      retryReads: false, // Disable retry reads for faster failures
    };

    console.log(`Attempting MongoDB connection (attempt ${connectionRetries + 1}/${MAX_RETRIES})...`);

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
