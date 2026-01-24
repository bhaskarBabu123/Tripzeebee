import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Globe, ShieldCheck, Zap, Headphones, ArrowRight,
  ExternalLink, Instagram, Facebook, Twitter, Map
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import contactImage from '../../assets/contact.png'

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
      {/* SEO HELMET - Helps you rank for "Travel Agency Bangalore" */}
      <Helmet>
        <title>Contact Tripzybee | Travel Agency Bangalore | Group Trip Inquiry</title>
        <meta name="description" content="Contact Tripzybee, Bangalore's leading travel agency for group trips, solo travel, and corporate offsites. Get 24/7 travel support for Ladakh, Spiti, and Kerala tours." />
        <meta name="keywords" content="Contact Tripzybee, Travel Agency Bangalore office, Group tour inquiry India, Solo travel support, Corporate offsite planners Bangalore" />
      </Helmet>

      {/* --- SMALL COMPACT BANNER --- */}
      <section className="bg-gray-900 py-10 lg:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={contactImage} 
            className="w-full h-full object-cover" 
            alt="Tripzybee Bangalore Office" 
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-black mb-2">Connect with Tripzybee</p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-none uppercase italic">
            Let's Plan Your <span className="text-amber-500 underline decoration-2 underline-offset-4 not-italic">Next Move.</span>
          </h1>
          <p className="text-xs text-gray-400 mt-4 max-w-xl font-medium tracking-wide leading-relaxed">
            Searching for the <strong>best travel agency in Bangalore</strong>? Whether it's a <strong>corporate offsite</strong> or a <strong>solo backpack trip</strong>, our concierge team is available 24/7 to ensure your India tour is flawless.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          
          {/* CONTACT FORM CARD */}
          <div className="lg:col-span-2 bg-slate-50 border border-gray-100 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle size={16} className="text-amber-600" />
              <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Group Trip & Solo Inquiry Form</h2>
            </div>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-green-200">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-black italic">MESSAGE RECEIVED!</h3>
                <p className="text-xs text-gray-500 mt-2">Our travel experts will ping you within 60 minutes.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-[10px] font-black uppercase underline decoration-amber-500 underline-offset-4">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="E.G. RAHUL SHARMA"
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase tracking-tighter transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="NAME@DOMAIN.COM"
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase tracking-tighter transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">WhatsApp Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase tracking-tighter transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Destination</label>
                    <select
                      name="preferredTrip"
                      value={formData.preferredTrip}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase tracking-tighter transition-all appearance-none"
                    >
                      <option value="">SELECT DESTINATION</option>
                      <option value="Kashmir">KASHMIR VALLEY</option>
                      <option value="Ladakh">LADAKH EXPEDITION</option>
                      <option value="Spiti">SPITI VALLEY ROADTRIP</option>
                      <option value="Meghalaya">MEGHALAYA BACKPACKING</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Tour Details</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="TELL US ABOUT YOUR TRAVEL PLANS, GROUP SIZE, AND DATES..."
                    className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase tracking-tighter resize-none transition-all"
                  ></textarea>
                </div>
                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  {loading ? 'Processing...' : <><Send size={14} /> Dispatch Inquiry</>}
                </button>
              </form>
            )}
          </div>

          {/* --- SIDE INFO PANEL --- */}
          <div className="flex flex-col gap-4">
            <div className="bg-amber-500 rounded-3xl p-8 text-black flex-1 shadow-xl shadow-amber-100">
              <h3 className="text-2xl font-black mb-6 italic leading-tight uppercase">Bangalore HQ</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 flex items-center gap-1"><Phone size={10}/> Emergency Hotline</p>
                  <p className="text-lg font-black tracking-tighter">+91 90367 51234</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 flex items-center gap-1"><Mail size={10}/> Support Email</p>
                  <p className="text-sm font-black underline decoration-2 underline-offset-4">Tripzybee@gmail.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 flex items-center gap-1"><MapPin size={10}/> Registered Office</p>
                  <p className="text-[11px] font-bold leading-relaxed mt-1 uppercase tracking-tight">
                    Lakshmi Tarang Society, 3rd Main Road,<br />
                    RMV 2nd Stage, KGE Layout, Sanjayanagara,<br />
                    Bengaluru, Karnataka 560094
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                <Globe size={14} /> Social Pulse
              </h4>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <Instagram size={20} className="hover:text-amber-500 cursor-pointer transition-colors" />
                <Twitter size={20} className="hover:text-amber-500 cursor-pointer transition-colors" />
                <Facebook size={20} className="hover:text-amber-500 cursor-pointer transition-colors" />
                <div className="w-[1px] h-4 bg-white/20"></div>
                <span className="text-[10px] font-black tracking-widest text-amber-500">@TRIPZYBEE</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- DENSE FAQ / SERVICE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            {
              title: "Instant Booking",
              desc: "Confirm <strong>India group tours</strong> instantly. Secure payments and automated digital vouchers.",
              icon: Zap
            },
            {
              title: "Safe Solo Travel",
              desc: "Verified <strong>solo female travel</strong> support. We prioritize safety and vetted local captains.",
              icon: ShieldCheck
            },
            {
              title: "Corporate Offsites",
              desc: "Specialized fleet management for <strong>corporate groups in Bangalore</strong> and offsite events.",
              icon: Globe
            },
            {
              title: "24/7 Bee-Support",
              desc: "On-ground support for <strong>Ladakh and Spiti</strong>. Emergency vehicle replacement in 30 mins.",
              icon: Headphones
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl hover:border-amber-200 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <item.icon size={20} />
              </div>
              <h4 className="text-sm font-black mb-3 uppercase tracking-tight">{item.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
            </div>
          ))}
        </div>

        {/* --- MAP SECTION --- */}
        <div className="bg-gray-100 rounded-[3rem] h-80 overflow-hidden relative border border-gray-200 shadow-inner group">
            <div className="absolute inset-0 flex items-center justify-center flex-col grayscale group-hover:grayscale-0 transition-all duration-1000">
                <div className="z-20 bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-100">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <p className="text-[10px] font-black uppercase tracking-widest">Live HQ: Sanjayanagara, Bangalore</p>
                </div>
                <img src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Bangalore Location" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;