// Security Test Suite for Miracle Touch Spa Admin Panel
// Run with: node scripts/securityTest.js

const fetch = require("node-fetch");

const BASE_URL = "http://localhost:3000";
const API_BASE = `${BASE_URL}/api`;

let authToken = null;

// Test Results
const testResults = {
  passed: 0,
  failed: 0,
  tests: [],
};

function logTest(name, passed, message) {
  const status = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`${status}: ${name} - ${message}`);

  testResults.tests.push({ name, passed, message });
  if (passed) testResults.passed++;
  else testResults.failed++;
}

async function testUnauthorizedAccess() {
  console.log("\n🔒 Testing Unauthorized Access Protection...");

  const protectedEndpoints = [
    { method: "POST", url: "/services", body: { title: "Test Service" } },
    { method: "PUT", url: "/services/123", body: { title: "Updated Service" } },
    { method: "DELETE", url: "/services/123" },
    { method: "POST", url: "/therapists", body: { name: "Test Therapist" } },
    {
      method: "PUT",
      url: "/therapists/123",
      body: { name: "Updated Therapist" },
    },
    { method: "DELETE", url: "/therapists/123" },
    { method: "POST", url: "/contacts", body: { type: "phone" } },
    { method: "POST", url: "/upload", body: new FormData() },
  ];

  for (const endpoint of protectedEndpoints) {
    try {
      const options = {
        method: endpoint.method,
        headers: { "Content-Type": "application/json" },
      };

      if (endpoint.body && !(endpoint.body instanceof FormData)) {
        options.body = JSON.stringify(endpoint.body);
      }

      const response = await fetch(`${API_BASE}${endpoint.url}`, options);
      const isUnauthorized = response.status === 401;

      logTest(
        `${endpoint.method} ${endpoint.url}`,
        isUnauthorized,
        isUnauthorized
          ? "Correctly blocked unauthorized access"
          : `Expected 401, got ${response.status}`
      );
    } catch (error) {
      logTest(
        `${endpoint.method} ${endpoint.url}`,
        false,
        `Error: ${error.message}`
      );
    }
  }
}

async function testPublicAccess() {
  console.log("\n🌐 Testing Public Access Routes...");

  const publicEndpoints = ["/services", "/therapists", "/contacts"];

  for (const endpoint of publicEndpoints) {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      const isAccessible = response.status === 200;

      logTest(
        `GET ${endpoint}`,
        isAccessible,
        isAccessible
          ? "Public access working"
          : `Expected 200, got ${response.status}`
      );
    } catch (error) {
      logTest(`GET ${endpoint}`, false, `Error: ${error.message}`);
    }
  }
}

async function testLoginRateLimit() {
  console.log("\n🚫 Testing Login Rate Limiting...");

  const invalidCredentials = { username: "invalid", password: "invalid" };

  // Make 6 failed attempts to trigger rate limiting
  for (let i = 1; i <= 6; i++) {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidCredentials),
      });

      if (i <= 5) {
        const isUnauthorized = response.status === 401;
        logTest(
          `Failed login attempt ${i}`,
          isUnauthorized,
          isUnauthorized
            ? "Correctly rejected invalid credentials"
            : `Expected 401, got ${response.status}`
        );
      } else {
        const isRateLimited = response.status === 429;
        logTest(
          "Rate limiting after 5 failed attempts",
          isRateLimited,
          isRateLimited
            ? "Rate limiting working correctly"
            : `Expected 429, got ${response.status}`
        );
      }
    } catch (error) {
      logTest(`Failed login attempt ${i}`, false, `Error: ${error.message}`);
    }
  }
}

async function testValidLogin() {
  console.log("\n🔑 Testing Valid Login...");

  try {
    // Use default credentials for testing
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "miraclepassword" }),
    });

    const isSuccess = response.status === 200;
    const cookies = response.headers.get("set-cookie");
    const hasAuthCookie = cookies && cookies.includes("auth-token");

    logTest(
      "Valid login",
      isSuccess && hasAuthCookie,
      isSuccess && hasAuthCookie
        ? "Login successful with secure cookie"
        : `Login failed: ${response.status}`
    );

    if (hasAuthCookie) {
      // Extract token for authenticated tests
      const tokenMatch = cookies.match(/auth-token=([^;]+)/);
      if (tokenMatch) {
        authToken = tokenMatch[1];
      }
    }
  } catch (error) {
    logTest("Valid login", false, `Error: ${error.message}`);
  }
}

async function testAuthenticatedAccess() {
  console.log("\n🔐 Testing Authenticated Access...");

  if (!authToken) {
    logTest("Authenticated access", false, "No auth token available");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `auth-token=${authToken}`,
      },
      body: JSON.stringify({
        title: "Test Service",
        description: "Test Description",
        category: "test",
        isActive: true,
      }),
    });

    const isSuccess = response.status === 201;

    logTest(
      "Authenticated API access",
      isSuccess,
      isSuccess
        ? "Authenticated request successful"
        : `Expected 201, got ${response.status}`
    );
  } catch (error) {
    logTest("Authenticated API access", false, `Error: ${error.message}`);
  }
}

async function testAdminPageAccess() {
  console.log("\n📱 Testing Admin Page Access...");

  try {
    const response = await fetch(`${BASE_URL}/admin`);
    const isAccessible = response.status === 200;

    logTest(
      "Admin page load",
      isAccessible,
      isAccessible
        ? "Admin page loads correctly"
        : `Expected 200, got ${response.status}`
    );
  } catch (error) {
    logTest("Admin page load", false, `Error: ${error.message}`);
  }
}

async function runAllTests() {
  console.log("🔍 Starting Security Test Suite for Miracle Touch Spa\n");
  console.log("Testing server at:", BASE_URL);

  await testPublicAccess();
  await testUnauthorizedAccess();
  await testLoginRateLimit();

  // Wait a bit for rate limit to reset
  console.log("\n⏳ Waiting 2 seconds for rate limit reset...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await testValidLogin();
  await testAuthenticatedAccess();
  await testAdminPageAccess();

  // Summary
  console.log("\n📊 Test Summary:");
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📋 Total: ${testResults.tests.length}`);

  if (testResults.failed === 0) {
    console.log("\n🎉 All security tests PASSED! The admin panel is secure.");
  } else {
    console.log(
      "\n⚠️  Some tests FAILED. Please review the security implementation."
    );
    console.log("\nFailed tests:");
    testResults.tests
      .filter((test) => !test.passed)
      .forEach((test) => console.log(`  - ${test.name}: ${test.message}`));
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests };
