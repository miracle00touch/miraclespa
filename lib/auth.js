import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

export function verifyToken(request) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return { isValid: false, error: "No token provided" };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { isValid: true, user: decoded };
  } catch (error) {
    return { isValid: false, error: "Invalid token" };
  }
}

export function createAuthResponse(message, status = 401) {
  return NextResponse.json(
    { success: false, message, authenticated: false },
    { status }
  );
}

export function requireAuth(handler) {
  return async function (request, context) {
    const auth = verifyToken(request);

    if (!auth.isValid) {
      return createAuthResponse("Unauthorized access. Please login.");
    }

    // Add user to request for use in handler
    request.user = auth.user;
    return handler(request, context);
  };
}
