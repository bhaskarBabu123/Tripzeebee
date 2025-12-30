const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  destinations: [{
    type: String,
    required: true
  }],
  duration: {
    days: {
      type: Number,
      required: true
    },
    nights: {
      type: Number,
      required: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String
  }],
  tourType: {
    type: String,
    enum: ['Adventure', 'Cultural', 'Wildlife', 'Beach', 'Mountain', 'City', 'Religious', 'Honeymoon'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging', 'Expert'],
    default: 'Easy'
  },
  groupSize: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      required: true
    }
  },
  ageLimit: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  inclusions: [String],
  exclusions: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String],
    meals: [String],
    accommodation: String
  }],
  highlights: [String],
  startDates: [Date],
  endDates: [Date],
  accommodation: {
    type: String,
    required: true
  },
  meals: [String],
  transport: {
    type: String,
    required: true
  },
  packingList: [String],
  cancellationPolicy: {
    type: String,
    required: true
  },
  refundPolicy: {
    type: String,
    required: true
  },
  safetyMeasures: [String],
  bestSeason: {
    type: String,
    required: true
  },
  documentsRequired: [String],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Draft'],
    default: 'Active'
  },
  tourCode: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

tourSchema.index({ destinations: 1, tourType: 1, price: 1 });

module.exports = mongoose.model('Tour', tourSchema);