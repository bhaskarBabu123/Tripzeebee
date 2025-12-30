const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Tour = require('./models/Tour');

const seedData = async () => {
  try {
    await mongoose.connect('mongodb+srv://bhaskarAntoty123:MQEJ1W9gtKD547hy@bhaskarantony.wagpkay.mongodb.net/TripszyBee?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Tour.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@tripzybee.com',
      password: adminPassword,
      phone: '+91 9876543210',
      isAdmin: true,
      address: {
        street: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      }
    });
    await admin.save();

    // Create sample user
    const userPassword = await bcrypt.hash('user123', 12);
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: userPassword,
      phone: '+91 9876543211',
      dateOfBirth: new Date('1990-05-15'),
      address: {
        street: '456 Oak St',
        city: 'Delhi',
        state: 'Delhi',
        zipCode: '110001',
        country: 'India'
      }
    });
    await user.save();

    // Sample tours data
   const tours = [
  {
    title: "Goa Beach Escape",
    shortDescription: "A perfect beach holiday with nightlife, water sports, and sunsets.",
    description:
      "Enjoy the ultimate beach vacation in Goa with golden sands, thrilling water sports, vibrant nightlife, and cultural experiences. Ideal for couples and friends.",
    destinations: ["Goa"],
    duration: { days: 4, nights: 3 },
    price: 14999,
    originalPrice: 17999,
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        caption: "Goa Beach"
      },
      {
        url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
        caption: "Sunset View"
      }
    ],
    tourType: "Beach",
    difficulty: "Easy",
    groupSize: { min: 1, max: 20 },
    ageLimit: { min: 5, max: 60 },
    inclusions: [
      "Hotel Accommodation",
      "Breakfast",
      "Airport Transfers",
      "Sightseeing"
    ],
    exclusions: [
      "Flight Tickets",
      "Personal Expenses",
      "Travel Insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Leisure",
        description: "Arrival at Goa, hotel check-in, rest and leisure time.",
        activities: ["Hotel Check-in", "Beach Walk"],
        meals: ["Dinner"],
        accommodation: "3 Star Beach Resort"
      },
      {
        day: 2,
        title: "North Goa Sightseeing",
        description: "Explore famous beaches and attractions.",
        activities: ["Calangute Beach", "Baga Beach", "Fort Aguada"],
        meals: ["Breakfast"],
        accommodation: "3 Star Beach Resort"
      },
      {
        day: 3,
        title: "South Goa Tour",
        description: "Visit serene beaches and churches.",
        activities: ["Colva Beach", "Basilica of Bom Jesus"],
        meals: ["Breakfast"],
        accommodation: "3 Star Beach Resort"
      },
      {
        day: 4,
        title: "Departure",
        description: "Check-out and departure.",
        activities: ["Hotel Check-out"],
        meals: ["Breakfast"],
        accommodation: "N/A"
      }
    ],
    highlights: [
      "Golden beaches",
      "Nightlife",
      "Portuguese architecture",
      "Water sports"
    ],
    startDates: [new Date("2025-01-10"), new Date("2025-02-05")],
    endDates: [new Date("2025-01-13"), new Date("2025-02-08")],
    accommodation: "3 Star Beach Resort",
    meals: ["Breakfast"],
    transport: "AC Private Vehicle",
    packingList: [
      "Beachwear",
      "Sunscreen",
      "Comfortable Footwear"
    ],
    cancellationPolicy:
      "Free cancellation up to 7 days before travel. 50% charges within 7 days.",
    refundPolicy:
      "Refund will be processed within 7 working days after cancellation.",
    safetyMeasures: [
      "First aid kit",
      "24/7 local support",
      "Verified hotels and drivers"
    ],
    bestSeason: "October to March",
    documentsRequired: ["Government ID Proof"],
    rating: { average: 4.6, count: 120 },
    featured: true,
    status: "Active",
    tourCode: "TB-GOA-001"
  },

  {
    title: "Manali Adventure Retreat",
    shortDescription: "Snow-capped mountains, adventure sports, and scenic valleys.",
    description:
      "Experience the thrill of the Himalayas with adventure activities, snow views, and cozy stays in Manali.",
    destinations: ["Manali"],
    duration: { days: 5, nights: 4 },
    price: 18999,
    originalPrice: 22999,
    images: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada",
        caption: "Manali Mountains"
      }
    ],
    tourType: "Mountain",
    difficulty: "Moderate",
    groupSize: { min: 2, max: 15 },
    ageLimit: { min: 10, max: 55 },
    inclusions: [
      "Hotel Stay",
      "Breakfast & Dinner",
      "Sightseeing",
      "Local Transfers"
    ],
    exclusions: ["Personal Expenses", "Adventure Activity Fees"],
    itinerary: [
      {
        day: 1,
        title: "Arrival",
        description: "Arrival and hotel check-in.",
        activities: ["Leisure Walk"],
        meals: ["Dinner"],
        accommodation: "Mountain View Hotel"
      },
      {
        day: 2,
        title: "Solang Valley",
        description: "Adventure activities and snow play.",
        activities: ["Paragliding", "Snow Activities"],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Mountain View Hotel"
      }
    ],
    highlights: [
      "Snow activities",
      "Mountain views",
      "Adventure sports"
    ],
    startDates: [new Date("2025-01-15")],
    endDates: [new Date("2025-01-19")],
    accommodation: "Mountain View Hotel",
    meals: ["Breakfast", "Dinner"],
    transport: "AC Tempo Traveller",
    packingList: [
      "Warm Clothes",
      "Gloves",
      "Comfortable Shoes"
    ],
    cancellationPolicy:
      "Cancellation before 10 days – Full refund. After that – 50% charges.",
    refundPolicy:
      "Refund credited within 7–10 business days.",
    safetyMeasures: [
      "Experienced guides",
      "Medical assistance",
      "Weather monitoring"
    ],
    bestSeason: "December to February",
    documentsRequired: ["Government ID Proof"],
    rating: { average: 4.7, count: 90 },
    featured: true,
    status: "Active",
    tourCode: "TB-MAN-002"
  },

  {
    title: "Tirupati Spiritual Tour",
    shortDescription: "A peaceful religious journey to Lord Venkateswara Temple.",
    description:
      "A divine experience visiting Tirupati Balaji Temple with comfortable travel and darshan assistance.",
    destinations: ["Tirupati"],
    duration: { days: 2, nights: 1 },
    price: 7999,
    images: [
      {
        url: "https://images.unsplash.com/photo-1621939514649-280e2ee25f71",
        caption: "Tirupati Temple"
      }
    ],
    tourType: "Religious",
    difficulty: "Easy",
    groupSize: { min: 1, max: 30 },
    ageLimit: { min: 5, max: 70 },
    inclusions: [
      "Darshan Assistance",
      "Hotel Stay",
      "Breakfast",
      "Transport"
    ],
    exclusions: ["Personal Expenses"],
    itinerary: [
      {
        day: 1,
        title: "Temple Visit",
        description: "Darshan and local temple visits.",
        activities: ["Darshan"],
        meals: ["Breakfast"],
        accommodation: "Standard Hotel"
      }
    ],
    highlights: ["VIP Darshan", "Comfortable travel"],
    startDates: [new Date("2025-01-20")],
    endDates: [new Date("2025-01-21")],
    accommodation: "Standard Hotel",
    meals: ["Breakfast"],
    transport: "AC Bus",
    packingList: ["Traditional Wear", "ID Proof"],
    cancellationPolicy:
      "Cancellation before 5 days – Full refund.",
    refundPolicy:
      "Refund processed within 5 working days.",
    safetyMeasures: ["Crowd management", "24/7 assistance"],
    bestSeason: "All Year",
    documentsRequired: ["Aadhar Card"],
    rating: { average: 4.5, count: 200 },
    featured: false,
    status: "Active",
    tourCode: "TB-TIR-003"
  }
];



    for (const tourData of tours) {
      const tour = new Tour(tourData);
      await tour.save();
    }

    console.log('Seed data created successfully');
    console.log('Admin login: admin@tripzybee.com / admin123');
    console.log('User login: john@example.com / user123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed data creation failed:', error);
    mongoose.connection.close();
  }
};

seedData();