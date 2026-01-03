import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  MoveRight,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000" 
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000 scale-105" 
          alt="Architectural India"
        />
        {/* Gradient overlays for professional depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
      </div>

      {/* --- NAVIGATION --- */}
  

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16 pt-10 lg:pt-20">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          {/* LEFT: MASSIVE TYPOGRAPHY */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Minus className="text-yellow-400" size={30} />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-yellow-400/80">Tripzy<span className="text-white">Bee</span> </span>
            </div>

            <h1 className="text-[14vw] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-white uppercase italic">
              Ind<span className="text-yellow-400 not-italic">ia</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 mt-4">
              <h2 className="text-4xl lg:text-7xl font-light tracking-tighter text-white/90">
                Unfiltered <br /> 
                <span className="font-black italic text-yellow-400 uppercase">Journeys.</span>
              </h2>
              
              <div className="max-w-xs space-y-6">
                <p className="text-xs lg:text-sm font-medium leading-relaxed text-white/50 border-l border-white pl-6">
                  Experience the subcontinent through the eyes of locals. We eliminate the middleman to bring you direct, conscious, and authentic journeys.
                </p>
                <Link to="/about" className="flex items-center gap-4 pl-6 group cursor-pointer">
                  <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-yellow-400 transition-colors">About Uws</span>
                  <MoveRight className="text-yellow-400 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DATA & BUTTONS --- */}
        <div className="mt-20 lg:mt-32 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 pb-16">
          
          {/* Advanced Button Style */}
          <Link to="/tours" className="group relative flex items-center gap-6 bg-yellow-400 text-black px-12 py-6 rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95">
             <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10">View Trips 2026</span>
             <ChevronRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={20} />
             <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          {/* Minimalist Stats - Refined Alignment */}
          <div className="grid grid-cols-2 lg:flex items-center gap-12 lg:gap-24">
            {[
              { label: 'Destinations', val: '48' },
              { label: 'Local Communities', val: '120+' },
              { label: 'Eco-Rating', val: 'A+' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-400/50">{stat.label}</span>
                <span className="text-2xl lg:text-4xl font-black tracking-tighter">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- DECORATIVE SIDEBAR --- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-20 hidden xl:flex flex-col items-center justify-between py-10 border-l border-white/5">
        <Globe size={16} className="text-yellow-400/20" />
        <div className="h-40 w-[1px] bg-gradient-to-b from-transparent via-yellow-400 to-transparent" />
        <span className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
          Scroll
        </span>
      </div>

    </div>
  );
};

export default HeroSection;