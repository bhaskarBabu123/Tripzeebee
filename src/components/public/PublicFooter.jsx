import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight 
} from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="text-lg font-semibold block leading-tight">Tripzy</span>
                <span className="text-amber-400 text-sm font-medium">bee</span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed max-w-xs">
              Thoughtfully designed trips across India. Small groups, local guides, 
              transparent pricing.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-black/20 hover:bg-amber-500/20 flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-black/20 hover:bg-amber-500/20 flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-black/20 hover:bg-amber-500/20 flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-black/20 hover:bg-amber-500/20 flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-1">
              Quick links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/tours', label: 'Tours' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to}
                    className="text-xs text-gray-400 hover:text-amber-400 inline-flex items-center gap-1 transition-colors group"
                  >
                    {item.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">Tour categories</h3>
            <ul className="space-y-2">
              {[
                'Adventure', 'Cultural', 'Beach', 
                'Mountain', 'Wildlife', 'Pilgrimage'
              ].map((category) => (
                <li key={category}>
                  <Link 
                    to={`/tours?tourType=${category}`}
                    className="text-xs text-gray-400 hover:text-amber-400 transition-colors block"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">Get in touch</h3>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>123 Travel Street</p>
                  <p>Mumbai, MH 400001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href="tel:+919876543210" className="hover:text-amber-400 transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href="mailto:info@tripzybee.com" className="hover:text-amber-400 transition-colors">
                  info@tripzybee.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2025 Tripzybee. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-amber-400 transition-colors">
                Terms
              </Link>
              <Link to="/refund" className="hover:text-amber-400 transition-colors">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
