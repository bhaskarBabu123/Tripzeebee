import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Calendar, Users, MapPin, Star,
  Clock, ArrowRight, CheckCircle, Award,
  Shield, Globe, Zap, ArrowUpRight, 
  Layers, Fingerprint, Activity, MousePointer2,
  Gem, Compass, Wind, HardHat, Rocket, Map, Smartphone,
  Heart, HelpCircle, Flame, Umbrella, Sparkles,
  Mountain, Camera, Tent, Coffee
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import HeroSection from './HeroSection';
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

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-100 font-sans">
      <Helmet>
        <title>Tripzybee | #1 Group Trips & Solo Travel Community India 2026</title>
        <meta name="description" content="Official Tripzybee Home. Premium group tours from Bangalore. We specialize in Ladakh bike trips, Spiti expeditions, Meghalaya backpacking, and safe solo female travel. Verified 2026 fixed departures." />
        <meta name="keywords" content="Tripzybee, best travel agency Bangalore, group trips India 2026, solo female travel India, Ladakh bike trip cost, Spiti Valley winter expedition, Meghalaya backpacking tour, Hampi weekend getaway, Kerala group tour for solo travelers, backpacking Northeast India, Ziro festival packages, Tawang monastery tour, Gokarna beach trek, Varkala surfing camps, Coorg homestay group trips, Wayanad adventure travel, Bhutan tours from Bangalore, Vietnam group trip for Indians, Bali solo travel packages, Kedarnath yatra 2026, corporate team building Bangalore, luxury India tours, adventure travel community India." />
        <link rel="canonical" href="https://tripzybee.com/" />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* --- SECTION 1: REGIONAL SPECIALTIES (SEO Authority) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                <Compass size={14} /> Global Footprint
              </h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 italic uppercase">
                Explore <span className="text-amber-500">Regional</span> <br/>Specialties.
              </h3>
              <p className="text-slate-500 font-medium">From <strong>Himalayan high-passes</strong> to <strong>Tropical South India</strong>, our 2026 expeditions are built on 10+ years of ground-level logistics.</p>
            </div>
            <Link to="/tours" className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 transition-all">
              View All Expeditions <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "North India", desc: "Leh Ladakh bike trips, Spiti Valley winter tours, and Kashmir Great Lakes trekking.", tags: ["Mountain Treks", "Bike Trips"], color: "bg-blue-50" },
              { title: "Northeast", desc: "Meghalaya backpacking, Ziro Festival & Arunachal Pradesh tribal expeditions.", tags: ["Eco-Tourism", "Backpacking"], color: "bg-emerald-50" },
              { title: "South India", desc: "Hampi heritage, Coorg coffee trails, and Varkala cliff-side solo retreats.", tags: ["Heritage", "Coastal"], color: "bg-amber-50" }
            ].map((region, idx) => (
              <div key={idx} className={`${region.color} p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between h-[420px] hover:shadow-2xl hover:shadow-slate-200 transition-all group`}>
                <div>
                  <h3 className="text-3xl font-black mb-4 uppercase italic group-hover:text-amber-600 transition-colors">{region.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">{region.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.tags.map(tag => (
                    <span key={tag} className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border border-slate-200">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: FEATURED TOURS --- */}
      <FeaturedToursSection isLoading={loading} featuredTours={featuredTours} />

      {/* --- SECTION 3: THE TRAVEL BLUEPRINT (Trust Section) --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12 border-b border-white/10 pb-20">
            {[
              { h: "Fixed Departures", p: "Verified 2026 travel dates from Bangalore for <strong>Ladakh</strong> and <strong>Spiti</strong>.", i: <Calendar size={32}/> },
              { h: "Solo Friendly", p: "The most trusted <strong>solo female travel community</strong> in India.", i: <Users size={32}/> },
              { h: "Verified Stays", p: "Handpicked <strong>boutique hotels</strong> and luxury camps.", i: <Coffee size={32}/> },
              { h: "Expert Captains", p: "Lead by certified <strong>Bee-Captains</strong> for maximum safety.", i: <Shield size={32}/> }
            ].map((box, i) => (
              <div key={i} className="space-y-6">
                <div className="text-amber-500">{box.i}</div>
                <h4 className="text-lg font-black uppercase italic tracking-tighter">{box.h}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium uppercase tracking-tight" dangerouslySetInnerHTML={{__html: box.p}}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: SOLO TRAVEL FOCUS --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <div className="h-64 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                      <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070" className="w-full h-full object-cover" alt="Group Trip Community India" />
                   </div>
                   <div className="h-40 bg-amber-500 rounded-[2rem] flex flex-col items-center justify-center text-slate-900 p-6 text-center">
                      <p className="text-4xl font-black leading-none mb-1">65%</p>
                      <p className="text-[9px] font-black uppercase tracking-widest leading-tight">Solo Female <br/> Travelers</p>
                   </div>
                </div>
                <div className="pt-12">
                  <div className="h-80 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                      <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974" className="w-full h-full object-cover" alt="Adventure Travel 2026" />
                   </div>
                </div>
             </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl max-w-[240px] hidden md:block">
                <Heart className="text-rose-500 mb-4" fill="currentColor" />
                <p className="text-[11px] font-bold leading-relaxed text-slate-600">"Tripzybee made my first solo trip to Spiti feel like I was traveling with family."</p>
                <p className="text-[9px] font-black uppercase tracking-widest mt-4 text-slate-400">— Ananya, Bangalore</p>
             </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none italic">
              Built for the <br/> <span className="text-amber-500 underline decoration-4">Solo Explorer.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              We specialize in <strong>safe solo travel for women in India</strong>. Our group dynamics are curated to ensure you're never alone unless you want to be. Experience the <strong>best group trips from Bangalore</strong>.
            </p>
            <div className="space-y-4">
               {[
                 { t: "Verified Captains", d: "Professional guides ensuring group safety and vibe.", icon: <Shield size={18}/> },
                 { t: "Female-Friendly Stays", d: "Vetted hotels with top-tier hygiene and safety standards.", icon: <MapPin size={18}/> },
                 { t: "Budget Optimized", d: "Save with shared accommodation options for solo travelers.", icon: <Zap size={18}/> }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-5 hover:bg-white hover:shadow-xl rounded-2xl transition-all group border border-transparent hover:border-slate-100">
                    <div className="text-amber-500 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-black uppercase text-xs tracking-widest mb-1 group-hover:text-amber-600 transition-colors">{item.t}</h4>
                      <p className="text-[12px] text-slate-500 font-medium leading-normal">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: THE BLACK COLLECTION (Luxury) --- */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Gem className="text-amber-500" size={40} />
              <h2 className="text-5xl font-black tracking-tighter leading-tight italic uppercase">The <span className="text-amber-500">Black</span> <br/> Collection.</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed italic">
                Elite <strong>luxury India travel</strong> redefined. Our Black Collection features sequestered stays in <strong>Ladakh boutique camps</strong>, <strong>heritage havelis</strong>, and private <strong>Kerala houseboats</strong>.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="font-black text-amber-500 text-[10px] uppercase mb-2 tracking-widest">Exclusive Access</h4>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">Curated itineraries for high-net-worth <strong>group tours in India</strong>.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="font-black text-amber-500 text-[10px] uppercase mb-2 tracking-widest">White-Glove Support</h4>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">24/7 dedicated concierge for every <strong>Black traveler</strong>.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-[3/4] rounded-[3rem] overflow-hidden translate-y-8 shadow-2xl border border-white/10">
                 <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070" className="w-full h-full object-cover brightness-75" alt="Luxury Travel India 2026 | TripzyBee" />
               </div>
               <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                 <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070" className="w-full h-full object-cover brightness-75" alt="Premium Solo Destinations | TripzyBee" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FAQ (SEO Indexing Value) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
             <HelpCircle className="mx-auto text-amber-500 mb-6" size={40} />
             <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Travel <span className="text-amber-500">Intelligence.</span></h2>
             <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mt-2">Expert answers for 2026 trip planning</p>
          </div>
          <div className="space-y-6">
            {[
              { q: "Can I join a group trip as a solo traveler?", a: "Yes! 70% of Tripzybee travelers join solo. We pair you with same-gender roommates to avoid single supplement fees and foster a community environment from Day 1." },
              { q: "What is included in the tour price?", a: "Most packages include boutique accommodation, internal transport (private SUVs/Minibuses), breakfast/dinner, entry permits, and a dedicated Bee-Captain guide." },
              { q: "How safe is travel for solo women with Tripzybee?", a: "Safety is our DNA. Every trip is vetted for secure stays, and our captains are trained in group safety protocols. We have a 24/7 support line for all travelers." },
              { q: "Do you offer international group trips from India?", a: "Yes, we have confirmed departures for Bali, Vietnam, Bhutan, and Thailand. Check our 'International' tab for details." }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-amber-50 transition-colors">
                <h4 className="font-black text-lg mb-3 flex items-center gap-3">
                   <span className="text-amber-500">0{i+1}.</span> {faq.q}
                </h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed pl-10 italic">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 7: REELS & SOCIAL PROOF --- */}
      <ReelExperienceSection/>

      {/* --- SECTION 8: CONVERSION CALL TO ACTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <Rocket size={200} className="text-white rotate-12" />
          </div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic">
              Ready to <br/> <span className="text-amber-500">Join the Hive?</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-medium text-lg">
              Book your 2026 adventure now. Limited spots available for <strong>Ladakh</strong> and <strong>Northeast India</strong> expeditions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-amber-500 text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-amber-500/20">
                Book My Spot
              </Link>
              <Link to="/contact" className="w-full sm:w-auto bg-white/5 text-white border border-white/10 backdrop-blur-md px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                Contact Concierge
              </Link>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pt-4 italic">
              The Leading <strong>India Travel Community</strong> Bangalore.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;