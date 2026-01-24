import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  MoveRight,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import video from './hero_bg2.mp4';

const HeroSection = () => {
  const [sWidth, setSWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileVideo =
    'https://static.vecteezy.com/system/resources/previews/009/266/022/mp4/magelang-indonesia-2022-aerial-view-mount-sumbing-kkali-angkrik-nepal-van-java-free-video.mp4';

  const desktopVideo = video;

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* --- CINEMATIC BACKGROUND (VIDEO) --- */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-100 hover:grayscale-0 transition-all duration-1000 scale-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={sWidth < 568 ? mobileVideo : desktopVideo}
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
      </div>

      <main className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16 pt-10 lg:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          {/* LEFT: MASSIVE TYPOGRAPHY (SEO Optimized) */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Minus className="text-yellow-400" size={30} />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-yellow-400/80">
                Tripzy<span className="text-white">Bee</span> • India's Group Trip Experts
              </span>
            </div>

            {/* Main SEO Heading disguised in the massive UI */}
            <h1 className="text-[14vw] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-white uppercase italic">
              Ind<span className="text-yellow-400 not-italic">ia</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 mt-4">
              <h2 className="text-4xl lg:text-7xl font-light tracking-tighter text-white/90">
                Solo Friendly <br /> 
                <span className="font-black italic text-yellow-400 uppercase">Group Trips.</span>
              </h2>
              
              <div className="max-w-xs space-y-6">
                <p className="text-xs lg:text-[15px] font-medium leading-relaxed text-white/60 border-l-2 border-amber-500 pl-8">
                Tripzybee is the <strong className="text-white">best travel agency in Bangalore</strong> for 2026. We engineer <strong>solo travel packages</strong>, <strong>Ladakh bike trips</strong>, and <strong>backpacking expeditions</strong> across the Himalayas and South India.
              </p>
                <Link to="/about" className="flex items-center gap-4 pl-6 group cursor-pointer">
                  <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
                    Best Travel Agency Bangalore
                  </span>
                  <MoveRight className="text-yellow-400 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DATA & BUTTONS --- */}
        <div className="mt-20 lg:mt-32 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 pb-16">
          {/* Advanced Button Style */}
          <Link
            to="/tours"
            className="group relative flex items-center gap-6 bg-yellow-400 text-black px-12 py-6 rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95 shadow-xl shadow-yellow-400/10"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10">
              Explore All Trips 2026
            </span>
            <ChevronRight
              className="relative z-10 group-hover:translate-x-2 transition-transform"
              size={20}
            />
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          {/* Minimalist Stats - Keywords used in labels */}
          <div className="grid grid-cols-2 lg:flex items-center gap-12 lg:gap-24">
            {[
              { label: 'Active Group Routes', val: '50+' },
              { label: 'Verified Stays', val: '450+' },
              { label: 'Safety Rating', val: '5.0' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-400/50">
                  {stat.label}
                </span>
                <span className="text-2xl lg:text-4xl font-black tracking-tighter">
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;