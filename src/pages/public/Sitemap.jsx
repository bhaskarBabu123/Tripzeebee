import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Network, Globe, UserCircle, 
  Settings, ChevronRight, LayoutGrid, Map, 
  Shield
} from 'lucide-react';

const Sitemap = () => {
  const sitemapSections = [
    {
      title: "Public Experience",
      icon: Globe,
      color: "text-amber-500",
      links: [
        { name: "Home Dashboard", path: "/" },
        { name: "Explore All Tours", path: "/tours" },
        { name: "Company Story (About)", path: "/about" },
        { name: "Contact & Concierge", path: "/contact" },
        { name: "Partner Login", path: "/login" },
        { name: "Join Tripzybee", path: "/register" },
      ]
    },
    {
      title: "Traveler Portal",
      icon: UserCircle,
      color: "text-blue-500",
      links: [
        { name: "Identity Profile", path: "/user/profile" },
        { name: "My Bookings", path: "/user/bookings" },
        { name: "Travel Cart", path: "/user/cart" },
      ]
    },
    {
      title: "Legal & Safety",
      icon: Shield,
      color: "text-green-500",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Engagement", path: "/terms" },
        { name: "Refund Protocol", path: "/terms#refunds" },
      ]
    },
    {
      title: "Control Center (Admin)",
      icon: Settings,
      color: "text-red-500",
      links: [
        { name: "Global Analytics", path: "/admin" },
        { name: "User Management", path: "/admin/users" },
        { name: "Inventory (Tours)", path: "/admin/tours" },
        { name: "Operations (Bookings)", path: "/admin/bookings" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Header */}
      <section className="bg-gray-900 py-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
                <img 
                  src="https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-tourism-travel-lighthouse-cloud-image_14516.jpg"
                  className="w-full h-full object-cover" 
                  alt="Contact Banner" 
                />
              </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 ">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-bold mb-3">Structural Overview</p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-none uppercase italic">
            App <span className="text-amber-500 underline decoration-2 underline-offset-8 italic">Architecture</span>.
          </h1>
          <p className="text-xs text-gray-400 mt-6 max-w-xl font-medium tracking-wide leading-relaxed">
            A comprehensive index of the Tripzybee ecosystem. Navigate through 
            public, protected, and administrative directories.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sitemapSections.map((section, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-amber-500 transition-colors`}>
                  <section.icon size={20} className="text-gray-900 group-hover:text-black" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight">{section.title}</h3>
              </div>
              
              <ul className="space-y-3 border-l border-gray-100 ml-4 pl-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.path} 
                      className="text-[11px] font-bold text-gray-500 hover:text-amber-600 uppercase tracking-tighter flex items-center gap-2 transition-all group/link"
                    >
                      <ChevronRight size={10} className="opacity-0 group-hover/link:opacity-100 -ml-2 group-hover/link:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Visual Map Footer */}
        <div className="mt-20 p-10 bg-gray-50 rounded-[40px] border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
            <Network className="text-amber-500" size={30} />
          </div>
          <h2 className="text-xl font-black italic uppercase mb-2 leading-none text-gray-900">Integrated Routing System</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
            This sitemap reflects the latest stable version of Tripzybee's URL hierarchy as of 2026.
          </p>
          <div className="flex gap-4 mt-8">
             <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[9px] font-black text-gray-600 uppercase">Live Routes</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
               <LayoutGrid size={12} className="text-blue-500" />
               <span className="text-[9px] font-black text-gray-600 uppercase">24 Logic Nodes</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;