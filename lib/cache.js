// lib/cache.js
// Centralized cache management for API routes

// Global cache storage
const caches = new Map();

// Cache configuration
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const SHORT_TTL = 30 * 1000; // 30 seconds for admin operations

export class ApiCache {
  constructor(key, ttl = DEFAULT_TTL) {
    this.key = key;
    this.ttl = ttl;
  }

  get() {
    const cached = caches.get(this.key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.ttl) {
      caches.delete(this.key);
      return null;
    }

    return cached.data;
  }

  set(data) {
    caches.set(this.key, {
      data,
      timestamp: Date.now(),
    });
  }

  invalidate() {
    caches.delete(this.key);
    console.log(`Cache invalidated: ${this.key}`);
  }

  // Get cache info for debugging
  getInfo() {
    const cached = caches.get(this.key);
    if (!cached) return { exists: false };

    const age = Date.now() - cached.timestamp;
    return {
      exists: true,
      age,
      ttl: this.ttl,
      isExpired: age > this.ttl,
    };
  }
}

// Pre-configured cache instances
export const therapistsCache = new ApiCache("therapists");
export const servicesCache = new ApiCache("services");
export const contactsCache = new ApiCache("contacts");

// Admin-specific caches with shorter TTL
export const adminTherapistsCache = new ApiCache("admin-therapists", SHORT_TTL);
export const adminServicesCache = new ApiCache("admin-services", SHORT_TTL);
export const adminContactsCache = new ApiCache("admin-contacts", SHORT_TTL);

// Cache invalidation helpers
export function invalidateTherapistsCache() {
  therapistsCache.invalidate();
  adminTherapistsCache.invalidate();
}

export function invalidateServicesCache() {
  servicesCache.invalidate();
  adminServicesCache.invalidate();
}

export function invalidateContactsCache() {
  contactsCache.invalidate();
  adminContactsCache.invalidate();
}

export function invalidateAllCaches() {
  caches.clear();
  console.log("All caches invalidated");
}

// Get cache statistics
export function getCacheStats() {
  const stats = {};
  for (const [key, value] of caches.entries()) {
    const age = Date.now() - value.timestamp;
    stats[key] = {
      age,
      size: JSON.stringify(value.data).length,
    };
  }
  return stats;
}
