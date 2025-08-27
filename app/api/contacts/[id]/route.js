import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { invalidateContactsCache } from "@/lib/cache";

// PUT - Update a contact
export const PUT = requireAuth(async function (request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    // If setting a phone or whatsapp to active, ensure it's the only active one
    if (body.isActive && (body.type === "phone" || body.type === "whatsapp")) {
      await Contact.updateMany(
        { type: body.type, _id: { $ne: id } },
        { $set: { isActive: false } }
      );
    }
    // Add audit trail
    body.lastModifiedBy = request.user?.username || "unknown";
    body.lastModifiedAt = new Date();
    const contact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    // Invalidate contacts cache so clients see the update immediately
    try {
      invalidateContactsCache();
    } catch (e) {
      console.warn("Failed to invalidate contacts cache:", e);
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});

// DELETE - Delete a contact
export const DELETE = requireAuth(async function (request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    // Invalidate contacts cache so clients see the deletion immediately
    try {
      invalidateContactsCache();
    } catch (e) {
      console.warn("Failed to invalidate contacts cache:", e);
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
