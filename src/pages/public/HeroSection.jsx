import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Search, Calendar, ArrowRight, 
  Star, ShieldCheck, Zap, Heart 
} from 'lucide-react';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    tourType: '',
    startDate: ''
  });

  const tourTypes = ["Couple", "Family", "Solo", "Adventure"];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchData);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-white">
      {/* Background Image with Gradient for Text Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/013/891/833/small/outdoor-luxury-sunset-over-infinity-pool-swimming-summer-beachfront-hotel-resort-tropical-landscape-beautiful-tranquil-beach-holiday-vacation-background-amazing-island-sunset-beach-view-palm-trees-photo.jpg"
          alt="Taj Mahal India"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Content --- */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white mb-4 backdrop-blur-md">
              <Zap className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">New Age Travel Startup</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Your Local <br />
              <span className="text-amber-400">Journey Expert</span>
            </h1>

            <p className="text-sm md:text-base text-gray-200 max-w-md mb-8 leading-relaxed">
              We eliminate the middleman. Directly curated itineraries, transparent 
              costs, and local guides who know the hidden gems of India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/tours"
                className="px-6 py-3 rounded-lg bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
              >
                Browse Tours
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-amber-500 text-black flex items-center justify-center text-[10px] font-bold">2K+</div>
                </div>
                <span className="text-xs font-medium text-gray-300">Happy Explorers</span>
              </div>
            </div>
          </div>

          {/* --- Right: Clean White Search Card --- */}
          <div className="lg:ml-auto w-full max-w-md">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-amber-500 rounded-full"></div>
                <h3 className="text-slate-900 text-lg font-bold">Plan Your Trip</h3>
              </div>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={searchData.destination}
                      onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                    >
                      <option value="">Select Destination</option>
                      <option value="Kashmir">Kashmir</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Style</label>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-900 text-sm focus:border-amber-500 outline-none"
                      onChange={(e) => setSearchData({...searchData, tourType: e.target.value})}
                    >
                      <option value="">Any</option>
                      {tourTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</label>
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-900 text-sm focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all mt-2 text-sm uppercase tracking-widest"
                >
                  Find Itinerary
                </button>
              </form>

              <div className="mt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Secure Booking
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  Local Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Minimalist Bottom Bar --- */}
      <div className="relative z-10 bg-white border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">4.9 / 5.0</p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">User Experience</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Verified</p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Local Partners</p>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Instant</p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Booking Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;