import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { invalidateTherapistsCache } from "@/lib/cache";

// GET - Fetch a single therapist (public)
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const therapist = await Therapist.findById(id);

    if (!therapist) {
      return NextResponse.json(
        { success: false, error: "Therapist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: therapist });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update a therapist (requires authentication)
export const PUT = requireAuth(async function (request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Add audit trail
    body.lastModifiedBy = request.user.username;
    body.lastModifiedAt = new Date();

    const therapist = await Therapist.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!therapist) {
      return NextResponse.json(
        { success: false, error: "Therapist not found" },
        { status: 404 }
      );
    }

    // Invalidate cache after successful update
    invalidateTherapistsCache();

    return NextResponse.json({ success: true, data: therapist });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});

// DELETE - Delete a therapist (requires authentication)
export const DELETE = requireAuth(async function (request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const therapist = await Therapist.findByIdAndDelete(id);

    if (!therapist) {
      return NextResponse.json(
        { success: false, error: "Therapist not found" },
        { status: 404 }
      );
    }

    // Log the deletion
    console.log(
      `Therapist deleted by ${request.user.username}: ${therapist.name} (ID: ${id})`
    );

    // Invalidate cache after successful deletion
    invalidateTherapistsCache();

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
