import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

// Enhanced health check endpoint to verify API and database connectivity
export async function GET() {
  try {
    const startTime = Date.now();
    let dbStatus = "unknown";
    let dbError = null;
    let dbConnectionTime = null;

    // Test database connectivity
    try {
      const dbStart = Date.now();
      const mongoose = await connectDB();
      dbConnectionTime = Date.now() - dbStart;
      
      // Check connection state properly - mongoose.connection.readyState
      const connectionState = mongoose.connection.readyState;
      dbStatus = connectionState === 1 ? "connected" : "disconnected";
      
      console.log(`Database connection test: ${dbStatus} (${dbConnectionTime}ms), readyState: ${connectionState}`);
    } catch (error) {
      dbStatus = "error";
      dbError = error.message;
      console.error("Database connection test failed:", error.message);
    }

    const health = {
      status: dbStatus === "connected" ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      isVercel: !!process.env.VERCEL,
      database: {
        status: dbStatus,
        connectionTime: dbConnectionTime,
        error: dbError,
        hasMongoUri: !!process.env.MONGODB_URI,
      },
      api: {
        responseTime: Date.now() - startTime,
        version: "1.0.0",
        uptime: process.uptime(),
      },
      performance: {
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
      },
    };

    console.log("Health check result:", {
      status: health.status,
      dbStatus: health.database.status,
      responseTime: health.api.responseTime,
    });

    return NextResponse.json(health, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "x-health-check": "true",
      },
    });
  } catch (error) {
    console.error("Health check error:", error.message);
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
