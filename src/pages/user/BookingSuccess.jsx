import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle, Download, Calendar, MapPin, 
  Users, Mail, Phone, ArrowRight, Share2,
  ChevronLeft, Loader2 
} from 'lucide-react';
import axios from 'axios';

const BookingSuccess = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/bookings/${id}`);
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'TBD';
  };

  const shareBooking = async () => {
    if (navigator.share && booking) {
      try {
        await navigator.share({
          title: `Tripzybee Booking`,
          text: `Booked ${booking.tour?.title || 'amazing trip'}!`,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    const text = booking 
      ? `Booked ${booking.tour?.title} with Tripzybee! ID: ${booking.bookingId}`
      : 'Check my Tripzybee booking!';
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="text-center max-w-sm">
          <X className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Booking Not Found</h2>
          <Link
            to="/user/bookings"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-semibold py-2.5 px-6 rounded-xl text-xs shadow-md hover:shadow-lg transition-all"
          >
            View All Trips
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28 lg:pb-12">
      
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center px-4 py-3">
          <Link to="/user/bookings" className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center -ml-1">
            <ChevronLeft className="w-4.5 h-4.5 text-slate-600" />
          </Link>
          <h1 className="text-sm font-semibold text-slate-900 ml-2 flex-1">Booking Confirmed</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 lg:px-8 py-4 lg:py-12">
        
        {/* Success Banner */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6 border-4 border-white shadow-lg">
            <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-500" />
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-slate-900 mb-2 lg:mb-3 leading-tight">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-sm lg:text-lg text-slate-600 mb-1 lg:mb-2">
            Your trip to <span className="font-semibold text-slate-900">{booking.tour?.destinations?.[0]}</span> is confirmed
          </p>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-1.5 rounded-xl text-xs lg:text-sm font-mono font-semibold inline-block shadow-md">
            #{booking.bookingId?.slice(-8) || 'N/A'}
          </div>
        </div>

        {/* Main Booking Card */}
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-slate-100 shadow-lg overflow-hidden mb-8 lg:mb-12">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-base lg:text-xl font-bold text-slate-900 leading-tight line-clamp-2 mb-1 lg:mb-2">
                  {booking.tour?.title || 'Your Amazing Trip'}
                </h2>
                <div className="flex flex-wrap gap-2 text-xs lg:text-sm text-slate-900/90">
                  <div className="flex items-center gap-1 bg-white/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <MapPin className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    <span>{booking.tour?.destinations?.[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    <span>{formatDate(booking.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Users className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    <span>{booking.travelers?.length || 0}</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs lg:text-sm font-medium text-slate-900/90 uppercase tracking-wide mb-1">Total Paid</div>
                <div className="text-xl lg:text-2xl font-bold text-slate-900">
                  ₹{booking.totalPrice?.toLocaleString() || '0'}
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 lg:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
              
              {/* Trip Info */}
              <div>
                <h3 className="text-sm lg:text-base font-semibold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  Trip Details
                </h3>
                <div className="space-y-2 text-xs lg:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600">Duration</span>
                    <span className="font-semibold">{booking.tour?.duration?.days || 0}D/{booking.tour?.duration?.nights || 0}N</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600">Start Date</span>
                    <span className="font-semibold">{formatDate(booking.startDate)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600">Travelers</span>
                    <span className="font-semibold">{booking.travelers?.length || 0}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-sm lg:text-base font-semibold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  Payment
                </h3>
                <div className="space-y-2 text-xs lg:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-700`}>
                      {booking.paymentStatus || 'Paid'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600">Method</span>
                    <span className="font-semibold">Card Payment</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-600">Amount</span>
                    <span className="font-semibold">₹{booking.totalPrice?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* E-Ticket */}
            {booking.eTicket?.issued && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 lg:p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-sm lg:text-base font-semibold text-emerald-800 mb-1">E-Ticket Ready!</h4>
                      <p className="text-xs lg:text-sm text-emerald-700">
                        Sent to your email • Ticket: <span className="font-mono font-semibold">#{booking.eTicket?.ticketNumber?.slice(-8)}</span>
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/user/ticket/${booking._id}`}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-semibold text-xs lg:text-sm flex items-center gap-1.5 shadow-lg hover:shadow-xl transition-all whitespace-nowrap self-start lg:self-auto"
                  >
                    <Download className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Download Ticket
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-slate-100 shadow-lg p-4 lg:p-8 mb-8 lg:mb-12">
          <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-6 lg:mb-8 uppercase tracking-wide flex items-center gap-2">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="text-center group hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-3 bg-slate-50 rounded-2xl group-hover:bg-slate-100 p-3 lg:p-4 flex items-center justify-center transition-all">
                <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
              </div>
              <h4 className="text-sm lg:text-base font-semibold text-slate-900 mb-2">Check Email</h4>
              <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">Confirmation & e-ticket sent</p>
            </div>
            <div className="text-center group hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-3 bg-slate-50 rounded-2xl group-hover:bg-slate-100 p-3 lg:p-4 flex items-center justify-center transition-all">
                <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
              </div>
              <h4 className="text-sm lg:text-base font-semibold text-slate-900 mb-2">Get Ready</h4>
              <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">Team contacts 48hrs prior</p>
            </div>
            <div className="text-center group hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-3 bg-slate-50 rounded-2xl group-hover:bg-slate-100 p-3 lg:p-4 flex items-center justify-center transition-all">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
              </div>
              <h4 className="text-sm lg:text-base font-semibold text-slate-900 mb-2">Pack Smart</h4>
              <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">Review packing list</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center">
          <Link
            to={`/user/bookings/${booking._id}`}
            className="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white py-3.5 px-6 rounded-2xl font-semibold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-center"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
          </Link>
          <button
            onClick={shareBooking}
            className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-3.5 px-6 rounded-2xl font-semibold text-xs lg:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
          >
            <Share2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            Share Trip
          </button>
          <Link
            to="/tours"
            className="flex-1 border-2 border-amber-500 hover:border-amber-600 text-amber-600 hover:bg-amber-50 py-3.5 px-6 rounded-2xl font-semibold text-xs lg:text-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all"
          >
            Book More
          </Link>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-center border border-slate-200">
          <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-3 lg:mb-4 flex items-center justify-center gap-2">
            Need Help?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center text-xs lg:text-sm">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors p-3 lg:p-4 bg-white rounded-xl shadow-sm hover:shadow-md"
            >
              <Phone className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
              +91 98765 43210
            </a>
            <a
              href="mailto:support@tripzybee.com"
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors p-3 lg:p-4 bg-white rounded-xl shadow-sm hover:shadow-md"
            >
              <Mail className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
              support@tripzybee.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
