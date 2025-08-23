import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all therapists or filter by gender (public)
export async function GET(request) {
  console.log("GET /api/therapists - Starting request");
  
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get("gender");
    const active = searchParams.get("active");

    console.log(`Query params: gender=${gender}, active=${active}`);

    // Try database with shorter timeout first
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 15000)
    );

    const dbOperation = async () => {
      console.log("Attempting database connection...");
      await connectDB();
      console.log("Database connected, running query...");

      let query = {};
      if (gender) query.gender = gender;
      if (active === "true") query.isActive = true;

      const therapists = await Therapist.find(query).sort({ createdAt: -1 });
      console.log(`Database query successful, found ${therapists.length} therapists`);
      return therapists;
    };

    try {
      const therapists = await Promise.race([dbOperation(), timeoutPromise]);
      return NextResponse.json({ success: true, data: therapists });
    } catch (dbError) {
      console.error("Database operation failed:", dbError.message);
      
      // Return fallback data if database fails
      const fallbackTherapists = [
        {
          _id: "fallback1",
          name: "Maria",
          gender: "female",
          isActive: true,
          specialties: ["Swedish Massage", "Deep Tissue"],
          image: "https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg",
          description: "Experienced therapist specializing in relaxation techniques."
        },
        {
          _id: "fallback2", 
          name: "Sofia",
          gender: "female",
          isActive: true,
          specialties: ["Aromatherapy", "Hot Stone"],
          image: "https://images.pexels.com/photos/3757948/pexels-photo-3757948.jpeg",
          description: "Expert in therapeutic and wellness massage."
        }
      ];

      // Filter fallback data based on query params
      let filteredTherapists = fallbackTherapists;
      if (gender) {
        filteredTherapists = filteredTherapists.filter(t => t.gender === gender);
      }
      if (active === "true") {
        filteredTherapists = filteredTherapists.filter(t => t.isActive === true);
      }

      console.log(`Returning ${filteredTherapists.length} fallback therapists`);
      return NextResponse.json({ 
        success: true, 
        data: filteredTherapists,
        fallback: true,
        message: "Using fallback data due to database connectivity issues"
      });
    }
  } catch (error) {
    console.error("GET /api/therapists - Unexpected error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message, fallback: false },
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
