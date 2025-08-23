import connectDB from "@/lib/mongodb";
import Therapist from "@/models/Therapist";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { therapistsCache, invalidateTherapistsCache } from "@/lib/cache";

// Request deduplication
let pendingPromise = null;
const CACHE_CONTROL_HEADER = "public, s-maxage=300, stale-while-revalidate=60";

// GET - Fetch all therapists or filter by gender (public)
export async function GET(request) {
  const requestId = Math.random().toString(36).substr(2, 9);
  console.log(`GET /api/therapists [${requestId}] - Starting request`);

  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get("gender");
    const active = searchParams.get("active");

    console.log(
      `[${requestId}] Query params: gender=${gender}, active=${active}`
    );

    // Check cache first
    const cachedData = therapistsCache.get();
    if (cachedData) {
      const cacheInfo = therapistsCache.getInfo();
      console.log(
        `[${requestId}] Returning cached therapists (age=${cacheInfo.age}ms)`
      );

      let filteredTherapists = cachedData;
      if (gender)
        filteredTherapists = filteredTherapists.filter(
          (t) => t.gender === gender
        );
      if (active === "true")
        filteredTherapists = filteredTherapists.filter(
          (t) => t.isActive === true
        );

      return NextResponse.json(
        { success: true, data: filteredTherapists, cached: true },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }

    // If a request is already in flight, wait for it (dedupe)
    if (pendingPromise) {
      console.log(`[${requestId}] Waiting for pending request`);
      const result = await pendingPromise;
      let filteredResult = result;
      if (gender)
        filteredResult = filteredResult.filter((t) => t.gender === gender);
      if (active === "true")
        filteredResult = filteredResult.filter((t) => t.isActive === true);

      return NextResponse.json(
        { success: true, data: filteredResult },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }

    // Add small random delay to stagger simultaneous requests
    const delay = Math.random() * 700; // 0-0.7 second
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Try database with shorter timeout first
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 12000)
    );

    const dbOperation = async () => {
      console.log(`[${requestId}] Attempting database connection...`);
      console.log(`[${requestId}] Environment check:`, {
        hasMongoUri: !!process.env.MONGODB_URI,
        nodeEnv: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL,
      });

      await connectDB();
      console.log(
        `[${requestId}] Database connected successfully, running query...`
      );

      let query = {};
      if (gender) query.gender = gender;
      if (active === "true") query.isActive = true;

      console.log(`[${requestId}] Query filter:`, query);

      const therapists = await Therapist.find(query).sort({ createdAt: -1 });
      console.log(
        `[${requestId}] Database query successful, found ${therapists.length} therapists`
      );
      return therapists;
    };

    // Store the pending promise to dedupe concurrent requests
    pendingPromise = (async () => {
      try {
        const therapists = await Promise.race([dbOperation(), timeoutPromise]);
        // Cache the full result
        therapistsCache.set(therapists);
        return therapists;
      } finally {
        pendingPromise = null;
      }
    })();

    try {
      const therapists = await pendingPromise;

      // Filter based on query params
      let filteredTherapists = therapists;
      if (gender)
        filteredTherapists = filteredTherapists.filter(
          (t) => t.gender === gender
        );
      if (active === "true")
        filteredTherapists = filteredTherapists.filter(
          (t) => t.isActive === true
        );

      console.log(`[${requestId}] Returning database results`);
      return NextResponse.json(
        { success: true, data: filteredTherapists },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    } catch (dbError) {
      console.error(`[${requestId}] Database operation failed:`, {
        error: dbError.message,
        code: dbError.code,
        name: dbError.name,
        stack: dbError.stack?.split("\n").slice(0, 3).join("\n"), // First 3 lines of stack
      });

      // Return fallback data if database fails
      console.log(`[${requestId}] Using fallback data due to database error`);
      const fallbackTherapists = [
        {
          _id: "fallback1",
          name: "Maria",
          gender: "female",
          isActive: true,
          age: 25,
          location: "Metro Manila",
          experience: "3 years",
          rating: 4.8,
          reviews: 45,
          specialties: ["Swedish Massage", "Deep Tissue"],
          images: [
            "https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg",
          ],
          description:
            "Experienced therapist specializing in relaxation techniques.",
          languages: ["English", "Filipino"],
          availability: ["morning", "afternoon", "evening"],
          hourlyRate: 2500,
        },
        {
          _id: "fallback2",
          name: "Sofia",
          gender: "female",
          isActive: true,
          age: 28,
          location: "Metro Manila",
          experience: "5 years",
          rating: 4.9,
          reviews: 62,
          specialties: ["Aromatherapy", "Hot Stone"],
          images: [
            "https://images.pexels.com/photos/3757948/pexels-photo-3757948.jpeg",
          ],
          description: "Expert in therapeutic and wellness massage.",
          languages: ["English", "Filipino"],
          availability: ["afternoon", "evening"],
          hourlyRate: 3000,
        },
        {
          _id: "fallback3",
          name: "Carlos",
          gender: "male",
          isActive: true,
          age: 30,
          location: "Metro Manila",
          experience: "4 years",
          rating: 4.7,
          reviews: 38,
          specialties: ["Sports Massage", "Deep Tissue"],
          images: [
            "https://images.pexels.com/photos/6560289/pexels-photo-6560289.jpeg",
          ],
          description:
            "Professional male therapist specializing in sports and therapeutic massage.",
          languages: ["English", "Filipino"],
          availability: ["evening", "night"],
          hourlyRate: 2800,
        },
      ];

      // Filter fallback data based on query params
      let filteredTherapists = fallbackTherapists;
      if (gender) {
        filteredTherapists = filteredTherapists.filter(
          (t) => t.gender === gender
        );
      }
      if (active === "true") {
        filteredTherapists = filteredTherapists.filter(
          (t) => t.isActive === true
        );
      }

      // Cache fallback data temporarily
      therapistsCache.set(fallbackTherapists);

      console.log(
        `[${requestId}] Returning ${filteredTherapists.length} fallback therapists`
      );
      return NextResponse.json(
        {
          success: true,
          data: filteredTherapists,
          fallback: true,
          message: "Using fallback data due to database connectivity issues",
        },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }
  } catch (error) {
    console.error(
      `[${requestId}] GET /api/therapists - Unexpected error:`,
      error.message
    );
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: { "Cache-Control": "no-store" } }
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

    // Clear cache when new therapist is added
    // Invalidate cache after successful creation
    invalidateTherapistsCache();

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
