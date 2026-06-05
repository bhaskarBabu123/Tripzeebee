import React from "react";
import { Helmet } from "react-helmet-async";
import {
  RefreshCcw,
  Banknote,
  AlertCircle,
  Clock,
  CheckCircle2,
  Home,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Helmet>
        <title>Refund & Cancellation Policy | Tripzybee 2026 Updates</title>
        <meta
          name="description"
          content="Official refund rules for Tripzybee tours. Learn about cancellation timelines, processing fees, and credit note options for Indian group travel."
        />
      </Helmet>

      {/* COMPACT HEADER */}
      <header className="bg-gray-50 border-b border-gray-100 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
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
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 border-l-4 border-amber-500 pl-4">
              Standard Cancellation
            </h2>
            <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100">
              {/* --- SECTION HEADER --- */}
              <div className="mb-6">
                <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-[10px]">
                    01
                  </span>
                  Weekend / Long Weekend Trips
                </h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                  <p className="text-[11px] font-black text-red-700 uppercase leading-tight">
                    No refund shall be made with respect to the initial booking
                    amount for any cancellations/reschedule.
                  </p>
                </div>
              </div>

              {/* --- TIMELINE LIST --- */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      CANCELLATION MADE
                    </span>
                    <span className="text-xs font-bold uppercase text-gray-800">
                      7 Days Before Start
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      FEE CHARGED
                    </span>
                    <p className="text-sm font-black text-amber-600">
                      50% OF TRIP COST
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      CANCELLATION MADE
                    </span>
                    <span className="text-xs font-bold uppercase text-gray-800">
                      3 Days Before Start
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      FEE CHARGED
                    </span>
                    <p className="text-sm font-black text-orange-600">
                      75% OF TRIP COST
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      CANCELLATION MADE
                    </span>
                    <span className="text-xs font-bold uppercase text-gray-800">
                      Within 3 Days
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      FEE CHARGED
                    </span>
                    <p className="text-sm font-black text-red-600">
                      100% OF TRIP COST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <ShieldCheck size={16} className="text-gray-600" />
                  </div>
                  <p className="text-[10px] font-medium leading-relaxed text-gray-500 uppercase tracking-tight">
                    In the case of{" "}
                    <strong className="text-gray-900">
                      unforeseen weather conditions or government restrictions
                    </strong>
                    , certain activities may be cancelled and in such cases, the
                    operator will try his best to provide an alternate feasible
                    activity. However,{" "}
                    <span className="text-gray-900 font-black decoration-amber-500 underline underline-offset-2">
                      no refund will be provided for the same.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="prose prose-sm max-w-none text-gray-600">
            <h3 className="font-black text-gray-900 uppercase">
              Processing Time
            </h3>
            <p>
              Approved refunds are processed within{" "}
              <strong>7-10 business days</strong>. Funds will be credited back
              to the original payment source used during booking.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-900 rounded-3xl p-8 text-white">
            <RefreshCcw className="text-amber-500 mb-4" size={32} />
            <h4 className="text-lg font-black uppercase italic mb-4">
              Credit Notes
            </h4>
            <p className="text-[11px] text-gray-400 uppercase leading-relaxed">
              Instead of a refund, you can opt for a 100% value Credit Note
              valid for 1 year on any Tripzybee tour.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RefundPolicy;
