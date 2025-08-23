import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all therapists or filter by gender (public)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const gender = searchParams.get("gender");
    const active = searchParams.get("active");

    let query = {};
    if (gender) query.gender = gender;
    if (active === "true") query.isActive = true;

    const therapists = await Therapist.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: therapists });
  } catch (error) {
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
