import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all contacts (public - for displaying contact info)
export async function GET() {
  try {
    console.log("GET /api/contacts - Starting request");

    // Add timeout to prevent hanging in serverless
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 25000)
    );

    const dbOperation = async () => {
      await connectDB();
      const contacts = await Contact.find({ isActive: true }).sort({
        order: 1,
      });
      return contacts;
    };

    const contacts = await Promise.race([dbOperation(), timeoutPromise]);

    console.log(`GET /api/contacts - Found ${contacts.length} contacts`);
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("GET /api/contacts - Error:", error.message);
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
