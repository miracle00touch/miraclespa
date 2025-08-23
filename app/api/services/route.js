import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// Per-instance cache to avoid hitting DB on repeated requests
let cachedServices = null;
let cacheTs = 0;
let pendingPromise = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_CONTROL_HEADER = "public, s-maxage=300, stale-while-revalidate=60";

// GET - Fetch all services (public)
export async function GET(request) {
  const requestId = Math.random().toString(36).substr(2, 9);
  console.log(`GET /api/services [${requestId}] - Starting request`);

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    console.log(`[${requestId}] Query params: category=${category}`);

    // Check cache first (with category consideration)
    const cacheKey = category ? `services_${category}` : 'services_all';
    const now = Date.now();
    if (cachedServices && cachedServices.key === cacheKey && now - cacheTs < CACHE_TTL) {
      console.log(`[${requestId}] Returning cached services (age=${now - cacheTs}ms)`);
      return NextResponse.json(
        { success: true, data: cachedServices.data, cached: true },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }

    // If a request is already in flight, wait for it (dedupe)
    if (pendingPromise) {
      console.log(`[${requestId}] Waiting for pending request`);
      const result = await pendingPromise;
      // Filter result if needed
      let filteredResult = result;
      if (category) {
        filteredResult = result.filter(s => s.category === category);
      }
      return NextResponse.json(
        { success: true, data: filteredResult },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }

    // Add small random delay to stagger simultaneous requests
    const delay = Math.random() * 500; // 0-0.5 second
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Try database with shorter timeout first
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 12000)
    );

    const dbOperation = async () => {
      console.log(`[${requestId}] Attempting database connection...`);
      await connectDB();
      console.log(`[${requestId}] Database connected, running query...`);

      let query = { isActive: true };
      if (category) query.category = category;

      const services = await Service.find(query).sort({ order: 1 });
      console.log(`[${requestId}] Database query successful, found ${services.length} services`);
      return services;
    };

    // Store the pending promise to dedupe concurrent requests
    pendingPromise = (async () => {
      try {
        const services = await Promise.race([dbOperation(), timeoutPromise]);
        // Cache the full result
        cachedServices = { key: 'services_all', data: services };
        cacheTs = Date.now();
        return services;
      } finally {
        pendingPromise = null;
      }
    })();

    try {
      const services = await pendingPromise;
      
      // Filter if category is specified
      let filteredServices = services;
      if (category) {
        filteredServices = services.filter(s => s.category === category);
      }
      
      return NextResponse.json(
        { success: true, data: filteredServices },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    } catch (dbError) {
      console.error(`[${requestId}] Database operation failed:`, dbError.message);

      // Return fallback service data
      const fallbackServices = [
        {
          _id: "fallback1",
          name: "Swedish Massage",
          description:
            "A relaxing full-body massage using gentle, flowing strokes to ease tension and promote relaxation.",
          duration: "60-90 minutes",
          price: "₱2,500 - ₱3,500",
          category: "relaxation",
          isActive: true,
          order: 1,
          image:
            "https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg",
        },
        {
          _id: "fallback2",
          name: "Deep Tissue Massage",
          description:
            "Therapeutic massage targeting deeper muscle layers to relieve chronic tension and muscle knots.",
          duration: "60-90 minutes",
          price: "₱3,000 - ₱4,000",
          category: "therapeutic",
          isActive: true,
          order: 2,
          image:
            "https://images.pexels.com/photos/3757948/pexels-photo-3757948.jpeg",
        },
        {
          _id: "fallback3",
          name: "Sensual Massage",
          description:
            "Intimate massage designed for couples to enhance relaxation and connection in a private setting.",
          duration: "60-120 minutes",
          price: "₱3,500 - ₱5,000",
          category: "couple",
          isActive: true,
          order: 3,
          image:
            "https://images.pexels.com/photos/6560289/pexels-photo-6560289.jpeg",
        },
      ];

      // Filter fallback data based on query params
      let filteredServices = fallbackServices;
      if (category) {
        filteredServices = filteredServices.filter(
          (s) => s.category === category
        );
      }

      // Cache fallback data temporarily
      cachedServices = { key: 'services_all', data: fallbackServices };
      cacheTs = Date.now();

      console.log(`[${requestId}] Returning ${filteredServices.length} fallback services`);
      return NextResponse.json(
        {
          success: true,
          data: filteredServices,
          fallback: true,
          message: "Using fallback data due to database connectivity issues",
        },
        { headers: { "Cache-Control": CACHE_CONTROL_HEADER } }
      );
    }
  } catch (error) {
    console.error(`GET /api/services [${requestId}] - Unexpected error:`, error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

// POST - Create a new service (requires authentication)
export const POST = requireAuth(async function (request) {
  try {
    await connectDB();

    const body = await request.json();

    // Add audit trail
    body.createdBy = request.user.username;
    body.createdAt = new Date();

    const service = await Service.create(body);

    // Clear cache when new service is added
    cachedServices = null;
    cacheTs = 0;

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
