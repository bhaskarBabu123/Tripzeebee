import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Cookie, Info, Settings, ShieldCheck } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Cookie Framework | Tripzybee Digital Tracking</title>
      </Helmet>
      
      <header className="bg-gray-50 border-b border-gray-100 pt-10 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Digital <span className="text-amber-500 not-italic">Cookies.</span></h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="p-8 border border-gray-100 rounded-3xl hover:border-amber-500 transition-all">
          <Settings className="text-amber-500 mb-4" />
          <h3 className="font-black uppercase text-sm mb-2">Essential Cookies</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Necessary for site security, login persistence, and travel cart functionality. These cannot be disabled.</p>
        </div>
        <div className="p-8 border border-gray-100 rounded-3xl hover:border-amber-500 transition-all">
          <Cookie className="text-amber-500 mb-4" />
          <h3 className="font-black uppercase text-sm mb-2">Analytics Cookies</h3>
          <p className="text-xs text-gray-500 leading-relaxed">Helps us understand which Indian destinations (like Spiti or Kerala) are trending so we can improve our routes.</p>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;