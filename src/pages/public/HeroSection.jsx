import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Calendar, ArrowRight, Star, 
  ShieldCheck, Zap, Heart, Search, 
  SlidersHorizontal, Navigation,
  ChevronDown, Globe
} from 'lucide-react';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    tourType: '',
    date: ''
  });

  return (
    <section className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      
      {/* --- BACKGROUND / IMAGE LAYER --- */}
      {/* Mobile: Bottom 50% | Desktop: Right 45% */}
      <div className="absolute bottom-0 right-0 w-full h-[50vh] lg:top-0 lg:w-[45%] lg:h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop"
          alt="Premium India Travel"
          className="w-full h-full object-cover object-center"
        />
        {/* Mobile: Darker top gradient to transition from white text area */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent lg:hidden" />
        {/* Desktop: Left gradient for text contrast */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center h-full min-h-screen lg:min-h-0 py-12 lg:py-0">
          
          {/* --- TEXT CONTENT (Always on White Background) --- */}
          {/* Mobile: Top | Desktop: Left */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-amber-50 text-amber-700 mb-4 w-fit">
              <Zap size={12} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Travel Startup 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
              Explore India <br />
              <span className="font-serif italic font-light text-amber-500">unfiltered.</span>
            </h1>
            
            <p className="text-slate-500 text-sm md:text-base max-w-md mb-8 leading-relaxed">
              We eliminate the middleman. Direct itineraries, curated by locals, 
              built for the modern conscious traveler.
            </p>

            {/* Stats Group */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" src={`https://i.pravatar.cc/100?img=${i+12}`} alt="user" />
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">2K+</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-left">
                <div className="flex text-amber-500 scale-90 origin-left">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified Experiences</p>
              </div>
            </div>
          </div>

          {/* --- SEARCH CARD (Floating over the boundary) --- */}
          <div className="lg:col-span-5 xl:col-start-8 mt-12 lg:mt-0">
            <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-50 relative">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Plan Journey</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time availability</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl text-amber-500">
                  <Navigation size={20} />
                </div>
              </div>

              <form className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
                  <select className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 transition-all appearance-none outline-none">
                    <option>Select Destination</option>
                    <option>Kashmir</option>
                    <option>Rajasthan</option>
                    <option>Ladakh</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Date" className="w-full bg-slate-50 border-none rounded-2xl pl-11 py-4 text-sm font-bold text-slate-900 outline-none" onFocus={(e) => e.target.type='date'} />
                  </div>
                  <div className="relative">
                    <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-4 text-sm font-bold text-slate-900 appearance-none outline-none">
                      <option>Style</option>
                      <option>Solo</option>
                      <option>Family</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 group active:scale-95 transition-all shadow-xl shadow-slate-200">
                  <Search size={18} className="text-amber-400" />
                  <span className="text-[11px] uppercase tracking-[0.2em]">Check Availability</span>
                </button>
              </form>

              {/* Mobile Features Bar (App Style) */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Zap size={18} className="text-amber-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Instant</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Heart size={18} className="text-rose-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Local</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Globe size={18} className="text-blue-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM LOGO CLOUD / FOOTER --- */}
      <div className="hidden lg:block relative z-10 bg-white/80 backdrop-blur-sm border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Partnered with 50+ Local Communities</span>
          </div>
          <div className="flex gap-10 font-serif italic text-lg text-slate-400">
            <span>TripAdvisor</span>
            <span>MakeMyTrip</span>
            <span>Outlook Traveller</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;