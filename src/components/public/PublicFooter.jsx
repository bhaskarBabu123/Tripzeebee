import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/l.png';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, 
  Instagram, Youtube, ArrowRight, ShieldCheck, 
  Clock, Globe, Heart
} from 'lucide-react';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();
const socialLinks = [
  {
    href: "https://www.instagram.com/tripzybee",
    Icon: Facebook,
  },
  {
    href: "https://twitter.com/tripzybee",
    Icon: Twitter,
  },
  {
    href: "https://www.instagram.com/tripzybee",
    Icon: Instagram,
  },
  {
    href: "https://www.youtube.com/@TripzBee",
    Icon: Youtube,
  },
];
  return (
    <footer className="bg-gray-900 border-t border-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* --- MAIN FOOTER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-20">
          
          {/* Brand Identity */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group transition-transform hover:scale-[1.02]">
              <img src={logo} width={150} alt="Tripzybee Official Logo" className="brightness-110" />
            </Link>
            <p className="text-[12px] font-medium text-gray-400 leading-relaxed uppercase tracking-tight">
              Tripzybee is a premier travel-tech ecosystem delivering curated 2026 group expeditions and solo adventures across India. We focus on <span className="text-amber-500">transparency</span>, <span className="text-amber-500">safety</span>, and digital-first logistics.
            </p>
           <div className="flex gap-4">
      {socialLinks.map(({ href, Icon }, index) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center transition-all hover:bg-amber-500 hover:-translate-y-1 group border border-gray-700/50"
        >
          <Icon className="w-4 h-4 text-gray-400 group-hover:text-black" />
        </a>
      ))}
    </div>

          </div>

          {/* Quick Navigation - Optimized for SEO */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Globe size={14} className="text-amber-500" /> Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home Dashboard' },
                { to: '/tours', label: 'Explore 2026 Tours' },
                { to: '/about-us', label: 'The Bee Story' },
                { to: '/contact-us', label: 'Concierge Support' },
                { to: '/privacy-policy', label: 'Privacy Governance' },
                { to: '/terms-and-conditions', label: 'Legal Engagement' }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to}
                    className="text-[11px] font-black text-gray-500 hover:text-amber-500 flex items-center gap-2 transition-all uppercase tracking-tighter group"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Operations */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <ShieldCheck size={14} className="text-amber-500" /> Trust Center
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-amber-500/30 transition-colors">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest leading-none mb-2">Operational Hours</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter italic">Mon - Sat: 09:00 - 20:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 px-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified 2026 Partner</span>
              </div>
            </div>
          </div>

          {/* Direct Channels */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Direct Channels</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors shadow-lg shadow-black/50">
                  <MapPin className="w-4 h-4 text-amber-500 group-hover:text-black" />
                </div>
                <p className="text-[11px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter italic group-hover:text-gray-200 transition-colors">
                  Lakshmi Tarang Society, RMV 2nd Stage,<br />
                  Sanjayanagara, Bengaluru, KA 560094
                </p>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500 group-hover:text-black" />
                </div>
                <a href="tel:+919036751234" className="text-[13px] font-black text-gray-300 hover:text-amber-500 tracking-tighter">
                  +91 90367 51234
                </a>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-4 h-4 text-amber-500 group-hover:text-black" />
                </div>
                <a href="mailto:Tripzybee@gmail.com" className="text-[13px] font-black text-gray-300 hover:text-amber-500 tracking-tighter">
                  Tripzybee@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- DENSE LEGAL BOTTOM BAR --- */}
        <div className="border-t border-gray-800/50 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">
                © {currentYear} Tripzybee Tours & Travels • Crafted with
              </p>
              <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">for explorers</p>
            </div>
            
            <div className="flex gap-8">
              {[
                { label: 'Sitemap Index', to: '/sitemap' },
                { label: 'Refund Protocol', to: '/refund-policy' },
                { label: 'Compliance', to: '/terms-and-conditions' }
              ].map((link, i) => (
                <Link 
                  key={i} 
                  to={link.to} 
                  className="text-[9px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em] border-b border-transparent hover:border-amber-500 pb-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;