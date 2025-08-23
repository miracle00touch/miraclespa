import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all therapists or filter by gender (public)
export async function GET(request) {
  try {
    console.log("GET /api/therapists - Starting request");

    // Add timeout to prevent hanging in serverless
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 25000)
    );

    const dbOperation = async () => {
      await connectDB();

      const { searchParams } = new URL(request.url);
      const gender = searchParams.get("gender");
      const active = searchParams.get("active");

      let query = {};
      if (gender) query.gender = gender;
      if (active === "true") query.isActive = true;

      const therapists = await Therapist.find(query).sort({ createdAt: -1 });
      return therapists;
    };

    const therapists = await Promise.race([dbOperation(), timeoutPromise]);

    console.log(`GET /api/therapists - Found ${therapists.length} therapists`);
    return NextResponse.json({ success: true, data: therapists });
  } catch (error) {
    console.error("GET /api/therapists - Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new therapist (requires authentication)
export const POST = requireAuth(async function (request) {
  try {
    await connectDB();

    const body = await request.json();

    // Add audit trail
    body.createdBy = request.user.username;
    body.createdAt = new Date();

    const therapist = await Therapist.create(body);

    return NextResponse.json(
      { success: true, data: therapist },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
