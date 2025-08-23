import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "miracle-touch-spa-super-secret-key-change-this-in-production-2024";

export async function GET(request) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: "No token provided" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return NextResponse.json(
        {
          authenticated: true,
          user: {
            username: decoded.username,
            role: decoded.role,
          },
        },
        { status: 200 }
      );
    } catch (jwtError) {
      return NextResponse.json(
        { authenticated: false, error: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
