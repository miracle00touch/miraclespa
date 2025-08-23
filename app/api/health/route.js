import { NextResponse } from "next/server";

// Simple health check endpoint to verify the API is working
export async function GET() {
  try {
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      hasMongoUri: !!process.env.MONGODB_URI,
      version: "1.0.0",
      uptime: process.uptime(),
      performance: {
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
      },
    };

    console.log("Health check:", health);

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
