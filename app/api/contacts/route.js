import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all contacts (public - for displaying contact info)
export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find({ isActive: true }).sort({ order: 1 });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new contact (requires authentication)
export const POST = requireAuth(async function (request) {
  try {
    await connectDB();

    const body = await request.json();

    // Add audit trail
    body.createdBy = request.user.username;
    body.createdAt = new Date();

    const contact = await Contact.create(body);

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
