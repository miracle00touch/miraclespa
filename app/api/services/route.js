import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET - Fetch all services (public)
export async function GET(request) {
  console.log("GET /api/services - Starting request");

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    console.log(`Query params: category=${category}`);

    // Try database with shorter timeout first
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), 15000)
    );

    const dbOperation = async () => {
      console.log("Attempting database connection...");
      await connectDB();
      console.log("Database connected, running query...");

      let query = { isActive: true };
      if (category) query.category = category;

      const services = await Service.find(query).sort({ order: 1 });
      console.log(
        `Database query successful, found ${services.length} services`
      );
      return services;
    };

    try {
      const services = await Promise.race([dbOperation(), timeoutPromise]);
      return NextResponse.json({ success: true, data: services });
    } catch (dbError) {
      console.error("Database operation failed:", dbError.message);

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

      console.log(`Returning ${filteredServices.length} fallback services`);
      return NextResponse.json({
        success: true,
        data: filteredServices,
        fallback: true,
        message: "Using fallback data due to database connectivity issues",
      });
    }
  } catch (error) {
    console.error("GET /api/services - Unexpected error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message, fallback: false },
      { status: 500 }
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

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
});
