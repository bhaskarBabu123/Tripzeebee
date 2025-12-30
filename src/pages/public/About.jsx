import React from 'react';
import { 
  Users, MapPin, Clock, Star, Heart, Shield, Headphones, 
  Award, Zap, TrendingUp, Sparkles, Smartphone, ShieldCheck,
  ArrowRight, CheckCircle, Globe, Target, Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Small Compact Banner */}
      <section className="bg-gray-900 py-10 lg:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/2104114/pexels-photo-2104114.jpeg" 
            className="w-full h-full object-cover" 
            alt="Banner background" 
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-2">Startup Spotlight 2025</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white leading-none">
            WE ARE <span className="text-amber-500 underline decoration-2 underline-offset-4">TRIPZYBEE.</span>
          </h1>
          <p className="text-xs text-gray-400 mt-3 max-w-xl font-medium tracking-wide">
            India's tech-first travel ecosystem designed to eliminate middle-men, 
            standardize pricing, and deliver hyper-local experiences across 28 states.
          </p>
        </div>
      </section>

      {/* Fully Filled Grid - No Extra Padding */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          
          {/* Main Story Card - Large */}
          <div className="lg:col-span-2 bg-slate-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-amber-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">The Core Mission</span>
              </div>
              <h2 className="text-xl font-bold mb-3">Breaking the status quo of Indian Tourism.</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Tripzybee was founded by a group of engineers and backpackers who realized that travel booking was stuck in 2010. We built a platform that uses AI to curate itineraries but relies on <b>verified local ground teams</b> for execution. We don't just sell tickets; we own the experience from the moment you land until your flight home.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-lg font-black text-gray-900">0%</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Hidden Convenience Fees</p>
              </div>
              <div>
                <p className="text-lg font-black text-gray-900">100%</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Verified Local Partners</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-amber-500 rounded-2xl p-6 text-black flex flex-col justify-between">
            <Rocket size={24} className="mb-4" />
            <div>
              <h3 className="text-2xl font-black mb-1 italic leading-tight">Fastest Growing</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">Travel Startup</p>
              <ul className="space-y-2">
                {['50+ New Weekly Routes', 'Instant WhatsApp Support', 'Mobile-First Vouchers'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-black">
                    <CheckCircle size={12} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/tours" className="mt-6 text-[10px] font-black uppercase bg-black text-white py-3 rounded-xl text-center">Join the Flight</Link>
          </div>
        </div>

        {/* Detailed Feature Cards - Fully Filled */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            {
              icon: ShieldCheck,
              title: "Payment Security",
              desc: "Military-grade encryption for all transactions. We support UPI, Cards, and EMI options with instant digital invoicing and GST compliance."
            },
            {
              icon: Globe,
              title: "Pan-India Reach",
              desc: "From the high passes of Ladakh to the backwaters of Alleppey, our network spans 2,500+ verified hotels and 400+ local transporters."
            },
            {
              icon: Zap,
              title: "AI Itineraries",
              desc: "Our proprietary algorithm analyzes weather, seasonal crowds, and local festivals to suggest the best dates for your specific trip."
            },
            {
              icon: Headphones,
              title: "Human Support",
              desc: "Technology is great, but travel needs humans. Our 24/7 concierge team is composed of actual travelers, not scripted call center agents."
            }
          ].map((card, i) => (
            <div key={i} className="bg-white border border-gray-200 p-5 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-amber-600">
                <card.icon size={18} />
              </div>
              <h4 className="text-sm font-black mb-2 uppercase tracking-tight">{card.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Founder Section - Dense Layout */}
        <div className="bg-gray-900 rounded-3xl p-6 lg:p-10 text-white overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Our Philosophy</span>
              <h3 className="text-2xl font-bold mt-2 mb-4 italic">"Travel is the only thing you buy that makes you richer."</h3>
              <p className="text-sm text-gray-400 leading-loose">
                At Tripzybee, we believe that luxury isn't about expensive hotels; it's about the luxury of <b>seamlessness</b>. Our founders spent years traveling the dusty roads of India to identify exactly where the system breaks—and we built the software to fix it. We are committed to sustainable, responsible, and radical travel.
              </p>
              <div className="flex gap-6 mt-8">
                <div>
                  <p className="text-xs font-black text-white">12k+</p>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Followers</p>
                </div>
                <div className="border-l border-gray-800 pl-6">
                  <p className="text-xs font-black text-white">4.9/5</p>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Google Reviews</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              ].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all">
                  <img src={img} alt="Team member" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Mini CTA */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="border-t border-gray-100 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2025 Tripzybee Tech Pvt Ltd • Made with ❤️ for India</p>
          <div className="flex gap-4">
             <Link to="/contact" className="text-[10px] font-black uppercase text-gray-900 border-b-2 border-amber-500 pb-1">Partner with us</Link>
             <Link to="/careers" className="text-[10px] font-black uppercase text-gray-900 border-b-2 border-amber-500 pb-1">Work with us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;