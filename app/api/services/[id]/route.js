import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// PUT - Update a service (requires authentication)
export const PUT = requireAuth(async function (request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Add audit trail
    body.lastModifiedBy = request.user.username;
    body.lastModifiedAt = new Date();

    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});

// DELETE - Delete a service (requires authentication)
export const DELETE = requireAuth(async function (request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    // Log the deletion
    console.log(
      `Service deleted by ${request.user.username}: ${service.title} (ID: ${id})`
    );

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
