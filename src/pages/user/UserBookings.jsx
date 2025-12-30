import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Search, Download, 
  Ticket, Plus, ChevronLeft, ArrowUpRight, 
  Loader2, CreditCard, Star, Clock 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const UserBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); 
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-IN', {
      month: 'short', 
      day: 'numeric'
    }) : 'TBD';
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/bookings/my-bookings');
        setBookings(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCompletePayment = async (e, booking) => {
    e.preventDefault();
    e.stopPropagation();
    
    setProcessingId(booking._id);

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error('Razorpay SDK failed to load.');
        return;
      }

      const { data: orderData } = await axios.post('/bookings/create-order', {
        tourId: booking.tour._id,
        travelers: booking.travelers,
        startDate: booking.startDate,
        totalPrice: booking.totalPrice
      });

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Tripzybee',
        description: `Payment for ${booking.tour?.title}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await axios.post('/bookings/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: orderData.bookingId
            });
            
            toast.success('Payment successful! Trip confirmed.');
            const updated = await axios.get('/bookings/my-bookings');
            setBookings(Array.isArray(updated.data) ? updated.data : []);
            navigate(`/user/booking-success/${orderData.bookingId}`);
          } catch (error) {
            toast.error('Payment verification failed. Contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: { color: '#FBBF24' },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
            setProcessingId(null);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (!booking) return false;
      const matchesStatus = filters.status === 'all' || 
        booking.bookingStatus?.toLowerCase() === filters.status.toLowerCase();
      const searchTerm = filters.search.toLowerCase();
      return matchesStatus && (
        booking.tour?.title?.toLowerCase().includes(searchTerm) ||
        booking.bookingId?.toLowerCase().includes(searchTerm)
      );
    });
  }, [bookings, filters]);

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s === 'confirmed') return 'bg-emerald-500 text-white';
    if (s === 'pending') return 'bg-amber-400 text-slate-900';
    if (s === 'cancelled') return 'bg-rose-500 text-white';
    return 'bg-slate-400 text-white';
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
          <span className="text-sm font-medium text-slate-600">Loading your trips...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              My <span className="text-amber-600">Trips</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Track your upcoming trips, download tickets and manage payments
            </p>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            Book New Trip
            <Plus className="w-4 h-4" />
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by tour name or booking ID..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'All Trips' },
                { value: 'confirmed', label: 'Live' },
                { value: 'pending', label: 'Pending' },
                { value: 'cancelled', label: 'Cancelled' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilters(prev => ({...prev, status: value}))}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all whitespace-nowrap ${
                    filters.status === value
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trips Grid */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
            <Ticket className="w-16 h-16 mx-auto text-slate-300 mb-6" />
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">No trips yet</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-sm mx-auto">
              Your adventure awaits! Book your first trip and start exploring.
            </p>
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-semibold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Explore Tours
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-200">
                
                {/* Image & Status */}
                <div className="relative h-48 lg:h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={booking.tour?.images?.[0]?.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&fit=crop'}
                    alt={booking.tour?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&fit=crop';
                    }}
                  />
                  <div className={`absolute left-3 top-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(booking.bookingStatus)}`}>
                    {booking.bookingStatus}
                  </div>
                  {booking.eTicket?.issued && (
                    <div className="absolute right-3 top-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                      <Download className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  
                  {/* Title & Meta */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-tight mb-2">
                      {booking.tour?.title || 'Tour Name'}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span className="truncate">{booking.tour?.destinations?.[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{formatDate(booking.startDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 py-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{booking.tour?.duration?.days || 0}D/{booking.tour?.duration?.nights || 0}N</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{booking.travelers?.length || 0} guests</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-lg font-bold text-slate-900 block">
                      ₹{booking.totalPrice?.toLocaleString() || '0'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Total Amount</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    
                    {/* Payment Button - Always Visible for Pending */}
                    {booking.bookingStatus?.toLowerCase() === 'pending' && (
                      <button 
                        onClick={(e) => handleCompletePayment(e, booking)}
                        disabled={processingId === booking._id}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === booking._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            Pay Now
                          </>
                        )}
                      </button>
                    )}

                    {/* E-Ticket Button */}
                    {booking.eTicket?.issued && (
                      <Link 
                        to={`/user/ticket/${booking._id}`}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        E-Ticket
                      </Link>
                    )}

                    {/* View Details Button */}
                    <Link
                      to={`/user/bookings/${booking._id}`}
                      className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                    >
                      View Details
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Booking ID */}
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide text-center pt-2">
                    #{booking.bookingId?.slice(-6) || 'N/A'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* FAB */}
      <Link 
        to="/tours"
        className="lg:hidden fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center z-50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </section>
  );
};

export default UserBookings;
