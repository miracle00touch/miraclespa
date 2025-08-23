import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "Database connected successfully!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
