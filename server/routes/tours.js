const express = require('express');
const Tour = require('../models/Tour');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all tours with filters
router.get('/', async (req, res) => {
  try {
    const {
      destination,
      tourType,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      difficulty,
      featured,
      search,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = { status: 'Active' };

    if (destination) {
      filter.destinations = { $in: [new RegExp(destination, 'i')] };
    }

    if (tourType) {
      filter.tourType = tourType;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minDuration || maxDuration) {
      filter['duration.days'] = {};
      if (minDuration) filter['duration.days'].$gte = Number(minDuration);
      if (maxDuration) filter['duration.days'].$lte = Number(maxDuration);
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { destinations: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'duration-short':
        sortOption = { 'duration.days': 1 };
        break;
      case 'duration-long':
        sortOption = { 'duration.days': -1 };
        break;
      case 'rating':
        sortOption = { 'rating.average': -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { featured: -1, 'rating.average': -1 };
    }

    const skip = (page - 1) * limit;

    const tours = await Tour.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .select('-reviews');

    const total = await Tour.countDocuments(filter);

    res.json({
      tours,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalTours: total,
        hasNext: skip + tours.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single tour
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate('reviews.user', 'name');
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured tours
router.get('/featured/list', async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true, status: 'Active' })
      .limit(8)
      .select('-reviews');
    
    res.json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Check if user already reviewed
    const existingReview = tour.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this tour' });
    }

    // Add review
    tour.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    // Update rating
    const totalRating = tour.reviews.reduce((acc, review) => acc + review.rating, 0);
    tour.rating.average = totalRating / tour.reviews.length;
    tour.rating.count = tour.reviews.length;

    await tour.save();
    
    await tour.populate('reviews.user', 'name');
    
    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
// Create tour
router.post('/', adminAuth, async (req, res) => {
  try {
    const tourData = req.body;
    
    // Generate tour code
    const tourCode = 'TZ' + Date.now().toString().slice(-6);
    tourData.tourCode = tourCode;

    const tour = new Tour(tourData);
    await tour.save();

    res.status(201).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update tour
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete tour
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;