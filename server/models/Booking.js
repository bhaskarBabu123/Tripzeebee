const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  travelers: [{
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    documentType: {
      type: String,
      // enum: ['Passport', 'ID Card', 'Driving License'],
      required: true
    },
    documentNumber: {
      type: String,
      required: true
    },
    emergencyContact: {
      name: String,
      phone: String
    }
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentDetails: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  specialRequests: String,
  eTicket: {
    ticketNumber: String,
    qrCode: String,
    issued: {
      type: Boolean,
      default: false
    },
    issuedAt: Date
  },
  cancellation: {
    cancelled: {
      type: Boolean,
      default: false
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['Processing', 'Completed', 'Failed']
    }
  }
}, {
  timestamps: true
});

bookingSchema.index({ user: 1, tour: 1, startDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);