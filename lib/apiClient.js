// lib/apiClient.js
"use client";

// Global request cache to prevent duplicate requests across components
const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Enhanced fetch with request deduplication and caching
 * @param {string} url - The API endpoint
 * @param {object} options - Fetch options
 * @param {number} cacheDuration - Cache duration in milliseconds
 * @returns {Promise} - Fetch response
 */
export async function apiRequest(
  url,
  options = {},
  cacheDuration = CACHE_DURATION
) {
  const cacheKey = `${url}${JSON.stringify(options)}`;
  const now = Date.now();

  // Check if we have a cached response
  const cached = requestCache.get(cacheKey);
  if (cached && now - cached.timestamp < cacheDuration) {
    console.log(`[ApiClient] Returning cached response for ${url}`);
    return cached.promise;
  }

  // Check if there's already a pending request for this URL
  if (cached && cached.promise) {
    console.log(`[ApiClient] Waiting for pending request ${url}`);
    return cached.promise;
  }

  // Create new request
  console.log(`[ApiClient] Making new request to ${url}`);

  const requestPromise = fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
      ...options.headers,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Update cache with successful response
      requestCache.set(cacheKey, {
        promise: Promise.resolve(data),
        timestamp: now,
        data: data,
      });

      return data;
    })
    .catch((error) => {
      // Remove failed request from cache
      requestCache.delete(cacheKey);
      throw error;
    });

  // Store pending request
  requestCache.set(cacheKey, {
    promise: requestPromise,
    timestamp: now,
  });

  return requestPromise;
}

/**
 * Clear specific cache entry
 * @param {string} url - The API endpoint to clear
 */
export function clearApiCache(url) {
  for (const [key] of requestCache) {
    if (key.startsWith(url)) {
      requestCache.delete(key);
    }
  }
}

/**
 * Clear all cache entries
 */
export function clearAllApiCache() {
  requestCache.clear();
}

/**
 * Staggered API calls to prevent cold start issues
 * @param {Array} apiCalls - Array of API call functions
 * @param {number} delay - Delay between calls in milliseconds
 */
export async function staggeredApiCalls(apiCalls, delay = 100) {
  const results = [];

  for (let i = 0; i < apiCalls.length; i++) {
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      const result = await apiCalls[i]();
      results.push(result);
    } catch (error) {
      console.error(`Staggered API call ${i} failed:`, error);
      results.push({ error: error.message });
    }
  }

  return results;
}
