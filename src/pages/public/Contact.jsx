import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Globe, ShieldCheck, Zap, Headphones, ArrowRight,
  ExternalLink, Instagram, Facebook, Twitter
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '', preferredTrip: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', preferredTrip: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Small Compact Banner */}
      <section className="bg-gray-900 py-10 lg:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg" 
            className="w-full h-full object-cover" 
            alt="Contact Banner" 
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-2">Connect with Tripzybee</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white leading-none uppercase">
            Let's Plan Your <span className="text-amber-500 underline decoration-2 underline-offset-4">Next Move.</span>
          </h1>
          <p className="text-xs text-gray-400 mt-3 max-w-xl font-medium tracking-wide">
            Whether it's a corporate retreat or a solo backpack trip, our concierge team 
            is available 24/7 to ensure your itinerary is flawless.
          </p>
        </div>
      </section>

      {/* Main Content Grid - No Extra Padding */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          
          {/* Contact Form Card - Large */}
          <div className="lg:col-span-2 bg-slate-50 border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle size={16} className="text-amber-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Concierge Inquiry</span>
            </div>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-10">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-black italic">MESSAGE RECEIVED!</h3>
                <p className="text-xs text-gray-500 mt-2">Our travel experts will ping you within 60 minutes.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-[10px] font-black uppercase underline decoration-amber-500 underline-offset-4">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="FULL NAME"
                    required
                    className="bg-white border-b-2 border-gray-200 focus:border-amber-500 outline-none p-3 text-xs font-bold uppercase tracking-tighter"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL ADDRESS"
                    required
                    className="bg-white border-b-2 border-gray-200 focus:border-amber-500 outline-none p-3 text-xs font-bold uppercase tracking-tighter"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="PHONE (W/ WHATSAPP)"
                    className="bg-white border-b-2 border-gray-200 focus:border-amber-500 outline-none p-3 text-xs font-bold uppercase tracking-tighter"
                  />
                  <select
                    name="preferredTrip"
                    value={formData.preferredTrip}
                    onChange={handleChange}
                    className="bg-white border-b-2 border-gray-200 focus:border-amber-500 outline-none p-3 text-xs font-bold uppercase tracking-tighter"
                  >
                    <option value="">SELECT DESTINATION</option>
                    <option value="Kashmir">KASHMIR VALLEY</option>
                    <option value="Rajasthan">RAJASTHAN HERITAGE</option>
                    <option value="Kerala">KERALA BACKWATERS</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="TELL US ABOUT YOUR TRAVEL PLANS..."
                  className="w-full bg-white border-b-2 border-gray-200 focus:border-amber-500 outline-none p-3 text-xs font-bold uppercase tracking-tighter resize-none"
                ></textarea>
                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : <><Send size={14} /> Dispatch Inquiry</>}
                </button>
              </form>
            )}
          </div>

          {/* Side Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="bg-amber-500 rounded-2xl p-6 text-black flex-1">
              <h3 className="text-xl font-black mb-4 italic leading-tight">Fastest Support</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60">Emergency Hotline</p>
                  <p className="text-sm font-black">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60">Corporate Queries</p>
                  <p className="text-sm font-black">biz@tripzybee.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60">Office HQ</p>
                  <p className="text-[11px] font-bold leading-tight">123 Travel St, BKC Business Hub, Bangalore, 400051</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-3">Social Pulse</h4>
              <div className="flex justify-between items-center">
                <Instagram size={18} className="hover:text-amber-500 cursor-pointer" />
                <Twitter size={18} className="hover:text-amber-500 cursor-pointer" />
                <Facebook size={18} className="hover:text-amber-500 cursor-pointer" />
                <span className="text-[10px] font-black">@TRIPZYBEE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dense FAQ / Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            {
              title: "Instant Booking",
              desc: "90% of our tours are instantly confirmable. Once payment is made, your digital vouchers are generated by our system automatically.",
              icon: Zap
            },
            {
              title: "Refund Policy",
              desc: "Transparent 7-day cancellation window. Refunds are processed via the original payment method within 3-5 business days.",
              icon: ShieldCheck
            },
            {
              title: "Custom Groups",
              desc: "Planning a college trip or a wedding group? We provide dedicated fleet managers for groups larger than 12 travelers.",
              icon: Globe
            },
            {
              title: "24/7 On-Ground",
              desc: "Our network of local 'Bee-Captains' in every city ensures that if your car breaks down at 3 AM, a replacement is there in 30 mins.",
              icon: Headphones
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 p-5 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-amber-600">
                <item.icon size={18} />
              </div>
              <h4 className="text-sm font-black mb-2 uppercase tracking-tight">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Map Placeholder - Full Width */}
        <div className="bg-gray-100 rounded-3xl h-64 overflow-hidden relative border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center flex-col grayscale opacity-50">
                <MapPin size={40} className="text-gray-400 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest">Global Operations Center — Bangalore, IN</p>
            </div>
            <img src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg" className="w-full h-full object-cover mix-blend-overlay" alt="map" />
        </div>
      </div>

      {/* Mini Footer Strip */}
      
    </div>
  );
};

export default Contact;