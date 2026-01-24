import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Trash2, Plus, Minus, Calendar, MapPin, 
  Clock, ArrowRight, X, ChevronLeft, ShieldCheck, Info
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const UserCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, loading, removeFromCart, updateCartItem, clearCart, getCartTotal } = useCart();
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleUpdateTravelers = async (itemId, newTravelers) => {
    setUpdating(prev => ({ ...prev, [itemId]: true }));
    try {
      await updateCartItem(itemId, { travelers: newTravelers });
    } catch (error) {
      console.error('Error updating travelers:', error);
    }
    setUpdating(prev => ({ ...prev, [itemId]: false }));
  };

  const handleUpdateDate = async (itemId, newDate) => {
    setUpdating(prev => ({ ...prev, [itemId]: true }));
    try {
      await updateCartItem(itemId, { startDate: newDate });
    } catch (error) {
      console.error('Error updating date:', error);
    }
    setUpdating(prev => ({ ...prev, [itemId]: false }));
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Remove this tour from cart?')) {
      try { await removeFromCart(itemId); } catch (e) { console.error(e); }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  const hasItems = cart?.items?.length > 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32 lg:pb-12">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-slate-50 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-base font-medium text-slate-900 ml-3 flex-1">Cart ({cart?.items?.length || 0})</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">
              Your <span className="text-amber-500">Cart</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">{cart?.items?.length || 0} items selected</p>
          </div>
          {hasItems && (
            <button onClick={() => window.confirm('Clear cart?') && clearCart()} className="flex items-center gap-1 text-sm text-rose-500 font-medium px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          )}
        </div>

        {!hasItems ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Cart is empty</h2>
            <Link to="/tours" className="inline-flex items-center gap-2 bg-slate-900 text-amber-400 font-medium px-8 py-3.5 rounded-2xl text-sm mt-4">
              Explore Tours
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List of Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="bg-white rounded-3xl border border-slate-100 p-4 lg:p-5 hover:border-slate-200 transition-all group">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Image */}
                    <div className="w-full sm:w-44 h-32 sm:h-auto rounded-2xl overflow-hidden shrink-0">
                      <img src={item.tour.images?.[0]?.url || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-slate-900 leading-tight pr-4">{item.tour.title}</h3>
                        <button onClick={() => handleRemoveItem(item._id)} className="text-slate-300 hover:text-rose-500 p-1"><X size={18} /></button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 mb-4 font-medium uppercase tracking-wide">
                        <span className="flex items-center gap-1.5"><MapPin size={12} className="text-amber-500" /> {item.tour.destinations?.[0]}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-amber-500" /> {item.tour.duration?.days}D</span>
                      </div>

                      <div className="flex items-center justify-between gap-4 mt-auto">
                        <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                          <button onClick={() => handleUpdateTravelers(item._id, item.travelers - 1)} disabled={item.travelers <= 1 || updating[item._id]} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all disabled:opacity-30"><Minus size={14} /></button>
                          <span className="w-10 text-center text-xs font-bold">{item.travelers}</span>
                          <button onClick={() => handleUpdateTravelers(item._id, item.travelers + 1)} disabled={updating[item._id]} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Plus size={14} /></button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">₹{item.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-4 hidden lg:block sticky top-24">
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Tax & Fees</span>
                    <span className="text-emerald-400">Included</span>
                  </div>
                  <div className="h-px bg-slate-800 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Total</span>
                    <span className="text-2xl font-bold">₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => navigate('/user/checkout')} className="w-full bg-amber-400 text-slate-900 py-4 rounded-2xl font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile App Bottom Bar */}
      {hasItems && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-5 px-6 pb-8 z-50 flex items-center justify-between rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
            <p className="text-xl font-bold text-slate-900">₹{getCartTotal().toLocaleString()}</p>
          </div>
          <button onClick={() => navigate('/user/checkout')} className="bg-slate-900 text-amber-400 px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2">
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCart;