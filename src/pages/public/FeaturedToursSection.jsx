import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, MapPin, Star, CheckCircle, ArrowRight, ArrowUpRight 
} from 'lucide-react';

const FeaturedToursSection = ({ isLoading = false, featuredTours = [] }) => {
  // Skeleton data structure matching your card
  const skeletonData = [
    {}, {}, {}
  ];

  // Helper to get YouTube ID (your existing function - keep it)
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const SkeletonCard = () => (
    <div className="group bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 animate-pulse">
      {/* Image Container - Shimmer Effect */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        {/* Fake iframe shimmer */}
        <div className="absolute inset-0 bg-slate-300 rounded-t-[2rem]" />
        
        {/* Skeleton badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="w-20 h-6 bg-slate-200 rounded-lg" />
          <div className="space-y-1">
            <div className="w-16 h-4 bg-slate-200 rounded-md ml-auto" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded-full" />
            <div className="w-20 h-3 bg-slate-200 rounded-full" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-slate-200 rounded-full" />
            <div className="w-10 h-3 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content Body Skeleton */}
      <div className="p-6 md:p-8 space-y-4">
        {/* Title */}
        <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
        
        {/* Highlights Section Skeleton */}
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 rounded-full w-24" />
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 rounded-full w-24 flex items-center gap-1">
                <div className="w-3 h-3 bg-slate-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section Skeleton */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 bg-slate-200 rounded-full w-20" />
            <div className="flex items-baseline gap-1">
              <div className="h-8 bg-slate-200 rounded-lg w-20" />
              <div className="h-3 bg-slate-200 rounded-full w-8" />
            </div>
          </div>
          <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">
                Upcoming Trips
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Our Best Travel <span className="text-amber-500">Packages</span>
            </h2>
          </div>
          <Link 
            to="/tours" 
            className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:text-amber-500 hover:border-amber-500 transition-all"
          >
            Explore Tours <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading || featuredTours.length === 0 
            ? skeletonData.map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)
            : featuredTours.slice(0, 3).map((tour) => (
                <div key={tour._id} className="group bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
                  
                  {/* Image Container */}
                  <div className="relative h-56 md:h-64 overflow-hidden bg-black group">
                    {/* Video container - simulates object-cover with iframe */}
                    <div className="absolute inset-0 overflow-hidden">
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(tour.video)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(tour.video)}&controls=0&disablekb=1&fs=0&rel=0&iv_load_policy=3&playsinline=1`}
      title="Manali adventure background"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="
        absolute top-1/2 left-1/2
        w-[100vw] h-[56.25vw]          /* default for min-aspect 16:9 */
        min-w-full min-h-full
        -translate-x-1/2 -translate-y-1/2
        sm:w-[177.78vh] sm:h-[100vh]   /* override for taller containers */
        group-hover:scale-110
        transition-transform duration-700 ease-out
        pointer-events-none
      "
    />
  </div>

                    {/* Dark gradient overlay – heavily dims any remaining YouTube watermark (bottom-right) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none z-0" />

                    {/* Your badges & info overlays – unchanged, but ensure z-index */}
                    <div className="absolute inset-0 z-10">
                      {/* Top badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase rounded-lg shadow-sm">
                          {tour.category || 'Expedition'}
                        </span>
                        <div className="flex flex-col gap-2 items-end">
                          <div className="bg-emerald-500 text-white px-2 py-1 rounded-md text-[8px] font-black uppercase flex items-center gap-1">
                            <Activity size={10} /> Active
                          </div>
                        </div>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-amber-500" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{tour.location || 'Multi-City'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-amber-500 text-amber-500" />
                          <span className="text-[10px] font-black">{tour.rating?.average || '4.9'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-black mb-3 text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {tour.title}
                    </h3>
                    
                    {/* Highlights Section */}
                    <div className="space-y-2 mb-8">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Core Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {['Private Transport', 'Handpicked Stays', 'Expert Guide'].map((tag, i) => (
                          <span key={i} className="text-[9px] font-bold text-slate-500 flex items-center gap-1">
                            <CheckCircle size={10} className="text-emerald-500" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Starting From</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900">₹{tour.price.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 font-bold">/pp</span>
                        </div>
                      </div>
                      <Link to={`/tours/${tour._id}`} className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white group-hover:bg-amber-500 group-hover:text-slate-900 transition-all duration-300 shadow-lg">
                        <ArrowUpRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
        
        {/* Mobile Only: View All Button */}
        <div className="mt-10 md:hidden">
          <Link 
            to="/tours" 
            className="flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest"
          >
            Explore All Deployments
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToursSection;
