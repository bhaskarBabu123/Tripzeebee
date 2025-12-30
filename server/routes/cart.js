const express = require('express');
const Cart = require('../models/Cart');
const Tour = require('../models/Tour');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.tour', 'title images price duration destinations');
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], total: 0 });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { tourId, travelers, startDate } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if tour already in cart
    const existingItem = cart.items.find(
      item => item.tour.toString() === tourId && 
      item.startDate.toDateString() === new Date(startDate).toDateString()
    );

    if (existingItem) {
      existingItem.travelers = travelers;
      existingItem.price = tour.price * travelers;
    } else {
      cart.items.push({
        tour: tourId,
        travelers,
        startDate: new Date(startDate),
        price: tour.price * travelers
      });
    }

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    await cart.populate('items.tour', 'title images price duration destinations');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item
router.put('/item/:itemId', auth, async (req, res) => {
  try {
    const { travelers, startDate } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const tour = await Tour.findById(item.tour);
    
    if (travelers) {
      item.travelers = travelers;
      item.price = tour.price * travelers;
    }
    
    if (startDate) {
      item.startDate = new Date(startDate);
    }

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    await cart.populate('items.tour', 'title images price duration destinations');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/item/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.id(req.params.itemId).remove();
    
    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    await cart.populate('items.tour', 'title images price duration destinations');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;