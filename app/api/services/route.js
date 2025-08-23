import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all services (public)
export async function GET(request) {
  try {
    console.log("GET /api/services - Starting request");

    // Add timeout to prevent hanging in serverless
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 25000)
    );

    const dbOperation = async () => {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const category = searchParams.get("category");

      let query = { isActive: true };
      if (category) query.category = category;

      const services = await Service.find(query).sort({ order: 1 });
      return services;
    };

    const services = await Promise.race([dbOperation(), timeoutPromise]);

    console.log(`GET /api/services - Found ${services.length} services`);
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("GET /api/services - Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new service (requires authentication)
export const POST = requireAuth(async function (request) {
  try {
    await connectDB();

    const body = await request.json();

    // Add audit trail
    body.createdBy = request.user.username;
    body.createdAt = new Date();

    const service = await Service.create(body);

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
