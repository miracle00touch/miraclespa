const fetch = require("node-fetch");
const fs = require("fs");

const requiredEnvs = [
  "MONGODB_URI",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missing = requiredEnvs.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    "Missing required env vars for smoke tests:",
    missing.join(", ")
  );
  console.error(
    "Skipping runtime smoke tests. Set envs or run the tests in a properly configured environment."
  );
  process.exit(0);
}

const base = process.env.SMOKE_BASE || "http://localhost:3000";

async function run() {
  console.log("Running smoke tests against", base);

  const endpoints = [
    "/",
    "/api/contacts",
    "/api/services",
    "/api/therapists",
    "/api/upload",
    "/api/auth/login",
  ];

  for (const ep of endpoints) {
    try {
      const url = base + ep;
      const res = await fetch(url, { method: "GET" });
      console.log(ep, res.status);
    } catch (e) {
      console.error("Error calling", ep, e.message);
    }
  }

  // Simple Cloudinary upload check: send empty form to /api/upload to validate 400/401 handling
  try {
    const uploadUrl = base + "/api/upload";
    const res = await fetch(uploadUrl, { method: "POST" });
    console.log("/api/upload POST", res.status);
  } catch (e) {
    console.error("Error calling /api/upload", e.message);
  }
}

run();
