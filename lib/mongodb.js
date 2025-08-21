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
    // Optimized settings for serverless environments (Vercel, etc.)
    const opts = {
      bufferCommands: false,
      // Use longer timeouts for serverless cold starts but reasonable for local dev
      serverSelectionTimeoutMS: process.env.NODE_ENV === "development" ? 5000 : 60000,
      connectTimeoutMS: process.env.NODE_ENV === "development" ? 5000 : 60000,
      // Additional serverless optimizations
      maxPoolSize: 10, // Limit connection pool for serverless
      minPoolSize: 0,  // No minimum connections in serverless
      maxIdleTimeMS: 30000, // Close connections after 30s idle
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
