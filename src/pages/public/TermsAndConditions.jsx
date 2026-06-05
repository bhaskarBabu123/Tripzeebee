import React from 'react';
import { 
  Gavel, ScrollText, AlertTriangle, Globe, 
  CreditCard, UserX, FileWarning, ArrowLeft,
  Handshake, ShieldAlert, Home, ChevronRight, Scale, Info, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TermsAndConditions = () => {
  const effectiveDate = "January 19, 2026";
  const canonicalUrl = "https://tripzybee.com/terms-and-conditions";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
     <Helmet>
        <title>Terms & Conditions | Tripzybee Official Travel Policy 2026</title>
        <meta name="description" content="Official Terms of Engagement for Tripzybee travel services. Review our 2026 cancellation policies, booking protocols, and traveler responsibilities for group and solo trips." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="Tripzybee Terms, Travel Cancellation Policy India, Group Tour Refund Policy, Solo Travel Legal Terms, Tripzybee Booking Agreement" />
      </Helmet>

      {/* --- COMPACT SEO HEADER (No Big Hero) --- */}
      <header className="bg-gray-50 border-b border-gray-100 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-gray-900">Legal Engagement</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Official Protocol 2026</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
                Terms & <span className="text-amber-500 not-italic">Conditions.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm">
              <Clock size={16} className="text-amber-500" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Last Revised</p>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">{effectiveDate}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT GRID --- */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Detailed Legal Content */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Section 01 */}
            <article>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-amber-500/20 italic leading-none">01</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-amber-500 pb-1">Reservation & Financials</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
                <p>
                  All bookings processed via the <strong>Tripzybee travel ecosystem</strong> are subject to real-time availability. A reservation is only deemed <strong>"Confirmed"</strong> upon the transmission of a unique Booking ID and receipt of the designated commitment deposit.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100">
                    <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2 flex items-center gap-2">
                      <Scale size={14} className="text-amber-600"/> Rate Volatility
                    </h4>
                    <p className="text-[11px] leading-relaxed uppercase opacity-70">Quotes are valid for 24 hours. Flight and luxury accommodation rates remain floating until final payment clearance.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100">
                    <h4 className="text-[11px] font-black uppercase text-gray-900 mb-2 flex items-center gap-2">
                      <Globe size={14} className="text-amber-600"/> Currency Standard
                    </h4>
                    <p className="text-[11px] leading-relaxed uppercase opacity-70">All transactions are settled in INR. International processing fees are the liability of the traveler.</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 02 - Cancellation SEO Optimized */}
            <article>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-amber-500/20 italic leading-none">02</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-amber-500 pb-1">Cancellation Protocol</h2>
              </div>
              <p className="text-sm text-gray-600 mb-8 font-medium">
                Our refund structure is designed to respect the operational commitments made to our <strong>Bee-Captains</strong> and regional vendors across India.
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Timeline</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">Deduction</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold uppercase tracking-tighter">
                    <tr className="border-b border-gray-50"><td className="px-6 py-5">30+ Days Before Trip</td><td className="px-6 py-5 text-right text-green-600">10% Processing</td></tr>
                    <tr className="border-b border-gray-50"><td className="px-6 py-5">15-29 Days Before Trip</td><td className="px-6 py-5 text-right">25% Total Cost</td></tr>
                    <tr className="border-b border-gray-50"><td className="px-6 py-5">07-14 Days Before Trip</td><td className="px-6 py-5 text-right">50% Total Cost</td></tr>
                    <tr className="bg-red-50/50"><td className="px-6 py-5 text-red-900 italic">Within 07 Days / No Show</td><td className="px-6 py-5 text-right text-red-600">100% Non-Refundable</td></tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Section 03 */}
            <article>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-amber-500/20 italic leading-none">03</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-amber-500 pb-1">Liability & Force Majeure</h2>
              </div>
              <div className="p-8 bg-gray-900 rounded-3xl text-gray-300">
                <p className="text-sm leading-relaxed font-medium">
                  Tripzybee acts as an <strong>intermediary travel-tech platform</strong>. We are not liable for <strong>"Force Majeure"</strong> events including natural disasters, flight delays, civil unrest, or government-mandated travel restrictions in the 2026 circuit. Participation in high-altitude treks is voluntary and carries inherent risks.
                </p>
              </div>
            </article>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="space-y-8">
            <div className="sticky top-10 space-y-8">
              
              <div className="bg-amber-500 rounded-3xl p-8 text-black shadow-xl shadow-amber-500/10 relative overflow-hidden">
                <h3 className="text-xl font-black mb-6 italic uppercase leading-none tracking-tighter">Traveler<br/>Responsibilities</h3>
                <ul className="space-y-6">
                  {[
                    { icon: ShieldAlert, text: "Valid travel insurance is mandatory for all trekking packages." },
                    { icon: Globe, text: "Ensure Passport/Visa validity for at least 6 months." },
                    { icon: UserX, text: "Illegal conduct results in immediate tour termination." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <item.icon size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-black uppercase leading-tight">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black rounded-3xl p-8 text-white text-center">
                <Gavel className="mx-auto text-amber-500 mb-4" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Legal Inquiry</p>
                <button className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all">
                  Contact Compliance
                </button>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-100 rounded-3xl">
                <h5 className="text-[10px] font-black uppercase text-gray-400 mb-4">Regional Jurisdiction</h5>
                <p className="text-[11px] font-bold uppercase tracking-tighter text-gray-900">All disputes are subject to the exclusive jurisdiction of the courts in <strong>Bangalore, Karnataka, India</strong>.</p>
              </div>

            </div>
          </aside>
        </div>
      </main>

      {/* --- SEO FOOTER --- */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-60">
           {[
             { icon: CreditCard, title: "Secure Billing", desc: "PCI-DSS compliant encrypted transactions." },
             { icon: AlertTriangle, title: "Risk Consent", desc: "Voluntary participation in adventure sports." },
             { icon: Handshake, title: "Third Party", desc: "Separate hotel/airline frameworks apply." },
             { icon: FileWarning, title: "Severability", desc: "Remaining terms stay in effect if one fails." }
           ].map((item, i) => (
             <div key={i} className="flex flex-col gap-2">
               <item.icon size={16} />
               <h5 className="text-[10px] font-black uppercase text-gray-900">{item.title}</h5>
               <p className="text-[10px] font-medium leading-tight text-gray-500">{item.desc}</p>
             </div>
           ))}
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;