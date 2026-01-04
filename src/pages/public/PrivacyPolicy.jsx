import React from 'react';
import { 
  ShieldCheck, Lock, EyeOff, FileText, 
  UserCheck, Bell, Scale, ArrowLeft, Clock, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const lastUpdated = "January 04, 2026";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
     
      {/* Header Banner */}
      <section className="bg-gray-900 py-12 lg:py-16 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
                <img 
                  src="https://meadowswellness.com/wp-content/uploads/2023/09/privacy-policy-banner.jpg"
                  className="w-full h-full object-cover" 
                  alt="Contact Banner" 
                />
              </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-2">Legal Infrastructure</p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-none uppercase">
            Data <span className="text-amber-500 underline decoration-2 underline-offset-4">Governance</span> & Privacy.
          </h1>
          <p className="text-xs text-gray-400 mt-4 max-w-2xl font-medium tracking-wide leading-relaxed">
            At Tripzybee, we treat your travel data with the same precision as our itineraries. 
            This policy outlines how we encrypt, manage, and protect your digital footprint.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Clock size={12} className="text-amber-500" />
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Detailed Policy Sections */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 01. Information Collection */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-amber-500 italic opacity-50">01</span>
                <h2 className="text-lg font-black uppercase tracking-tight">Data Acquisition</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We collect information necessary to facilitate your travel. This includes <strong>Personal Identifiers</strong> (Name, Email, Phone), <strong>Travel Documentation</strong> (Passport details where required), and <strong>Financial Data</strong> (Processed via secure SSL-encrypted gateways).
              </p>
              <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <p className="text-xs text-gray-500 italic">"Tripzybee never stores raw credit card data on our local servers."</p>
              </div>
            </section>

            {/* 02. Usage of Data */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-amber-500 italic opacity-50">02</span>
                <h2 className="text-lg font-black uppercase tracking-tight">How We Use Your Info</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Service Fulfillment", desc: "Booking hotels, flights, and local 'Bee-Captains'." },
                  { title: "Real-time Alerts", desc: "Dispatching WhatsApp notifications for trip updates." },
                  { title: "Security Checks", desc: "Preventing fraudulent transactions and identity theft." },
                  { title: "Personalization", desc: "Tailoring destination suggestions based on past moves." }
                ].map((item, i) => (
                  <li key={i} className="border border-gray-100 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <h4 className="text-[10px] font-black uppercase text-amber-600 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-tight">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 03. Cookies & Tracking */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-amber-500 italic opacity-50">03</span>
                <h2 className="text-lg font-black uppercase tracking-tight">Digital Tracking</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies to analyze site traffic and optimize your browsing speed. By using the Tripzybee platform, you consent to our use of tracking pixels that help us understand which Himalayan trek or Rajasthan tour interests you most.
              </p>
            </section>

          </div>

          {/* Sidebar - Privacy Highlights */}
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <ShieldCheck size={80} className="absolute -right-4 -bottom-4 text-amber-500/10 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-6 italic uppercase leading-none">Your Privacy<br/><span className="text-amber-500">Guaranteed.</span></h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <Lock className="text-amber-500 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">256-Bit SSL</h4>
                    <p className="text-[11px] text-gray-400 leading-tight mt-1">Military-grade encryption for all data transfers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <EyeOff className="text-amber-500 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Zero Third-Party</h4>
                    <p className="text-[11px] text-gray-400 leading-tight mt-1">We never sell your data to external marketing agencies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <UserCheck className="text-amber-500 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Right to Delete</h4>
                    <p className="text-[11px] text-gray-400 leading-tight mt-1">Request total data erasure at any time via support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-amber-500 rounded-3xl p-6 text-black">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Legal Concierge</h4>
              <p className="text-sm font-black italic mb-4">Privacy Concerns?</p>
              <a href="mailto:Tripzybee@gmail.com" className="flex items-center justify-between bg-black text-white px-4 py-3 rounded-xl hover:scale-[1.02] transition-transform">
                <span className="text-[10px] font-black uppercase">Email Compliance</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Dense Policy Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <Scale size={20} className="text-gray-400" />
            <div>
              <h5 className="text-[10px] font-black uppercase mb-1">Lawful Processing</h5>
              <p className="text-[11px] text-gray-500 font-medium">Governed by the IT Act of India and GDPR compliance standards for international travelers.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Bell size={20} className="text-gray-400" />
            <div>
              <h5 className="text-[10px] font-black uppercase mb-1">Policy Updates</h5>
              <p className="text-[11px] text-gray-500 font-medium">Significant changes will be broadcasted via your registered email address 14 days prior to implementation.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <FileText size={20} className="text-gray-400" />
            <div>
              <h5 className="text-[10px] font-black uppercase mb-1">Consent</h5>
              <p className="text-[11px] text-gray-500 font-medium">By interacting with the Tripzybee platform, you acknowledge and agree to these terms.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicy;