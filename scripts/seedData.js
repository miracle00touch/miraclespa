// This script will seed your MongoDB database with existing therapist data
// Run this once to populate your database: node scripts/seedData.js

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

// MongoDB Models (using require for Node.js script)
const TherapistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    reviews: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    specialties: [{ type: String }],
    languages: [{ type: String }],
    availability: { type: String, required: true },
    bio: { type: String, required: true },
    price: { type: String, required: true },
    bodyType: { type: String },
    height: { type: String },
    personality: [{ type: String }],
    isActive: { type: Boolean, default: true },
    showAge: { type: Boolean, default: true },
    showHeight: { type: Boolean, default: true },
    showBodyType: { type: Boolean, default: true },
    showPersonality: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ContactSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "phone",
        "whatsapp",
        "viber",
        "wechat",
        "telegram",
        "email",
        "address",
      ],
    },
    label: { type: String, required: true },
    value: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["sensual", "professional", "specialty"],
    },
    duration: { type: String },
    price: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Your current therapist data
const femaleTherapists = [
  {
    name: "Maria Santos",
    age: 26,
    gender: "female",
    location: "Quezon City",
    experience: "5 years",
    rating: 4.9,
    reviews: 127,
    images: [
      "https://images.pexels.com/photos/6788392/pexels-photo-6788392.jpeg",
      "https://images.pexels.com/photos/6560288/pexels-photo-6560288.jpeg",
      "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg",
    ],
    description:
      "Maria specializes in Swedish and deep tissue massage, providing ultimate relaxation.",
    specialties: [
      "Swedish Massage",
      "Deep Tissue",
      "Hot Stone",
      "Aromatherapy",
    ],
    languages: ["English", "Filipino", "Tagalog"],
    availability: "Mon-Sat, 9AM-9PM",
    bio: "With 5 years of experience, Maria has mastered the art of relaxation therapy. She holds certifications in Swedish and deep tissue massage, and has helped over 500 clients achieve their wellness goals. Her gentle yet effective approach makes her perfect for both first-time clients and massage enthusiasts.",
    price: "₱2,500/session",
    bodyType: "Petite",
    height: "5'3\"",
    personality: ["Gentle", "Professional", "Caring", "Attentive"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
  {
    name: "Ana Rivera",
    age: 29,
    gender: "female",
    location: "Makati City",
    experience: "7 years",
    rating: 4.8,
    reviews: 203,
    images: [
      "https://images.pexels.com/photos/5893392/pexels-photo-5893392.jpeg",
      "https://images.pexels.com/photos/7659561/pexels-photo-7659561.jpeg",
    ],
    description:
      "Ana is an expert in sports massage, helping clients recover and maintain peak performance.",
    specialties: [
      "Sports Massage",
      "Therapeutic",
      "Sensual Massage",
      "Recovery",
    ],
    languages: ["English", "Filipino", "Spanish"],
    availability: "Daily, 8AM-10PM",
    bio: "Ana brings 7 years of expertise in sports and therapeutic massage. Former athlete turned wellness professional, she understands the body's needs for recovery and relaxation. Her techniques combine traditional methods with modern therapeutic approaches.",
    price: "₱3,000/session",
    bodyType: "Athletic",
    height: "5'5\"",
    personality: ["Energetic", "Knowledgeable", "Motivating", "Skilled"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
  {
    name: "Liza Cruz",
    age: 24,
    gender: "female",
    location: "Manila City",
    experience: "3 years",
    rating: 4.7,
    reviews: 89,
    images: [
      "https://images.pexels.com/photos/5984487/pexels-photo-5984487.jpeg",
    ],
    description:
      "Liza's expertise includes Thai massage, promoting flexibility and stress relief.",
    specialties: [
      "Thai Massage",
      "Flexibility Training",
      "Nuru Massage",
      "Stress Relief",
    ],
    languages: ["English", "Filipino"],
    availability: "Tue-Sun, 10AM-8PM",
    bio: "Young and passionate, Liza specializes in traditional Thai massage techniques. Her flexibility and understanding of body mechanics help clients improve their range of motion while achieving deep relaxation. Perfect for those seeking both wellness and flexibility.",
    price: "₱2,200/session",
    bodyType: "Slim",
    height: "5'2\"",
    personality: ["Friendly", "Flexible", "Patient", "Intuitive"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
  {
    name: "Jasmine Reyes",
    age: 31,
    gender: "female",
    location: "Taguig City",
    experience: "8 years",
    rating: 5.0,
    reviews: 156,
    images: [
      "https://images.pexels.com/photos/6173603/pexels-photo-6173603.jpeg",
      "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg",
      "https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg",
    ],
    description:
      "Jasmine offers reflexology treatments, focusing on pressure points for holistic healing.",
    specialties: [
      "Reflexology",
      "Holistic Healing",
      "Sensual Massage",
      "Pressure Points",
    ],
    languages: ["English", "Filipino", "Mandarin"],
    availability: "Mon-Fri, 9AM-7PM",
    bio: "Senior therapist with 8 years of holistic healing experience. Jasmine's expertise in reflexology and pressure point therapy has earned her a perfect 5.0 rating. She combines ancient healing wisdom with modern wellness techniques for transformative sessions.",
    price: "₱3,500/session",
    bodyType: "Curvy",
    height: "5'4\"",
    personality: ["Wise", "Healing", "Compassionate", "Experienced"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
];

const maleTherapists = [
  {
    name: "Carlos Mendoza",
    age: 32,
    gender: "male",
    location: "Makati City",
    experience: "9 years",
    rating: 4.9,
    reviews: 184,
    images: [
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    ],
    description:
      "Experienced therapist specializing in deep tissue and sports massage.",
    specialties: [
      "Deep Tissue",
      "Sports Massage",
      "Therapeutic",
      "Sensual Massage",
    ],
    languages: ["English", "Filipino", "Spanish"],
    availability: "Mon-Sat, 8AM-10PM",
    bio: "Carlos brings nearly a decade of experience in therapeutic massage. Former physical therapist turned wellness specialist, he combines medical knowledge with relaxation techniques. His strong hands and professional approach make him ideal for clients seeking both therapeutic benefits and deep relaxation.",
    price: "₱3,500/session",
    bodyType: "Muscular",
    height: "5'11\"",
    personality: ["Professional", "Strong", "Knowledgeable", "Reliable"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
  {
    name: "Ramon Cruz",
    age: 28,
    gender: "male",
    location: "Quezon City",
    experience: "6 years",
    rating: 4.8,
    reviews: 142,
    images: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    ],
    description: "Expert in sports massage and rehabilitation therapy.",
    specialties: [
      "Sports Massage",
      "Rehabilitation",
      "Nuru Massage",
      "Recovery",
    ],
    languages: ["English", "Filipino"],
    availability: "Daily, 9AM-9PM",
    bio: "Ramon specializes in sports therapy and injury recovery. His athletic background and certification in sports massage make him perfect for active clients. He understands the physical demands of modern life and tailors each session to address specific muscle groups and tension areas.",
    price: "₱3,200/session",
    bodyType: "Athletic",
    height: "5'9\"",
    personality: ["Energetic", "Focused", "Motivating", "Precise"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
  {
    name: "Miguel Santos",
    age: 35,
    gender: "male",
    location: "Manila City",
    experience: "12 years",
    rating: 5.0,
    reviews: 267,
    images: [
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    ],
    description:
      "Senior therapist skilled in therapeutic and sensual relaxation techniques.",
    specialties: [
      "Therapeutic",
      "Sensual Massage",
      "Relaxation",
      "Holistic Healing",
    ],
    languages: ["English", "Filipino", "Tagalog"],
    availability: "Mon-Fri, 10AM-8PM",
    bio: "Miguel is our most experienced male therapist with over 12 years in the wellness industry. His mastery of various massage techniques and intuitive understanding of client needs has earned him a perfect rating. He specializes in creating transformative experiences that heal both body and mind.",
    price: "₱4,000/session",
    bodyType: "Well-built",
    height: "6'0\"",
    personality: ["Experienced", "Intuitive", "Calming", "Masterful"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
  {
    name: "Rico Delgado",
    age: 26,
    gender: "male",
    location: "Taguig City",
    experience: "4 years",
    rating: 4.7,
    reviews: 98,
    images: [
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg",
      "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg",
    ],
    description:
      "Young and passionate therapist specializing in modern massage techniques.",
    specialties: [
      "Modern Techniques",
      "Sensual Massage",
      "Aromatherapy",
      "Hot Stone",
    ],
    languages: ["English", "Filipino"],
    availability: "Tue-Sun, 11AM-9PM",
    bio: "Rico represents the new generation of massage therapists, combining traditional techniques with modern wellness approaches. His youthful energy and innovative methods appeal to clients looking for fresh perspectives on relaxation and wellness.",
    price: "₱2,800/session",
    bodyType: "Lean",
    height: "5'8\"",
    personality: ["Innovative", "Passionate", "Friendly", "Creative"],
    isActive: true,
    showAge: true,
    showHeight: true,
    showBodyType: true,
    showPersonality: true,
  },
];

const contacts = [
  {
    type: "whatsapp",
    label: "WhatsApp",
    value: "639274736260",
    isActive: true,
    order: 1,
  },
  {
    type: "phone",
    label: "Call Us",
    value: "639274736260",
    isActive: true,
    order: 2,
  },
  {
    type: "viber",
    label: "Viber",
    value: "639274736260",
    isActive: true,
    order: 3,
  },
  {
    type: "telegram",
    label: "Telegram",
    value: "639274736260",
    isActive: true,
    order: 4,
  },
  {
    type: "wechat",
    label: "WeChat",
    value: "miracletouch_spa",
    isActive: true,
    order: 5,
  },
  {
    type: "email",
    label: "Email",
    value: "info@miracletouchspa.com",
    isActive: true,
    order: 6,
  },
];

const services = [
  // Sensual Services (Priority)
  {
    name: "Sensual Massage",
    description: "Ultimate relaxation with gentle, sensual touch techniques",
    category: "sensual",
    images: [
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
      "https://images.pexels.com/photos/6663386/pexels-photo-6663386.jpeg",
    ],
    duration: "60-90 minutes",
    price: "₱2,500 - ₱4,000",
    isActive: true,
    order: 1,
  },
  {
    name: "Nuru Massage",
    description: "Japanese-style intimate massage for complete stress relief",
    category: "sensual",
    images: [
      "https://images.pexels.com/photos/8142828/pexels-photo-8142828.jpeg",
    ],
    duration: "90 minutes",
    price: "₱3,500 - ₱5,000",
    isActive: true,
    order: 2,
  },
  // Professional Services
  {
    name: "Swedish Massage",
    description: "Classic relaxation massage with long, flowing strokes",
    category: "professional",
    images: [
      "https://images.pexels.com/photos/3757943/pexels-photo-3757943.jpeg",
    ],
    duration: "60 minutes",
    price: "₱2,000 - ₱3,000",
    isActive: true,
    order: 3,
  },
  {
    name: "Deep Tissue Massage",
    description: "Therapeutic massage targeting deep muscle layers",
    category: "professional",
    images: [
      "https://images.pexels.com/photos/6663388/pexels-photo-6663388.jpeg",
    ],
    duration: "60-90 minutes",
    price: "₱2,500 - ₱3,500",
    isActive: true,
    order: 4,
  },
  {
    name: "Sports Massage",
    description: "Specialized massage for athletes and active individuals",
    category: "professional",
    images: [
      "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg",
    ],
    duration: "60 minutes",
    price: "₱2,800 - ₱3,800",
    isActive: true,
    order: 5,
  },
  {
    name: "Thai Massage",
    description: "Traditional stretching and pressure point massage",
    category: "professional",
    images: [
      "https://images.pexels.com/photos/8142822/pexels-photo-8142822.jpeg",
    ],
    duration: "90 minutes",
    price: "₱2,200 - ₱3,200",
    isActive: true,
    order: 6,
  },
  // Specialty Services
  {
    name: "Hot Stone Massage",
    description: "Heated stones for deep muscle relaxation",
    category: "specialty",
    images: [
      "https://images.pexels.com/photos/8142826/pexels-photo-8142826.jpeg",
    ],
    duration: "75 minutes",
    price: "₱3,000 - ₱4,000",
    isActive: true,
    order: 7,
  },
  {
    name: "Aromatherapy Massage",
    description: "Essential oils for mind and body wellness",
    category: "specialty",
    images: [
      "https://images.pexels.com/photos/6663392/pexels-photo-6663392.jpeg",
    ],
    duration: "60 minutes",
    price: "₱2,500 - ₱3,500",
    isActive: true,
    order: 8,
  },
  {
    name: "Reflexology",
    description: "Pressure point therapy focusing on feet and hands",
    category: "specialty",
    images: [
      "https://images.pexels.com/photos/5999932/pexels-photo-5999932.jpeg",
    ],
    duration: "45 minutes",
    price: "₱1,800 - ₱2,500",
    isActive: true,
    order: 9,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB (you'll need to replace this with your MongoDB URI)
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/miraclespa";
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB");

    // Create models
    const Therapist = mongoose.model("Therapist", TherapistSchema);
    const Contact = mongoose.model("Contact", ContactSchema);
    const Service = mongoose.model("Service", ServiceSchema);

    // Clear existing data
    await Therapist.deleteMany({});
    await Contact.deleteMany({});
    await Service.deleteMany({});

    console.log("Cleared existing data");

    // Insert therapists
    const allTherapists = [...femaleTherapists, ...maleTherapists];
    await Therapist.insertMany(allTherapists);
    console.log(`Inserted ${allTherapists.length} therapists`);

    // Insert contacts
    await Contact.insertMany(contacts);
    console.log(`Inserted ${contacts.length} contacts`);

    // Insert services
    await Service.insertMany(services);
    console.log(`Inserted ${services.length} services`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
