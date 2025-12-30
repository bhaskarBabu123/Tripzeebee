import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Calendar, BadgeCheck, 
  ArrowLeft, Lock, ChevronRight, 
  ClipboardList, Loader2, Plane
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({ travelers: [], specialRequests: '' });
  const [bookingItems, setBookingItems] = useState([]);

  // Load Data from Navigation State or Cart
  useEffect(() => {
    const tourFromState = location.state?.tour;
    if (tourFromState) {
      setBookingItems([{
        tour: tourFromState,
        travelers: location.state?.travelers || 1,
        startDate: location.state?.startDate,
        price: tourFromState.price * (location.state?.travelers || 1)
      }]);
    } else if (cart?.items?.length > 0) {
      setBookingItems(cart.items);
    } else {
      navigate('/tours');
    }
  }, [location.state, cart, navigate]);

  // Initialize Traveler Forms
  useEffect(() => {
    const totalTravelers = bookingItems.reduce((sum, item) => sum + item.travelers, 0);
    const travelers = Array.from({ length: totalTravelers }, (_, index) => ({
      name: index === 0 ? user?.name || '' : '',
      age: '',
      gender: '',
      documentType: 'Passport',
      documentNumber: '',
      emergencyContact: { 
        name: index === 0 ? user?.emergencyContact?.name || '' : '', 
        phone: index === 0 ? user?.emergencyContact?.phone || '' : '' 
      }
    }));
    setBookingData(prev => ({ ...prev, travelers }));
  }, [bookingItems, user]);

  const handleTravelerChange = (index, field, value) => {
    const updated = [...bookingData.travelers];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updated[index] = { ...updated[index], [parent]: { ...updated[index][parent], [child]: value } };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setBookingData(prev => ({ ...prev, travelers: updated }));
  };

  const validateForm = () => {
    for (let i = 0; i < bookingData.travelers.length; i++) {
      const t = bookingData.travelers[i];
      if (!t.name?.trim() || !t.age || !t.gender || !t.documentNumber?.trim()) {
        toast.error(`Please fill all required fields for Traveler ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  // Razorpay Script Loader (same as UserBookings)
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Payment Handler (exact same pattern as UserBookings)
  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error('Razorpay SDK failed to load. Check your internet connection.');
        setLoading(false);
        return;
      }

      const firstItem = bookingItems[0];

      const { data: orderData } = await axios.post('/bookings/create-order', {
        tourId: firstItem.tour._id,
        travelers: bookingData.travelers,
        startDate: firstItem.startDate,
        totalPrice: getTotalPrice(),
        specialRequests: bookingData.specialRequests
      });

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Tripzybee',
        description: `Booking for ${firstItem.tour.title}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await axios.post('/bookings/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: orderData.bookingId
            });

            toast.success('Payment successful! Your trip is confirmed 🎉');

            if (!location.state?.tour) {
              await clearCart();
            }

            navigate(`/user/booking-success/${orderData.bookingId}`);
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
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
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error('Payment failed. Please try again.');
        console.error(response.error);
      });

      rzp.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to initiate payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => bookingItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 lg:bg-slate-50/50 pb-32 lg:pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50 w-full">
        <div className="max-w-6xl mx-auto px-4 h-14 lg:h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-900 lg:text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden lg:inline text-sm font-bold uppercase tracking-tight">Back</span>
          </button>
          
          <div className="flex items-center gap-2 lg:gap-3">
             <div className="flex items-center gap-2">
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                <span className="text-[11px] lg:text-xs font-bold text-slate-900">Details</span>
             </div>
             <ChevronRight size={14} className="text-slate-300" />
             <div className="flex items-center gap-2">
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold">2</div>
                <span className="text-[11px] lg:text-xs font-bold text-slate-400">Payment</span>
             </div>
          </div>
          <div className="w-8 lg:w-10" /> 
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-0 lg:px-6 py-0 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-start">
          
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-2 lg:space-y-6">
            <div className="bg-white px-4 py-6 lg:hidden border-b border-slate-100">
              <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
              <p className="text-xs text-slate-500 mt-1">Provide traveler details for your booking</p>
            </div>

            {/* Traveler Information Section */}
            <section className="bg-white lg:bg-transparent px-4 lg:px-0 py-6 lg:py-0">
              <h2 className="text-[11px] lg:text-sm font-black text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                <User size={16} className="text-amber-500" />
                Traveler Information
              </h2>
              
              <div className="space-y-6 lg:space-y-4">
                {bookingData.travelers.map((traveler, index) => (
                  <div key={index} className="bg-white lg:border border-slate-200 rounded-2xl lg:rounded-3xl p-0 lg:p-6 transition-all">
                    <div className="flex items-center justify-between mb-5 lg:mb-6">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                        Traveler {index + 1} {index === 0 && '• Primary'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="As per Passport/ID"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl px-4 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                          value={traveler.name}
                          onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Age</label>
                          <input 
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl px-4 py-3.5 text-sm focus:bg-white outline-none"
                            value={traveler.age}
                            onChange={(e) => handleTravelerChange(index, 'age', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Gender</label>
                          <select 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl px-4 py-3.5 text-sm focus:bg-white outline-none appearance-none"
                            value={traveler.gender}
                            onChange={(e) => handleTravelerChange(index, 'gender', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Document Type</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl px-4 py-3.5 text-sm focus:bg-white outline-none"
                          value={traveler.documentType}
                          onChange={(e) => handleTravelerChange(index, 'documentType', e.target.value)}
                        >
                          <option value="Passport">Passport</option>
                          <option value="Aadhar">Aadhar Card</option>
                          <option value="DL">Driving License</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">ID Number</label>
                        <input 
                          type="text" 
                          placeholder="Document ID number"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl px-4 py-3.5 text-sm focus:bg-white outline-none"
                          value={traveler.documentNumber}
                          onChange={(e) => handleTravelerChange(index, 'documentNumber', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Special Requests */}
            <section className="bg-white lg:bg-white lg:border border-slate-200 rounded-none lg:rounded-3xl p-4 lg:p-6 mt-2 lg:mt-0">
                <h2 className="text-[11px] lg:text-sm font-black text-slate-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                 <ClipboardList size={16} className="text-amber-500" />
                 Special Requests
                </h2>
                <textarea 
                 rows="3"
                 placeholder="Dietary requirements, room preferences, or special assistance..."
                 className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl px-4 py-3.5 text-sm focus:bg-white outline-none resize-none"
                 value={bookingData.specialRequests}
                 onChange={(e) => setBookingData(p => ({...p, specialRequests: e.target.value}))}
                />
            </section>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4 col-span-1 space-y-6 sticky top-24 lg:top-28">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 lg:p-8 text-white shadow-2xl shadow-slate-200 mx-4 lg:mx-0">
              <h2 className="text-base lg:text-lg font-semibold mb-6">Booking Review</h2>
              
              <div className="space-y-4 mb-8">
                {bookingItems.map((item, idx) => (
                  <div key={idx} className="space-y-2 border-b border-slate-800/30 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex gap-3">
                      <img 
                        src={item.tour.images?.[0]?.url} 
                        className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0" 
                        alt={item.tour.title} 
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs lg:text-sm font-medium leading-tight line-clamp-2">{item.tour.title}</h4>
                        <p className="text-[10px] lg:text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Calendar size={12} /> {new Date(item.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] lg:text-xs py-1">
                      <span className="text-slate-400">{item.travelers} Traveler(s)</span>
                      <span className="font-medium">₹{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}

                <div className="border-t border-slate-800/50 pt-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-[10px] lg:text-xs font-medium text-slate-400 uppercase tracking-wider">Total Amount</p>
                      <p className="text-lg lg:text-2xl font-semibold">₹{getTotalPrice().toLocaleString()}</p>
                    </div>
                    <BadgeCheck className="text-amber-400" size={20} />
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 py-3.5 lg:py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={16} /> Pay Securely
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-4 lg:p-5 flex items-start gap-3 mx-4 lg:mx-0">
               <BadgeCheck className="text-emerald-600 shrink-0 mt-0.5" size={18} />
               <div>
                  <h5 className="text-xs font-medium text-emerald-900 uppercase tracking-wide">Tripzy Guarantee</h5>
                  <p className="text-[10px] lg:text-xs text-emerald-700 mt-1 leading-tight">Verified safe tours & instant confirmation.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 px-6 flex items-center justify-between z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Grand Total</p>
          <div className="flex items-center gap-1">
            <p className="text-lg font-semibold text-slate-900">₹{getTotalPrice().toLocaleString()}</p>
          </div>
        </div>
        <button 
          onClick={handlePayment}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-amber-400 px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Wait...
            </>
          ) : (
            <>
              Continue <Lock size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Checkout;