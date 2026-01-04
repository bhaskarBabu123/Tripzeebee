import React from 'react';
import { 
  Gavel, ScrollText, AlertTriangle, Globe, 
  CreditCard, UserX, FileWarning, ArrowLeft,
  Handshake, ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const effectiveDate = "January 04, 2026";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Header Banner */}
      <section className="bg-gray-900 py-12 lg:py-16 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
                   <img 
                     src="https://thumbs.dreamstime.com/b/summer-beach-nature-travel-background-spain-costa-brava-40841681.jpg" 
                     className="w-full h-full object-cover" 
                     alt="Contact Banner" 
                   />
                 </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-2">Service Framework</p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-none uppercase">
            Terms of <span className="text-amber-500 underline decoration-2 underline-offset-4">Engagement</span>.
          </h1>
          <p className="text-xs text-gray-400 mt-4 max-w-2xl font-medium tracking-wide leading-relaxed">
            By accessing Tripzybee, you enter a binding legal agreement. These terms 
            govern our travel services, liability limitations, and your responsibilities 
            as a global traveler.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <div className="bg-amber-500 text-black px-4 py-1.5 rounded-full flex items-center gap-2">
              <ScrollText size={12} />
              <span className="text-[9px] font-black uppercase tracking-tighter text-black">Protocol Version  1.0.0</span>
            </div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Effective: {effectiveDate}</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Detailed Terms Sections */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* 01. Booking & Payments */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-amber-500 italic opacity-40 leading-none">01</span>
                <h2 className="text-xl font-black uppercase tracking-tighter">Reservation & Financials</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  All bookings are subject to availability at the time of processing. A reservation is only considered <strong>"Confirmed"</strong> once Tripzybee issues a unique Booking ID and receipt of the initial deposit (typically 25% to 50% of the total tour cost).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-slate-50 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-black uppercase text-gray-900 mb-1">Price Volatility</h4>
                    <p className="text-[11px]">Quotes are valid for 24 hours. Flight and hotel rates may fluctuate until the final payment is cleared.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-black uppercase text-gray-900 mb-1">Currency</h4>
                    <p className="text-[11px]">All transactions are processed in INR. International card fees are the responsibility of the traveler.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Cancellation & Refunds */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-amber-500 italic opacity-40 leading-none">02</span>
                <h2 className="text-xl font-black uppercase tracking-tighter">Cancellation Protocol</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Our refund structure is designed to respect the commitments made to our local vendors and "Bee-Captains."
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-900">
                      <th className="py-3 text-[10px] font-black uppercase tracking-widest text-amber-600">Timeline</th>
                      <th className="py-3 text-[10px] font-black uppercase tracking-widest text-amber-600">Cancellation Charge</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold uppercase tracking-tighter">
                    <tr className="border-b border-gray-100">
                      <td className="py-4">30+ Days Before Departure</td>
                      <td className="py-4 text-green-600">10% Processing Fee Only</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4">15-29 Days Before Departure</td>
                      <td className="py-4">25% of Total Tour Cost</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4">07-14 Days Before Departure</td>
                      <td className="py-4">50% of Total Tour Cost</td>
                    </tr>
                    <tr className="border-b border-gray-900">
                      <td className="py-4">Within 07 Days / No Show</td>
                      <td className="py-4 text-red-600">100% (Non-Refundable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 03. Liability Limitation */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-amber-500 italic opacity-40 leading-none">03</span>
                <h2 className="text-xl font-black uppercase tracking-tighter">Limitation of Liability</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tripzybee acts as an intermediary between travelers and service providers (Airlines, Hotels, Transporters). We are not liable for <strong>"Force Majeure"</strong> events, including but not limited to: natural disasters, flight delays, civil unrest, or government-imposed travel restrictions.
              </p>
            </section>

          </div>

          {/* Sidebar - Legal Quick Actions */}
          <div className="space-y-6">
            <div className="bg-amber-500 rounded-3xl p-8 text-black shadow-xl shadow-amber-500/10">
              <h3 className="text-xl font-black mb-6 italic uppercase leading-none">Traveler<br/>Responsibilities</h3>
              <ul className="space-y-5">
                {[
                  { icon: ShieldAlert, text: "Valid travel insurance is mandatory for all high-altitude treks." },
                  { icon: Globe, text: "Ensure all Visa and Passport documents are valid for 6 months." },
                  { icon: UserX, text: "Any illegal conduct during a tour will result in immediate termination." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <item.icon size={18} className="flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold leading-tight">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 rounded-3xl p-6 border border-gray-200">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 text-center">Legal Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter border-b border-gray-200 pb-2">
                  <span>Jurisdiction</span>
                  <span className="text-amber-600">Bangalore, IN</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter border-b border-gray-200 pb-2">
                  <span>Dispute Resolution</span>
                  <span className="text-amber-600">Arbitration</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                  <span>Contractual Language</span>
                  <span className="text-amber-600">English</span>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-3xl p-6 text-white text-center">
              <Gavel className="mx-auto text-amber-500 mb-4" size={32} />
              <p className="text-xs font-medium mb-4 italic text-gray-400">Questions regarding these terms?</p>
              <button className="w-full bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-colors">
                Contact Legal Team
              </button>
            </div>
          </div>

        </div>

        {/* Dense Legal Footer Section */}
        <div className="mt-20 py-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-60">
           <div className="flex flex-col gap-2">
             <CreditCard size={16} />
             <h5 className="text-[10px] font-black uppercase">Payment Security</h5>
             <p className="text-[10px] font-medium leading-tight text-gray-500">All gateways are PCI-DSS compliant with 128-bit encryption.</p>
           </div>
           <div className="flex flex-col gap-2">
             <AlertTriangle size={16} />
             <h5 className="text-[10px] font-black uppercase">Risk Warning</h5>
             <p className="text-[10px] font-medium leading-tight text-gray-500">Adventure activities carry inherent risks; participation is voluntary.</p>
           </div>
           <div className="flex flex-col gap-2">
             <Handshake size={16} />
             <h5 className="text-[10px] font-black uppercase">Third-Party Terms</h5>
             <p className="text-[10px] font-medium leading-tight text-gray-500">Service providers may have their own separate policy frameworks.</p>
           </div>
           <div className="flex flex-col gap-2">
             <FileWarning size={16} />
             <h5 className="text-[10px] font-black uppercase">Severability</h5>
             <p className="text-[10px] font-medium leading-tight text-gray-500">If one term is found invalid, remaining terms stay in full effect.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;