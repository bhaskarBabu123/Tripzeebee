import React from 'react';
import { 
  Users, MapPin, ShieldCheck, Target, 
  CheckCircle, Award, Globe, 
  Star, Home, ChevronRight,
  Fingerprint, Bike, 
  Cpu, Users2, Workflow, Camera,
  CalendarRange, Mountain, Backpack, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImage from '../../assets/about.png';
import SEO from '../../seo/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-100 selection:text-black font-sans leading-relaxed">
      <SEO 
        title="About Us | Tripzybee - Best Group Tours & Solo Travel India"
        description="Learn about Tripzybee, Bangalore's favorite travel company. We organize safe group trips for solo travelers, women, and friends to places like Ladakh, Spiti, and Meghalaya."
        keywords="Tripzybee Bangalore, group travel India, safe solo female travel India, Ladakh bike trip organizers, Spiti Valley tour packages, Meghalaya backpacking, best travel agency Bangalore, group trips for solo travelers, adventure tours India"
        path="/about"
      />

      {/* --- SIMPLE BREADCRUMBS --- */}
      <nav className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          <Link to="/" className="hover:text-amber-500 transition-all flex items-center gap-1"><Home size={12}/> Home</Link>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-slate-900">About Our Company</span>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[65vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src={aboutImage} 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Tripzybee group travelers in the mountains" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-6xl md:text-[9rem] font-black leading-none tracking-tighter italic uppercase text-white mb-6">
            Travel <br/> <span className="text-amber-500">Together.</span>
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto text-sm md:text-xl font-bold uppercase tracking-widest leading-relaxed">
            The simplest way to explore India with a <strong className="text-white underline decoration-amber-500">Group of Friends</strong> you haven't met yet.
          </p>
        </div>
      </section>

      {/* --- SECTION 1: OUR STORY (NATURAL WORDS) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <Heart className="text-amber-500" size={24} />
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Why We Started</h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-black italic uppercase leading-tight tracking-tighter">
                Making Travel <br/> <span className="text-amber-500">Easy & Fun.</span>
              </h3>
              <div className="space-y-6 text-slate-600 font-medium text-lg lg:text-xl leading-relaxed">
                <p>
                  Tripzybee was started by a group of friends in <strong>Bangalore</strong> who loved backpacking but hated how difficult it was to plan a safe trip. We wanted to create a community where anyone could join a <strong>group tour</strong> without worrying about safety or high costs.
                </p>
                <p>
                  Today, we focus on <strong>local experiences</strong>. We don't just take you to famous places; we introduce you to the local culture, hidden cafes, and the best homestays in <strong>Ladakh, Spiti, and Kerala</strong>.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000" className="rounded-[2rem] h-64 w-full object-cover shadow-xl" alt="Backpacker in India" />
               <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000" className="rounded-[2rem] h-64 w-full object-cover shadow-xl mt-10" alt="Mountain Trekking" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: TRUST & SAFETY --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
              Your <span className="text-amber-500">Safety</span> is Our Job.
            </h4>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Verified Stays • Expert Guides • 24/7 Support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                t: "Female-Friendly", 
                d: "Over 60% of our travelers are women. We prioritize <strong>safe hotels</strong> and female-only batches for total peace of mind.",
                i: <ShieldCheck />
              },
              { 
                t: "Local Trip Leaders", 
                d: "Our <strong>Bee-Captains</strong> are locals who know the routes perfectly. They aren't just guides; they are your travel buddies.",
                i: <Users2 />
              },
              { 
                t: "No Hidden Costs", 
                d: "What you see is what you pay. Our <strong>budget group trips</strong> include stay, transport, and most meals with zero surprises.",
                i: <Star />
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-8">
                  {React.cloneElement(card.i, { size: 24 })}
                </div>
                <h5 className="text-xl font-black uppercase italic mb-4 tracking-tight">{card.t}</h5>
                <p className="text-slate-500 font-medium text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: card.d}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: POPULAR DESTINATIONS (SEO HEAVY) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1000" 
              alt="Solo traveler in Meghalaya" 
              className="rounded-[4rem] shadow-2xl"
            />
            <div className="absolute top-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl hidden md:block">
               <MapPin className="text-amber-500 mb-2" />
               <p className="text-xs font-black uppercase tracking-widest">Main Hub: Bangalore</p>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">
              Where do we <br/> <span className="text-amber-500">Go Next?</span>
            </h4>
            <p className="text-slate-600 text-lg font-medium">
              We specialize in <strong>Fixed Departure Tours</strong> from Bangalore. Whether you want to ride a bike in Ladakh or relax on the beaches of South India, we have a plan for you.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Bike className="text-amber-500" />
                <span className="font-bold uppercase text-sm">North India: Ladakh, Spiti, Kasol & Manali</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Backpack className="text-amber-500" />
                <span className="font-bold uppercase text-sm">North-East: Meghalaya, Tawang & Ziro Valley</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Globe className="text-amber-500" />
                <span className="font-bold uppercase text-sm">International: Vietnam, Bhutan & Bali</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: STATS --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Happy Travelers", val: "12,000+", i: <Users /> },
              { label: "Trips Every Year", val: "500+", i: <CalendarRange /> },
              { label: "States Covered", val: "22+", i: <MapPin /> },
              { label: "Customer Rating", val: "4.9/5", i: <Star fill="currentColor" /> }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-center text-amber-500 mb-4">{stat.i}</div>
                <p className="text-4xl md:text-5xl font-black italic tracking-tighter">{stat.val}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: CALL TO ACTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Camera className="mx-auto text-amber-500 mb-10" size={48} />
           <h4 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-10">Stop Waiting, <span className="text-amber-500">Start Traveling.</span></h4>
           <p className="text-slate-600 text-lg lg:text-xl font-medium mb-12 italic leading-relaxed">
             "You don't need to wait for your friends to be free. Join a Tripzybee group and meet like-minded people who love exploring as much as you do."
           </p>
           <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tours" className="px-10 py-5 bg-amber-500 text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all">See All Trips</Link>
              <Link to="/contact" className="px-10 py-5 border-2 border-slate-900 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all">Chat with Us</Link>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h5 className="text-xl font-black italic uppercase tracking-tighter">Tripzybee Travel</h5>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Made with ❤️ in Bangalore, India</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link to="/privacy-policy" className="hover:text-amber-500">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-amber-500">Terms</Link>
            <Link to="/contact-us" className="hover:text-amber-500">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;