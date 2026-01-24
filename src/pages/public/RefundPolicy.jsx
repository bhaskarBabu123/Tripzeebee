import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RefreshCcw, Banknote, AlertCircle, Clock, CheckCircle2, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Helmet>
        <title>Refund & Cancellation Policy | Tripzybee 2026 Updates</title>
        <meta name="description" content="Official refund rules for Tripzybee tours. Learn about cancellation timelines, processing fees, and credit note options for Indian group travel." />
      </Helmet>

      {/* COMPACT HEADER */}
      <header className="bg-gray-50 border-b border-gray-100 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-gray-900">Financial Protocol</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
            Refund <span className="text-amber-500 not-italic">Protocol.</span>
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 border-l-4 border-amber-500 pl-4">Standard Cancellation</h2>
            <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100">
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-xs font-black uppercase">30+ Days Before</span>
                  <span className="text-sm font-bold text-green-600">90% Refund</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-xs font-black uppercase">15-30 Days Before</span>
                  <span className="text-sm font-bold text-amber-600">50% Refund</span>
                </li>
                <li className="flex justify-between items-center pb-4">
                  <span className="text-xs font-black uppercase">0-14 Days Before</span>
                  <span className="text-sm font-bold text-red-600">No Refund</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="prose prose-sm max-w-none text-gray-600">
            <h3 className="font-black text-gray-900 uppercase">Processing Time</h3>
            <p>Approved refunds are processed within <strong>7-10 business days</strong>. Funds will be credited back to the original payment source used during booking.</p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-900 rounded-3xl p-8 text-white">
            <RefreshCcw className="text-amber-500 mb-4" size={32} />
            <h4 className="text-lg font-black uppercase italic mb-4">Credit Notes</h4>
            <p className="text-[11px] text-gray-400 uppercase leading-relaxed">Instead of a refund, you can opt for a 100% value Credit Note valid for 1 year on any Tripzybee tour.</p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RefundPolicy;