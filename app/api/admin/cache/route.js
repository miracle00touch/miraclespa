import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  invalidateAllCaches,
  invalidateTherapistsCache,
  invalidateServicesCache,
  invalidateContactsCache,
  getCacheStats,
} from "@/lib/cache";

// GET - Get cache statistics (admin only)
export const GET = requireAuth(async function (request) {
  try {
    const stats = getCacheStats();

    return NextResponse.json({
      success: true,
      data: {
        cacheStats: stats,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});

// DELETE - Clear caches (admin only)
export const DELETE = requireAuth(async function (request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let cleared = [];

    switch (type) {
      case "therapists":
        invalidateTherapistsCache();
        cleared.push("therapists");
        break;
      case "services":
        invalidateServicesCache();
        cleared.push("services");
        break;
      case "contacts":
        invalidateContactsCache();
        cleared.push("contacts");
        break;
      case "all":
      default:
        invalidateAllCaches();
        cleared.push("all");
        break;
    }

    console.log(
      `Cache cleared by ${request.user.username}: ${cleared.join(", ")}`
    );

    return NextResponse.json({
      success: true,
      data: {
        cleared,
        timestamp: new Date().toISOString(),
        clearedBy: request.user.username,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
