import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Company Profile */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-white p-1 rounded-md">
                 <img src={logo} width={140} alt="Tripzybee Logo" />
              </div>
            </Link>
            <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">
              Tripzybee is your trusted partner for seamless travel experiences across India. 
              From curated holiday packages to reliable transportation, we focus on 
              delivering comfort, transparency, and unforgettable memories.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 group">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/tours', label: 'Explore Tours' },
                { to: '/about', label: 'Our Story' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms and  Conditions' }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to}
                    className="text-xs text-gray-400 hover:text-amber-400 flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Hours / Trust */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Why Choose Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span className="text-xs">Verified Travel Partner</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-300">Support Hours</p>
                  <p className="text-[11px]">Mon - Sat: 09:00 AM - 08:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Contact Details
            </h3>
            <div className="space-y-5 text-xs text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Lakshmi Tarang Society, 3rd Main Road,<br />
                  RMV 2nd Stage, KGE Layout, Sanjayanagara,<br />
                  Bengaluru, Karnataka 560094
                </p>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <a href="tel:+919036751234" className="hover:text-amber-400 transition-colors text-[13px] font-medium text-gray-300">
                  +91 90367 51234
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <a href="mailto:Tripzybee@gmail.com" className="hover:text-amber-400 transition-colors text-[13px]">
                  Tripzybee@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Tripzybee Tours & Travels. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-white cursor-pointer">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-white cursor-pointer">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;