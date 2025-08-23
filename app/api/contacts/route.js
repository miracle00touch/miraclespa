import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all contacts (public - for displaying contact info)
export async function GET() {
  console.log("GET /api/contacts - Starting request");
  
  try {
    // Try database with shorter timeout first
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 15000)
    );

    const dbOperation = async () => {
      console.log("Attempting database connection...");
      await connectDB();
      console.log("Database connected, running query...");
      
      const contacts = await Contact.find({ isActive: true }).sort({
        order: 1,
      });
      console.log(`Database query successful, found ${contacts.length} contacts`);
      return contacts;
    };

    try {
      const contacts = await Promise.race([dbOperation(), timeoutPromise]);
      return NextResponse.json({ success: true, data: contacts });
    } catch (dbError) {
      console.error("Database operation failed:", dbError.message);
      
      // Return fallback contact data
      const fallbackContacts = [
        {
          _id: "fallback1",
          type: "phone",
          value: "+63 927 473 6260",
          label: "WhatsApp / Call",
          isActive: true,
          order: 1,
          icon: "phone"
        },
        {
          _id: "fallback2",
          type: "facebook",
          value: "https://facebook.com/miracletouchspa",
          label: "Facebook Messenger",
          isActive: true,
          order: 2,
          icon: "facebook"
        }
      ];

      console.log(`Returning ${fallbackContacts.length} fallback contacts`);
      return NextResponse.json({ 
        success: true, 
        data: fallbackContacts,
        fallback: true,
        message: "Using fallback data due to database connectivity issues"
      });
    }
  } catch (error) {
    console.error("GET /api/contacts - Unexpected error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message, fallback: false },
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
