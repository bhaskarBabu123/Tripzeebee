const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const Cart = require('../models/Cart');
const { auth, adminAuth } = require('../middleware/auth');
const { sendBookingConfirmation, generateETicket } = require('../utils/emailService');

const router = express.Router();


const razorpay = new Razorpay({
  key_id: "rzp_test_RsGQ0EyONIWnyi",
  key_secret: "gN0xl7IvpO6WDpns8N3gIHcE"
});


// Create booking order
// Create or reuse booking order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { tourId, travelers, startDate, totalPrice } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Check if a pending booking already exists for this user, tour, and startDate
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      tour: tourId,
      startDate: new Date(startDate),
      paymentStatus: 'Pending',
      bookingStatus: 'Pending'
    });

    if (existingBooking) {
      // Reuse existing pending booking: create new Razorpay order linked to it
      const order = await razorpay.orders.create({
        amount: totalPrice * 100,
        currency: 'INR',
        receipt: `booking_${existingBooking.bookingId}_${Date.now()}`
      });

      // Update only the paymentDetails with new Razorpay order ID
      existingBooking.paymentDetails.razorpayOrderId = order.id;
      await existingBooking.save();

      return res.json({
        orderId: order.id,
        bookingId: existingBooking._id,
        amount: totalPrice,
        currency: 'INR',
        key: "rzp_test_RsGQ0EyONIWnyi",
        message: 'Reusing existing pending booking'
      });
    }

    // No existing pending booking → create new one
    const bookingId = 'BK' + Date.now().toString();
    const booking = new Booking({
      bookingId,
      user: req.user.id,
      tour: tourId,
      travelers,
      startDate: new Date(startDate),
      endDate: new Date(new Date(startDate).getTime() + (tour.duration.days * 24 * 60 * 60 * 1000)),
      totalPrice,
      paymentStatus: 'Pending',
      bookingStatus: 'Pending',
      paymentDetails: {
        amount: totalPrice,
        currency: 'INR'
      }
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: 'INR',
      receipt: `booking_${bookingId}`
    });

    booking.paymentDetails.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      orderId: order.id,
      bookingId: booking._id,
      amount: totalPrice,
      currency: 'INR',
      key: "rzp_test_RsGQ0EyONIWnyi"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify payment
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', "gN0xl7IvpO6WDpns8N3gIHcE")
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update booking
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: 'Completed',
        bookingStatus: 'Confirmed',
        'paymentDetails.razorpayPaymentId': razorpay_payment_id,
        'paymentDetails.razorpaySignature': razorpay_signature
      },
      { new: true }
    ).populate('tour user');

    // Generate e-ticket
    const ticketNumber = 'TKT' + Date.now().toString();
    booking.eTicket.ticketNumber = ticketNumber;
    booking.eTicket.issued = true;
    booking.eTicket.issuedAt = new Date();
    
    // Generate QR code data
    const qrData = JSON.stringify({
      bookingId: booking.bookingId,
      ticketNumber,
      tourTitle: booking.tour.title,
      startDate: booking.startDate
    });
    booking.eTicket.qrCode = qrData;

    await booking.save();

    // Clear cart items for this tour
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { tour: booking.tour._id } } }
    );

    // Send confirmation email
    await sendBookingConfirmation(booking);

    res.json({
      message: 'Payment verified successfully',
      booking: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('tour', 'title images duration destinations')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking details
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tour user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.bookingStatus === 'Cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    // Calculate refund amount based on cancellation policy
    const refundPercentage = 0.8; // 80% refund
    const refundAmount = booking.totalPrice * refundPercentage;

    booking.bookingStatus = 'Cancelled';
    booking.cancellation = {
      cancelled: true,
      cancelledAt: new Date(),
      reason,
      refundAmount,
      refundStatus: 'Processing'
    };

    await booking.save();

    res.json({
      message: 'Booking cancelled successfully',
      refundAmount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
// Get all bookings
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const {
      status,
      paymentStatus,
      startDate,
      endDate,
      tourId,
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};

    if (status) filter.bookingStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (tourId) filter.tour = tourId;

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(filter)
      .populate('tour', 'title tourCode')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      bookings,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalBookings: total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status
router.put('/admin/:id/status', adminAuth, async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus, paymentStatus },
      { new: true }
    ).populate('tour user');

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;