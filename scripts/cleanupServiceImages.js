// Clean up any remaining invalid images and add fallbacks
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

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

async function cleanupServiceImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const Service = mongoose.model("Service", ServiceSchema);

    // Default spa image for services without images
    const defaultSpaImage =
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg";

    // Find services without images or with empty images array
    const servicesWithoutImages = await Service.find({
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } },
        { images: null },
      ],
    });

    console.log(
      `Found ${servicesWithoutImages.length} services without images`
    );

    for (const service of servicesWithoutImages) {
      await Service.updateOne(
        { _id: service._id },
        { $set: { images: [defaultSpaImage] } }
      );
      console.log(`✅ Added default image to "${service.name}"`);
    }

    // Check for any services with invalid image URLs
    const allServices = await Service.find({});
    console.log(
      `\nChecking ${allServices.length} services for image validity...`
    );

    for (const service of allServices) {
      if (service.images && service.images.length > 0) {
        const validImages = service.images.filter(
          (img) =>
            img &&
            (img.startsWith("https://images.pexels.com/") ||
              img.startsWith("https://res.cloudinary.com/"))
        );

        if (validImages.length !== service.images.length) {
          console.log(
            `⚠️  Found invalid images in "${service.name}", cleaning up...`
          );
          if (validImages.length === 0) {
            validImages.push(defaultSpaImage);
          }
          await Service.updateOne(
            { _id: service._id },
            { $set: { images: validImages } }
          );
          console.log(`✅ Cleaned up images for "${service.name}"`);
        }
      }
    }

    console.log("\n🎉 Image cleanup completed!");

    // Final report
    const finalServices = await Service.find({}).select("name images");
    console.log("\nFinal service image status:");
    finalServices.forEach((service) => {
      const imageCount = service.images ? service.images.length : 0;
      const status = imageCount > 0 ? "✅" : "❌";
      console.log(`${status} ${service.name}: ${imageCount} image(s)`);
    });
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

cleanupServiceImages();
