import mongoose from "mongoose";

const TherapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    specialties: [
      {
        type: String,
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    availability: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    bodyType: {
      type: String,
    },
    height: {
      type: String,
    },
    personality: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    showAge: {
      type: Boolean,
      default: true,
    },
    showHeight: {
      type: Boolean,
      default: true,
    },
    showBodyType: {
      type: Boolean,
      default: true,
    },
    showPersonality: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Therapist ||
  mongoose.model("Therapist", TherapistSchema);
