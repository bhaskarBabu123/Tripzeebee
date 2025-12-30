import React from 'react';
import { ArrowUpRight, Zap, MoveRight } from 'lucide-react';

const TripzyHeroFooter = () => {
  return (
    <div className="w-full bg-[#050505] overflow-hidden">
      
      {/* --- SCROLLING MARQUEE SECTION --- */}
      <div className="relative py-6 border-y border-white/5 bg-black flex items-center overflow-hidden">
        {/* Continuous Scrolling Container */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-[60px] lg:text-[80px] font-black text-transparent opacity-20 uppercase tracking-tighter" style={{WebkitTextStrokeColor:"#fff !important", WebkitTextStrokeWidth:'1px !important'}}>
                TripzyBee
              </span>
              <span className="text-[60px] lg:text-[80px] font-black text-yellow-400 uppercase tracking-tighter italic">
                Unfiltered
              </span>
              <div className="w-12 h-12 rounded-full border border-yellow-400/30 flex items-center justify-center">
                <Zap size={20} className="text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CSS Animation Logic (Add to your global CSS or Tailwind config) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .stroke-white {
            -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          }
        `}} />
      </div>

    
      
      {/* Footer Decoration */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent opacity-30" />
    </div>
  );
};

export default TripzyHeroFooter;