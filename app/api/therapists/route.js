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
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get("gender");
    const active = searchParams.get("active");
    const clearCache = searchParams.get("clearCache");

    // Force cache clear if requested
    if (clearCache === "true") {
      invalidateTherapistsCache();
    }

    // Check cache first
    const cachedData = therapistsCache.get();
    if (cachedData && !clearCache) {
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
      await connectDB();

      // Always fetch ALL therapists for caching, don't apply filters here
      const therapists = await Therapist.find({}).sort({ createdAt: -1 });
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

      return NextResponse.json(
        { success: true, data: filteredTherapists },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    } catch (dbError) {
      // Return fallback data if database fails
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
          images: ["/images/fallback-female.jpg"],
          description:
            "Professional massage therapist specializing in relaxation",
          specialties: ["Swedish Massage", "Hot Stone"],
          price: "₱2,500/session",
        },
        {
          _id: "fallback2",
          name: "Carlos",
          gender: "male",
          isActive: true,
          age: 28,
          location: "Metro Manila",
          experience: "4 years",
          rating: 4.9,
          reviews: 52,
          images: ["/images/fallback-male.jpg"],
          description: "Expert in deep tissue and sports massage therapy",
          specialties: ["Deep Tissue", "Sports Massage"],
          price: "₱2,800/session",
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
