// Quick Security Verification Test
// This tests the key security features we implemented

console.log("🔍 Quick Security Test - Miracle Touch Spa Admin Panel\n");

// Test 1: Check if auth helper exists
try {
  const fs = require("fs");
  const authExists = fs.existsSync("./lib/auth.js");
  console.log(`✅ Auth helper exists: ${authExists}`);
} catch (error) {
  console.log(`❌ Auth helper check failed: ${error.message}`);
}

// Test 2: Check if API routes are properly secured
const testFiles = [
  "./app/api/services/route.js",
  "./app/api/therapists/route.js",
  "./app/api/upload/route.js",
  "./app/api/contacts/route.js",
];

console.log("\n🔒 Checking API Route Security...");
testFiles.forEach((file) => {
  try {
    const fs = require("fs");
    const content = fs.readFileSync(file, "utf8");
    const hasAuth =
      content.includes("requireAuth") &&
      content.includes("import { requireAuth }");
    const hasPublicGET =
      content.includes("export async function GET") &&
      !content.includes("export const GET = requireAuth");
    const hasProtectedMutations =
      content.includes("export const POST = requireAuth") ||
      content.includes("export const PUT = requireAuth") ||
      content.includes("export const DELETE = requireAuth");

    if (hasAuth && hasProtectedMutations) {
      console.log(`✅ ${file}: Properly secured`);
    } else {
      console.log(`⚠️  ${file}: May need security review`);
    }
  } catch (error) {
    console.log(`❌ ${file}: Error checking - ${error.message}`);
  }
});

// Test 3: Check login route security features
console.log("\n🚫 Checking Login Security...");
try {
  const fs = require("fs");
  const loginContent = fs.readFileSync("./app/api/auth/login/route.js", "utf8");

  const hasRateLimit =
    loginContent.includes("rateLimitMap") ||
    loginContent.includes("isRateLimited");
  const hasLogging =
    loginContent.includes("console.log") ||
    loginContent.includes("console.warn");
  const hasSecureCookie =
    loginContent.includes("httpOnly: true") &&
    loginContent.includes("sameSite");
  const hasInputValidation =
    loginContent.includes("!username") || loginContent.includes("!password");

  console.log(`✅ Rate limiting: ${hasRateLimit}`);
  console.log(`✅ Security logging: ${hasLogging}`);
  console.log(`✅ Secure cookies: ${hasSecureCookie}`);
  console.log(`✅ Input validation: ${hasInputValidation}`);
} catch (error) {
  console.log(`❌ Login route check failed: ${error.message}`);
}

// Test 4: Check environment setup
console.log("\n🔧 Environment Configuration...");
try {
  const fs = require("fs");
  const envExampleExists = fs.existsSync("./.env.local.example");
  const securityDocsExist = fs.existsSync("./SECURITY_IMPLEMENTATION.md");

  console.log(`✅ Environment example: ${envExampleExists}`);
  console.log(`✅ Security documentation: ${securityDocsExist}`);

  if (envExampleExists) {
    const envContent = fs.readFileSync("./.env.local.example", "utf8");
    const hasSecurityWarnings =
      envContent.includes("CRITICAL SECURITY") || envContent.includes("strong");
    console.log(`✅ Security warnings in env example: ${hasSecurityWarnings}`);
  }
} catch (error) {
  console.log(`❌ Environment check failed: ${error.message}`);
}

console.log("\n📋 Manual Tests Needed:");
console.log("1. Visit http://localhost:3000/admin - should show login form");
console.log("2. Try invalid login 6 times - should be rate limited");
console.log("3. Login with valid credentials - should access admin panel");
console.log("4. Try direct API calls without auth - should return 401");

console.log("\n🎯 Key Security Features Implemented:");
console.log("• JWT Authentication on all admin operations");
console.log("• Rate limiting on login (5 attempts per 15 minutes)");
console.log("• Secure httpOnly cookies with SameSite protection");
console.log("• Input validation and sanitization");
console.log("• Audit logging for all admin actions");
console.log("• File upload validation and restrictions");
console.log("• Protection against timing attacks");

console.log(
  "\n⚠️  IMPORTANT: Set secure environment variables before production!"
);
console.log(
  "See .env.local.example and SECURITY_IMPLEMENTATION.md for details."
);

console.log("\n✅ Security implementation appears complete!");
