import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Network, Globe, UserCircle, 
  Settings, ChevronRight, LayoutGrid, Map, 
  Shield, Home, Clock, Fingerprint, ExternalLink
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Sitemap = () => {
  const lastUpdated = "January 19, 2026";
  const canonicalUrl = "https://tripzybee.com/sitemap";

  const sitemapSections = [
    {
      title: "Public Experience",
      icon: Globe,
      description: "Primary guest-facing discovery routes.",
      links: [
        { name: "Home Dashboard", path: "/" },
        { name: "Explore All Tours", path: "/tours" },
        { name: "Company Story (About)", path: "/about" },
        { name: "Contact & Concierge", path: "/contact" },
        { name: "Traveler Login", path: "/login" },
        { name: "Join the Hive (Register)", path: "/register" },
      ]
    },
    {
      title: "Traveler Portal",
      icon: UserCircle,
      description: "Secure authenticated user management.",
      links: [
        { name: "Identity Profile", path: "/user/profile" },
        { name: "My Bookings", path: "/user/bookings" },
        { name: "Travel Cart", path: "/user/cart" },
        { name: "Wishlist Nodes", path: "/user/wishlist" },
      ]
    },
    {
      title: "Governance & Safety",
      icon: Shield,
      description: "Legal frameworks and data protocols.",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Engagement", path: "/terms-and-conditions" },
        { name: "Refund Protocol", path: "/refund-policy" },
        { name: "Cookie Framework", path: "/cookie-policy" },
      ]
    },
    {
      title: "Control Center",
      icon: Settings,
      description: "Internal administrative operations.",
      links: [
        { name: "Global Analytics", path: "/admin" },
        { name: "User Management", path: "/admin/users" },
        { name: "Inventory (Tours)", path: "/admin/tours" },
        { name: "Finance (Bookings)", path: "/admin/bookings" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Helmet>
        <title>Sitemap | Tripzybee - Visual App Architecture</title>
        <meta name="description" content="Navigate the Tripzybee travel ecosystem. Access all tours, traveler profiles, legal governance, and administrative nodes in one organized directory." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* --- COMPACT SEO HEADER --- */}
      <header className="bg-gray-50 border-b border-gray-100 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <Home size={12}/> Home
            </Link>
            <ChevronRight size={10} />
            <span className="text-gray-900">Site Directory</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Network size={16} className="text-amber-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Infrastructure Map</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
                App <span className="text-amber-500 not-italic">Architecture.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm">
              <Clock size={16} className="text-amber-500" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Index Updated</p>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">{lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- DIRECTORY GRID --- */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {sitemapSections.map((section, idx) => (
            <section key={idx} className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-900 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all shadow-lg shadow-gray-200">
                  <section.icon size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-tight text-gray-900 leading-none">{section.title}</h3>
                  <p className="text-[9px] text-gray-400 uppercase font-bold mt-1 tracking-tighter italic">Directory Node {idx + 1}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-relaxed tracking-tight">
                  {section.description}
                </p>
              </div>
              
              <ul className="space-y-3 border-l-2 border-gray-50 ml-5 pl-5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.path} 
                      className="text-[11px] font-extrabold text-gray-600 hover:text-amber-600 uppercase tracking-tighter flex items-center gap-2 transition-all group/link"
                    >
                      <ChevronRight size={10} className="text-amber-500 opacity-0 group-hover/link:opacity-100 -ml-2 group-hover/link:ml-0 transition-all" />
                      <span className="group-hover/link:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* --- SYSTEM STATUS CARD --- */}
        <div className="mt-24 p-12 bg-gray-900 rounded-[3rem] relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-white group-hover:opacity-10 transition-opacity">
            <Network size={200} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Fingerprint className="text-amber-500" size={24} />
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Protocol Version 4.2.0</span>
              </div>
              <h2 className="text-3xl font-black text-white uppercase italic leading-none tracking-tighter mb-4">
                Integrated Routing System
              </h2>
              <p className="text-xs text-gray-400 font-medium max-w-md leading-relaxed">
                This sitemap reflects the real-time URL hierarchy of the Tripzybee ecosystem. All routes are secured with 256-bit SSL and monitored for uptime via our Global Operations Center.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Online</span>
                </div>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Live Routes</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <LayoutGrid size={12} className="text-amber-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">24 Nodes</span>
                </div>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Logic Clusters</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Corporate Info Footer */}
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <p>© 2026 Tripzybee Tech Pvt Ltd • Bengaluru, IN</p>
          <div className="flex gap-8">
            <Link to="/contact" className="hover:text-amber-600 transition-colors">Support</Link>
            <Link to="/privacy-policy" className="hover:text-amber-600 transition-colors">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-amber-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sitemap;