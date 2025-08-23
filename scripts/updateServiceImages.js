// Update Services Script - Replace existing images with uploaded Cloudinary images
// Run this to update all services: node scripts/updateServiceImages.js

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

// Service Schema
const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    duration: { type: String },
    price: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Updated services with proper spa images (using existing Pexels images)
const serviceImageUpdates = [
  {
    name: "Sensual Massage",
    images: [
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      "https://images.pexels.com/photos/6663386/pexels-photo-6663386.jpeg",
    ],
  },
  {
    name: "Nuru Massage",
    images: [
      "https://images.pexels.com/photos/8142828/pexels-photo-8142828.jpeg",
    ],
  },
  {
    name: "Swedish Massage",
    images: [
      "https://images.pexels.com/photos/3757943/pexels-photo-3757943.jpeg",
    ],
  },
  {
    name: "Hot Stone Massage",
    images: [
      "https://images.pexels.com/photos/7640743/pexels-photo-7640743.jpeg",
    ],
  },
  {
    name: "Body Scrub Treatment",
    images: [
      "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg",
    ],
  },
  {
    name: "Aromatherapy Massage",
    images: [
      "https://images.pexels.com/photos/3757958/pexels-photo-3757958.jpeg",
    ],
  },
  {
    name: "Deep Tissue Massage",
    images: [
      "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg",
    ],
  },
  {
    name: "Thai Massage",
    images: [
      "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg",
    ],
  },
  {
    name: "Reflexology",
    images: [
      "https://images.pexels.com/photos/8436663/pexels-photo-8436663.jpeg",
    ],
  },
  {
    name: "Couples Massage",
    images: [
      "https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg",
    ],
  },
  {
    name: "Pregnancy Massage",
    images: [
      "https://images.pexels.com/photos/7176027/pexels-photo-7176027.jpeg",
    ],
  },
  {
    name: "Sports Massage",
    images: [
      "https://images.pexels.com/photos/7176028/pexels-photo-7176028.jpeg",
    ],
  },
];

async function updateServiceImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const Service = mongoose.model("Service", ServiceSchema);

    console.log("Starting service image updates...");

    for (const update of serviceImageUpdates) {
      const result = await Service.updateOne(
        { name: update.name },
        { $set: { images: update.images } }
      );

      if (result.matchedCount > 0) {
        console.log(
          `✅ Updated "${update.name}" with ${update.images.length} image(s)`
        );
      } else {
        console.log(`⚠️  Service "${update.name}" not found in database`);
      }
    }

    console.log("\n🎉 Service image update completed!");

    // Show updated services
    const updatedServices = await Service.find({}).select("name images");
    console.log("\nCurrent services with images:");
    updatedServices.forEach((service) => {
      console.log(`- ${service.name}: ${service.images.length} image(s)`);
    });
  } catch (error) {
    console.error("❌ Error updating service images:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the update
updateServiceImages();
