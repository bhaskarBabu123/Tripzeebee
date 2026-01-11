import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Calendar, Users, MapPin, Star,
  Clock, ArrowRight, CheckCircle, Award,
  Shield, Globe, Zap, ArrowUpRight, 
  Layers, Fingerprint, Activity, MousePointer2,
  Gem, Compass, Wind, HardHat
} from 'lucide-react';
import axios from 'axios';
import HeroSection from './HeroSection';
import TripzyHeroFooter from './TripzyHeroFooter';
import FeaturedToursSection from './FeaturedToursSection';
import ReelExperienceSection from './InstagramExperienceSection';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      const response = await axios.get('/tours/featured/list');
      setFeaturedTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };
   const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};


  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-100">
      <HeroSection />

      {/* --- SECTION 1: SYSTEM VITAL TICKER --- */}
      {/* <div className="py-8 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Network Status: Optimal</span>
          </div>
          <div className="flex gap-12">
            {[
              { label: 'Active Routes', val: '1,240+' },
              { label: 'Verified Stays', val: '450' },
              { label: 'Live Support', val: '24/7' }
            ].map((m, i) => (
              <div key={i} className="hidden sm:block">
                <span className="text-xs font-black text-slate-900">{m.val}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase ml-2 tracking-tighter">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* <TripzyHeroFooter/> */}

      {/* --- SECTION 2: CORE INVENTORY (Main Tour Cards) --- */}
  <FeaturedToursSection 
  isLoading={loading} 
  featuredTours={featuredTours} 
/>

      {/* --- SECTION 3: THE LUXURY LAYER (Tier-1 Experiences) --- */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Gem className="text-amber-500" size={40} />
              <h2 className="text-5xl font-black tracking-tighter leading-tight">The <span className="text-amber-500">Black</span> Collection.</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">Reserved for elite deployments. Our Black Collection features ultra-private logistics, concierge-level support, and sequestered stays in the subcontinent's most remote locations.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="font-black text-amber-500 text-xs uppercase mb-2">Privacy</h4>
                  <p className="text-xs text-slate-300">100% sequestration from commercial routes.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="font-black text-amber-500 text-xs uppercase mb-2">Transport</h4>
                  <p className="text-xs text-slate-300">Private aerial and ground fleet access.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-[3/4] rounded-[2rem] overflow-hidden translate-y-8 shadow-2xl">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5hnBbSBhCA7gwddq5LQpbLYpgS9j8aT7dUWJj1ctHPoehYQCelyc8VyYJ5UbQmVTGz14&usqp=CAU" className="w-full h-full object-cover" alt="Luxury" />
               </div>
               <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070" className="w-full h-full object-cover" alt="Luxury" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: SEASONAL CIRCUITS (Tabular Style Grid) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-2">Seasonal <span className="text-amber-500 italic font-serif">Circuits</span></h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Optimized by Climate Intelligence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { name: 'Rajasthan Heritage', season: 'OCT - MAR', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmn2Cd3hFgLHp3mUYh5Tpcc6hf9Z551TmKog&s', icon: <Compass size={20}/> },
              { name: 'Kodaikanal', season: 'APR - SEP', img: 'https://images.moneycontrol.com/static-mcnews/2024/10/20241004115114_9-guna-caves.jpg', icon: <Wind size={20}/> },
             
              { name: 'Hampi', season: 'JUN - AUG', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHw98E-GTFLuzEXeQC_asNL6fHhu8_pM8Yyg&s', icon: <HardHat size={20}/> },
              { name: 'Varkala', season: 'SEP - MAR', img: 'https://s3.india.com/wp-content/uploads/2025/06/8-Relaxing-Weekend-Escapes-From-Varkala-For-Peace-Seekers.jpg?impolicy=Medium_Widthonly&w=350&h=263', icon: <Globe size={20}/> }
            ].map((c, i) => (
              <div key={i} className="group relative h-96 rounded-[2.5rem] overflow-hidden bg-slate-100">
                <img src={c.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={c.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">{c.icon}</div>
                  <div>
                    <p className="text-amber-500 text-[10px] font-black tracking-widest uppercase mb-1">{c.season}</p>
                    <h4 className="text-white font-bold text-xl">{c.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReelExperienceSection/>

      {/* --- SECTION 5: OPERATIONAL STACK (Tech Advantage) --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black tracking-tighter mb-6 leading-none">Infrastructure <br/> as a <span className="text-amber-500 underline decoration-4 underline-offset-8">Service.</span></h2>
              <p className="text-slate-500 font-medium">We aren't just agents; we are the operating system for modern travel in the subcontinent.</p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                { title: 'Fleet Control', desc: 'Direct GPS tracking of every ground unit for 100% safety.', icon: <Activity size={24}/> },
                { title: 'Asset Ledger', desc: 'Immutable booking confirmations with Tier-1 partners.', icon: <Layers size={24}/> },
                { title: 'Support Mesh', desc: 'Redundant support nodes via satellite and local networks.', icon: <Zap size={24}/> },
                { title: 'Trust Protocol', desc: 'Encrypted escrow for all high-value transactions.', icon: <Shield size={24}/> }
              ].map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-amber-500 shrink-0">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-xs mb-2 tracking-widest">{f.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FLEET & LOGISTICS (Visual Showcase) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <div className="h-[2px] w-12 bg-slate-900" />
              <h2 className="text-4xl font-black tracking-tighter">Proprietary <br/> Logistics Fleet.</h2>
              <p className="text-slate-500 font-medium leading-relaxed">We maintain a curated fleet of over 50+ luxury off-roaders and custom cruisers. Unlike traditional agents who rent cars, we own the experience from the driver to the vehicle specifications.</p>
              <div className="flex gap-4">
                 <div className="text-center p-4 bg-slate-50 rounded-2xl flex-1">
                   <p className="text-xl font-black italic">4x4</p>
                   <p className="text-[9px] font-black uppercase text-slate-400">Terrain Ready</p>
                 </div>
                 <div className="text-center p-4 bg-slate-50 rounded-2xl flex-1">
                   <p className="text-xl font-black italic">Euro 6</p>
                   <p className="text-[9px] font-black uppercase text-slate-400">Emissions Standard</p>
                 </div>
              </div>
           </div>
           <div className="relative h-96 rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070" className="w-full h-full object-cover" alt="Fleet" />
              <div className="absolute inset-0 bg-slate-900/10" />
           </div>
        </div>
      </section>

      {/* --- SECTION 7: SCALABLE CONVERSION (Final CTA) --- */}
    <section className="py-12 md:py-24 px-4 md:px-6 mb-8 md:mb-12">
  <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden">
    
    {/* Background Glow - Adjusted for Mobile */}
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
    </div>

    <div className="relative z-10 space-y-6 md:space-y-8">
      {/* Heading: Responsive sizing from text-3xl to text-7xl */}
      <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black text-white tracking-tighter leading-tight md:leading-none">
        Initiate <span className="text-amber-500">your</span> <br/>
        <span className="text-amber-500">Journey <span className="text-white">with</span> Us</span>
      </h2>

      {/* Buttons: Full width on mobile, auto width on tablet+ */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
        <Link to="/register" className="w-full sm:w-auto bg-amber-500 text-slate-900 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-white transition-all shadow-lg shadow-amber-500/10">
          Create Account
        </Link>
        
        <Link to="/contact" className="w-full sm:w-auto bg-white/5 text-white border border-white/10 backdrop-blur-md px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/10 transition-all">
          Contact Us
        </Link>
      </div>

      {/* Sub-text: Adjusted spacing for small screens */}
      <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.4em] pt-2">
        It always seems impossible until it's done 
      </p>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;