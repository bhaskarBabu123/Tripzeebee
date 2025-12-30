import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, MapPin, Users, CreditCard,
  Download, Phone, Mail, CheckCircle, AlertCircle,
  XCircle, Clock, Loader2, ArrowRight, ShieldCheck 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/bookings/${id}`);
      setBooking(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  // **RAZORPAY PAYMENT LOGIC - SAME AS UserBookings**
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

  const handleCompletePayment = async () => {
    setProcessingPayment(true);
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
            fetchBookingDetails(); // Refresh data
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
            setProcessingPayment(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }
    setCancelling(true);
    try {
      await axios.put(`/bookings/${id}/cancel`, { reason: cancelReason });
      setShowCancelModal(false);
      fetchBookingDetails();
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s === 'confirmed') return 'bg-emerald-500 text-white';
    if (s === 'pending') return 'bg-amber-400 text-slate-900';
    if (s === 'cancelled') return 'bg-rose-500 text-white';
    if (s === 'completed') return 'bg-blue-500 text-white';
    return 'bg-slate-400 text-white';
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-IN', {
      month: 'short', day: 'numeric', year: 'numeric'
    }) : 'TBD';
  };

  const formatDateTime = (date) => {
    return date ? new Date(date).toLocaleString('en-IN', {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
    }) : 'TBD';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
          <span className="text-sm font-medium text-slate-600">Loading booking details...</span>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-xl p-8 text-center border border-slate-200">
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-xl flex items-center justify-center">
            <XCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Booking Not Found</h2>
          <p className="text-sm text-slate-500 mb-8">The booking you're looking for doesn't exist.</p>
          <Link
            to="/user/bookings"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:from-amber-600 hover:to-yellow-600 transition-all"
          >
            All Bookings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isPendingPayment = booking.paymentStatus?.toLowerCase() === 'pending' && booking.bookingStatus?.toLowerCase() === 'pending';

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-700 font-sans">
      
      {/* COMPACT NAV - SAME AS TOURDETAILS */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link to="/user/bookings" className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-black transition-colors">
            <ChevronLeft size={14}/> BACK TO TRIPS
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase bg-slate-100 px-2 py-1 rounded-md">
              #{booking.bookingId?.slice(-8) || 'N/A'}
            </span>
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(booking.bookingStatus)}`}>
              {booking.bookingStatus}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* MAIN IMAGE */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img 
                  src={booking.tour?.images?.[0]?.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&fit=crop'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt={booking.tour?.title}
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&fit=crop'}
                />
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(booking.bookingStatus)}`}>
                  {booking.bookingStatus}
                </div>
              </div>
            </div>

            {/* HEADER INFO */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{booking.tour?.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin size={16} className="text-amber-600"/> 
                  <span>{booking.tour?.destinations?.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={16} className="text-amber-600"/> 
                  <span>{formatDate(booking.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users size={16} className="text-amber-600"/> 
                  <span>{booking.travelers?.length || 0} Travelers</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300">
                  <div className="p-2 bg-slate-50 text-amber-600 rounded-lg"><Clock size={16}/></div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Duration</p>
                    <p className="text-sm font-bold text-slate-800">{booking.tour?.duration?.days || 0}D/{booking.tour?.duration?.nights || 0}N</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300">
                  <div className="p-2 bg-slate-50 text-amber-600 rounded-lg"><Users size={16}/></div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Travelers</p>
                    <p className="text-sm font-bold text-slate-800">{booking.travelers?.length || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300">
                  <div className="p-2 bg-slate-50 text-amber-600 rounded-lg"><CreditCard size={16}/></div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Total Amount</p>
                    <p className="text-sm font-bold text-slate-800">₹{booking.totalPrice?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRAVELERS */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <Users size={20} className="text-amber-600"/>
                  Travelers ({booking.travelers?.length || 0})
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {booking.travelers?.map((traveler, index) => (
                  <div key={index} className="p-6 hover:bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div>
                        <p className="text-[11px] uppercase text-slate-400 font-bold tracking-wider mb-1">Name</p>
                        <p className="font-semibold text-slate-900">{traveler.name}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase text-slate-400 font-bold tracking-wider mb-1">Age</p>
                        <p className="font-semibold text-slate-900">{traveler.age} yrs, {traveler.gender}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase text-slate-400 font-bold tracking-wider mb-1">ID Number</p>
                        <p className="font-mono text-slate-900">{traveler.documentNumber}</p>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="p-12 text-center text-slate-500">
                    No travelers listed
                  </div>
                )}
              </div>
            </div>

            {/* SPECIAL REQUESTS & ETICKET */}
            {booking.specialRequests && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-amber-600"/>
                  Special Requests
                </h3>
                <p className="text-slate-600 leading-relaxed">{booking.specialRequests}</p>
              </div>
            )}

            {booking.eTicket?.issued && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle size={24} className="text-emerald-600"/>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900">E-Ticket Ready</h3>
                    <p className="text-sm text-emerald-700">Ticket #{booking.eTicket.ticketNumber}</p>
                  </div>
                </div>
                <Link
                  to={`/user/ticket/${booking._id}`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                >
                  <Download size={18}/> Download E-Ticket
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - SAME LAYOUT AS TOURDETAILS */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-4">
              
              {/* PAYMENT SUMMARY CARD */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md shadow-slate-200/40">
                <div className="mb-6 pb-6 border-b border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Payment Summary</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">₹{booking.totalPrice?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-600">Base Price × {booking.travelers?.length}</span>
                    <span className="font-semibold text-slate-900">₹{booking.tour?.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="uppercase tracking-wide text-slate-500">Status</span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyles(booking.paymentStatus || 'paid')}}`}>
                      {booking.paymentStatus || 'Paid'}
                    </span>
                  </div>
                </div>

                {booking.paymentDetails?.razorpayPaymentId && (
                  <div className="mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1">Payment ID</p>
                    <p className="font-mono text-sm text-slate-900 truncate">{booking.paymentDetails.razorpayPaymentId}</p>
                  </div>
                )}

                {/* **PAYMENT BUTTON - SAME LOGIC AS UserBookings** */}
                {isPendingPayment ? (
                  <button 
                    onClick={handleCompletePayment}
                    disabled={processingPayment}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 py-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processingPayment ? (
                      <Loader2 size={18} className="animate-spin"/>
                    ) : (
                      <>
                        <CreditCard size={18}/> Complete Payment
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    {booking.eTicket?.issued && (
                      <Link
                        to={`/user/ticket/${booking._id}`}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <Download size={16}/> E-Ticket
                      </Link>
                    )}
                    {booking.bookingStatus === 'Confirmed' && new Date(booking.startDate) > new Date() && (
                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <XCircle size={16}/> Cancel Booking
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* CANCEL POLICY */}
              <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Free Cancellation</p>
                  <p className="text-xs font-semibold">Until trip starts</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg">
                  <ShieldCheck size={18} className="text-amber-400"/>
                </div>
              </div>

              {/* SUPPORT */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">24/7 Support</p>
                    <p className="text-xs font-semibold">+91 9876543210</p>
                  </div>
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <Phone size={18}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <XCircle size={20} className="text-rose-500"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Cancel Booking</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">This action cannot be undone. Please provide a reason.</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all mb-4"
              placeholder="Reason for cancellation..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancelling || !cancelReason.trim()}
                className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {cancelling ? (
                  <>
                    <Loader2 size={16} className="animate-spin"/>
                    Cancelling...
                  </>
                ) : (
                  'Cancel Booking'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
