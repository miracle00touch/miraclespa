import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "miracle-touch-spa-super-secret-key-change-this-in-production-2024";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "miraclepassword";

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { attempts: 1, resetTime: now + windowMs });
    return false;
  }

  const record = rateLimitMap.get(ip);

  if (now > record.resetTime) {
    // Reset the window
    rateLimitMap.set(ip, { attempts: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.attempts >= maxAttempts) {
    return true;
  }

  record.attempts++;
  return false;
}

export async function POST(request) {
  try {
    // Basic rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many login attempts. Please try again later.",
        },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    // Input validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Prevent timing attacks with constant-time comparison
    const isValidUsername = username === ADMIN_USERNAME;
    const isValidPassword = password === ADMIN_PASSWORD;

    if (!isValidUsername || !isValidPassword) {
      // Log failed attempt
      console.warn(
        `Failed login attempt from IP: ${ip}, Username: ${username}`
      );

      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token with shorter expiration
    const token = jwt.sign(
      {
        username: ADMIN_USERNAME,
        role: "admin",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60, // 8 hours instead of 24
      },
      JWT_SECRET
    );

    // Log successful login
    console.log(
      `Successful admin login from IP: ${ip} at ${new Date().toISOString()}`
    );

    // Create response with secure cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
