import React from 'react';
import { ChevronDown, Utensils, Bed, MapPin } from 'lucide-react';

const ItineraryAccordion = ({ tour }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-yellow-400 rounded-full"></div>
        <h3 className="text-sm font-bold uppercase text-slate-900 tracking-widest">
          Journey Itinerary
        </h3>
      </div>

      <div className="space-y-4">
        {tour.itinerary.map((step, i) => (
          <details 
            key={i} 
            className="group border border-slate-100 rounded-xl bg-white shadow-sm hover:border-yellow-200 transition-all duration-300"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
              <div className="flex items-center gap-4">
                {/* Day Badge */}
                <span className="flex-shrink-0 w-10 h-10 bg-black  group-hover:bg-gray-800 text-white rounded-lg flex items-center justify-center text-xs font-bold transition-colors border border-slate-100">
                  Day {step.day}
                </span>
                
                {/* Title */}
                <h4 className="text-[15px] font-semibold text-slate-800 group-open:text-yellow-700 transition-colors">
                  {step.title}
                </h4>
              </div>

              {/* Icon */}
              <div className="text-slate-400 group-hover:text-yellow-500 transition-transform duration-300 group-open:rotate-180">
                <ChevronDown size={18} />
              </div>
            </summary>

            <div className="px-4 pb-5 ml-14 border-t border-slate-50 pt-4">
              <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                {step.description}
              </p>
              
              <div className="flex flex-wrap gap-6 items-center border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-50 rounded-md">
                    <Utensils size={14} className="text-yellow-600" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                    {step.meals.join(' • ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-50 rounded-md">
                    <Bed size={14} className="text-yellow-600" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                    {step.accommodation}
                  </span>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default ItineraryAccordion;