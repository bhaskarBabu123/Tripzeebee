import React from 'react';
import { 
  ShieldCheck, Lock, EyeOff, FileText, 
  UserCheck, Bell, Scale, ArrowLeft, Clock, ArrowRight,
  Home, ChevronRight, Database, Fingerprint, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const lastUpdated = "January 19, 2026";
  const canonicalUrl = "https://tripzybee.com/privacy-policy";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Helmet>
        <title>Privacy Policy | Tripzybee - Data Governance & Travel Security</title>
        <meta name="description" content="Official Privacy Policy for Tripzybee. Learn how we manage your travel data, ensure SSL-encrypted payments, and maintain GDPR compliance for group and solo trips in 2026." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="Tripzybee Privacy, Travel Data Security India, Encrypted Travel Booking, Solo Travel Data Protection, Tripzybee GDPR Compliance, Secure Payment Travel Bangalore" />
      </Helmet>

      {/* --- COMPACT SEO HEADER --- */}
      <header className="bg-gray-50 border-b border-gray-100 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <Home size={12}/> Home
            </Link>
            <ChevronRight size={10} />
            <span className="text-gray-900">Privacy & Governance</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-amber-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Secure Ecosystem</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
                Data <span className="text-amber-500 not-italic">Privacy.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm">
              <Clock size={16} className="text-amber-500" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Version 2.0.4</p>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Updated: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT GRID --- */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Detailed Policy Sections */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* 01. Information Collection */}
            <article>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-amber-500/20 italic leading-none">01</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-amber-500 pb-1">Data Acquisition</h2>
              </div>
              <div className="space-y-6 text-sm text-gray-600 font-medium leading-relaxed">
                <p>
                  To facilitate seamless <strong>group travel and solo expeditions</strong>, Tripzybee collects essential identifiers. We treat your digital footprint with the same precision as our <strong>Himalayan itineraries</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100 group hover:border-amber-200 transition-colors">
                    <Fingerprint className="text-amber-600 mb-3" size={20} />
                    <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2">Personal Identifiers</h4>
                    <p className="text-[10px] uppercase opacity-70 leading-relaxed">Names, Contact Nodes, and verified ID proofs required for National Park permits and flight manifests.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100 group hover:border-amber-200 transition-colors">
                    <Database className="text-amber-600 mb-3" size={20} />
                    <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2">Technical Logs</h4>
                    <p className="text-[10px] uppercase opacity-70 leading-relaxed">IP addresses and browser telemetry used to optimize the <strong>Tripzybee booking engine</strong> speed.</p>
                  </div>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl">
                  <p className="text-xs text-amber-900 italic font-bold">"Data Sovereignty: Tripzybee never stores raw credit card/CVV data on local servers. All financials are routed via PCI-DSS compliant gateways."</p>
                </div>
              </div>
            </article>

            {/* 02. Usage of Data */}
            <article>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-amber-500/20 italic leading-none">02</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-amber-500 pb-1">Operational Utilization</h2>
              </div>
              <p className="text-sm text-gray-600 mb-8 font-medium italic">Your information is used exclusively to enhance the safety and personalization of your journey.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Service Fulfillment", desc: "Coordinating with verified 'Bee-Captains' and hotels in 28 states.", icon: UserCheck },
                  { title: "Real-time Alerts", desc: "Dispatching trip updates and safety protocols via WhatsApp/Email.", icon: Bell },
                  { title: "Security Integrity", desc: "Monitoring for fraudulent activity and unauthorized access.", icon: Lock },
                  { title: "Experience Personalization", desc: "Tailoring destination clusters based on your past travel history.", icon: Share2 }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 p-5 border border-gray-100 rounded-2xl hover:bg-slate-50 transition-all">
                    <item.icon className="text-amber-600 shrink-0" size={18} />
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 font-bold uppercase opacity-80 leading-tight">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            {/* 03. Cookies & SEO Internal Links */}
            <article>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-amber-500/20 italic leading-none">03</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-amber-500 pb-1">Digital Tracking</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                We utilize tracking pixels to analyze which travel circuits—such as <strong>Ladakh Bike Trips</strong> or <strong>Kerala Solo Backpacking</strong>—are trending. This data is anonymized and used only for improving the Tripzybee user interface. For more details on how we use these small files, please visit our <Link to="/cookie-policy" className="text-amber-600 underline">Cookie Framework</Link>.
              </p>
            </article>
          </div>

          {/* --- SIDEBAR PRIVACY WIDGETS --- */}
          <aside className="space-y-8">
            <div className="sticky top-10 space-y-8">
              
              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <ShieldCheck size={100} className="absolute -right-6 -bottom-6 text-amber-500/10 group-hover:text-amber-500/20 transition-all" />
                <h3 className="text-2xl font-black mb-10 italic uppercase leading-none tracking-tighter">Privacy<br/><span className="text-amber-500">Guarantees.</span></h3>
                <ul className="space-y-8">
                  {[
                    { title: "256-Bit Encryption", desc: "Military-grade SSL for all data tunnels.", icon: Lock },
                    { title: "Non-Disclosure", desc: "We never sell data to 3rd-party ad networks.", icon: EyeOff },
                    { title: "Erasure Rights", desc: "Request total data deletion at any time.", icon: UserCheck }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 relative z-10">
                      <item.icon size={20} className="text-amber-500 shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 leading-tight">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-500 rounded-3xl p-8 text-black shadow-xl shadow-amber-500/10">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3">Legal Concierge</h4>
                <p className="text-sm font-black italic mb-6 leading-tight uppercase">Privacy concerns or data access requests?</p>
                <a href="mailto:Tripzybee@gmail.com" className="flex items-center justify-between bg-black text-white px-5 py-4 rounded-2xl hover:bg-gray-800 transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest">Email Compliance</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="p-6 bg-slate-50 border-2 border-dashed border-gray-200 rounded-3xl">
                <h5 className="text-[10px] font-black uppercase text-gray-400 mb-2">Compliance Note</h5>
                <p className="text-[10px] font-bold text-gray-600 uppercase leading-relaxed">
                  Tripzybee is compliant with the **Information Technology Act, 2000** of India and integrates **GDPR principles** for our international solo travelers.
                </p>
              </div>

            </div>
          </aside>
        </div>

        {/* --- DENSE LEGAL CLUSTER FOOTER --- */}
        <section className="mt-24 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex gap-5">
              <Scale size={24} className="text-amber-600 shrink-0" />
              <div>
                <h5 className="text-[11px] font-black uppercase text-gray-900 mb-2">Lawful Processing</h5>
                <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed opacity-80">Data handling is strictly governed by Indian Cyber Laws and global security standards.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <Bell size={24} className="text-amber-600 shrink-0" />
              <div>
                <h5 className="text-[11px] font-black uppercase text-gray-900 mb-2">Policy Evolution</h5>
                <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed opacity-80">Major changes are broadcasted via registered email 14 days prior to implementation.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <FileText size={24} className="text-amber-600 shrink-0" />
              <div>
                <h5 className="text-[11px] font-black uppercase text-gray-900 mb-2">Implied Consent</h5>
                <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed opacity-80">Interaction with Tripzybee digital assets constitutes acceptance of these protocols.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">© 2026 Tripzybee Tech Pvt Ltd • Bengaluru HQ</p>
          <div className="flex gap-8">
            <Link to="/terms-and-conditions" className="text-[10px] font-black text-amber-500 uppercase border-b border-amber-500/30 pb-1">Terms of Service</Link>
            <Link to="/contact" className="text-[10px] font-black text-amber-500 uppercase border-b border-amber-500/30 pb-1">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;