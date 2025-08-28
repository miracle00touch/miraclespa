import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { invalidateContactsCache } from "@/lib/cache";

// For contacts we do NOT keep per-instance caching — always return fresh data
const CACHE_CONTROL_HEADER = "no-store";

// GET - Fetch all contacts (public - for displaying contact info, admin - for management)
export async function GET(request) {
  try {
    // Check if this is an admin request
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    // Add small random delay to stagger simultaneous requests
    const delay = Math.random() * 800; // 0-0.8 second
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Try database with shorter timeout first
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 12000)
    );

    const dbOperation = async () => {
      await connectDB();

      // For admin, return all contacts; for public, only active ones
      const filter = isAdmin ? {} : { isActive: true };
      const contacts = await Contact.find(filter).sort({
        order: 1,
      });
      return contacts;
    };

    try {
      const contacts = await Promise.race([dbOperation(), timeoutPromise]);
      // store in per-instance cache
      return NextResponse.json(
        { success: true, data: contacts },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    } catch (dbError) {
      // Return fallback contact data on DB error
      const fallbackContacts = [
        {
          _id: "fallback1",
          type: "phone",
          value: "+63 927 473 6260",
          label: "WhatsApp / Call",
          isActive: true,
          order: 1,
          icon: "phone",
        },
        {
          _id: "fallback2",
          type: "facebook",
          value: "https://facebook.com/miracletouchspa",
          label: "Facebook Messenger",
          isActive: true,
          order: 2,
          icon: "facebook",
        },
      ];

      return NextResponse.json(
        {
          success: true,
          data: fallbackContacts,
          fallback: true,
          message: "Using fallback data due to database connectivity issues",
        },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message, fallback: false },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

// POST - Create a new contact (requires authentication)
export const POST = requireAuth(async function (request) {
  try {
    await connectDB();

    const body = await request.json();

    // If creating an active phone or whatsapp, ensure it's the only active one
    if (body.isActive && (body.type === "phone" || body.type === "whatsapp")) {
      await Contact.updateMany(
        { type: body.type },
        { $set: { isActive: false } }
      );
    }

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
