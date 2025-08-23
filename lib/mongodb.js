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
    // Add short server selection timeouts for local/dev so requests fail fast
    // when MongoDB isn't running instead of indefinitely blocking API handlers.
    const opts = {
      bufferCommands: false,
      // Fail fast in dev (3s). In production rely on defaults or configure via env.
      serverSelectionTimeoutMS:
        process.env.NODE_ENV === "production" ? 30000 : 3000,
      connectTimeoutMS: process.env.NODE_ENV === "production" ? 30000 : 3000,
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
