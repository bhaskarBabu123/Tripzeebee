import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Star, Clock, Users, MapPin, ChevronDown, 
  Grid, List, X, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Heart
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({});
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    destination: searchParams.get('destination') || '',
    tourType: searchParams.get('tourType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minDuration: searchParams.get('minDuration') || '',
    maxDuration: searchParams.get('maxDuration') || '',
    difficulty: searchParams.get('difficulty') || '',
    sort: searchParams.get('sort') || 'featured',
    page: searchParams.get('page') || 1
  });

  const tourTypes = ['Adventure', 'Cultural', 'Beach', 'Mountain', 'Wildlife', 'Religious', 'City', 'Honeymoon'];
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Expert'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: '₹ Low-High' },
    { value: 'price-high', label: '₹ High-Low' },
    { value: 'duration-short', label: 'Short first' },
    { value: 'rating', label: 'Top rated' },
    { value: 'newest', label: 'Newest' }
  ];

  // Dynamic SEO Variables
  const pageTitle = filters.destination ? `Best ${filters.destination} Tour Packages 2026 | Tripzybee` : "Explore Trending Tour Packages & Holiday Deals | Tripzybee";
  const pageDesc = `Book curated ${filters.destination || 'India'} tours. Explore ${pagination.totalTours || ''} packages including ${filters.tourType || 'Adventure, Honeymoon, and Family'} trips. Best prices guaranteed with Tripzybee Bee-Captains.`;

  useEffect(() => {
    fetchTours();
  }, [filters]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await axios.get(`/tours?${params.toString()}`);
      setTours(response.data.tours);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '', destination: '', tourType: '', minPrice: '', maxPrice: '',
      minDuration: '', maxDuration: '', difficulty: '', sort: 'featured', page: 1
    };
    setFilters(newFilters);
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    handleFilterChange('page', page);
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // --- COMPONENT PARTS ---

  const SkeletonTourCard = ({ isListView = false }) => (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse flex flex-col">
      <div className={`relative overflow-hidden ${isListView ? 'h-32 sm:h-36' : 'h-44 sm:h-52'} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
      <div className="p-4 flex flex-col flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-200 rounded w-full flex-1" />
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );

  const SkeletonGrid = ({ isListView = false }) => (
    <div className={isListView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6' : 'space-y-4 lg:space-y-6'}>
      {[...Array(6)].map((_, i) => (
        <SkeletonTourCard key={`skeleton-${i}`} isListView={isListView === 'list'} />
      ))}
    </div>
  );

  const TourCard = ({ tour, isListView = false }) => (
    <Link to={`/tours/${tour._id}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className={`relative overflow-hidden ${isListView ? 'h-32 sm:h-36' : 'h-44 sm:h-52'} bg-black`}>
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(tour.video)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(tour.video)}&controls=0&disablekb=1&fs=0&rel=0&iv_load_policy=3&playsinline=1`}
            title={tour.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 sm:w-[177.78vh] sm:h-[100vh] group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-3 pointer-events-none">
          <div className="flex justify-between">
            <div className="bg-black/70 text-xs text-amber-300 px-2 py-1 rounded-full font-bold uppercase tracking-tighter">{tour.tourType}</div>
            <div className="bg-white/80 px-2 py-1 rounded-full flex items-center gap-0.5 text-[11px] backdrop-blur-sm">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{tour.rating?.average || 4.5}</span>
            </div>
          </div>
          {tour.originalPrice && (
            <div className="self-start bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-bold backdrop-blur-sm">
              SAVE ₹{(tour.originalPrice - tour.price).toLocaleString()}
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors uppercase italic">{tour.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1 leading-relaxed">{tour.shortDescription}</p>
        <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3 font-semibold">
          <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /><span>{tour.duration.days}D/{tour.duration.nights}N</span></div>
          <div className="flex items-center gap-1"><Users className="w-3 h-3 text-amber-500" /><span>Max {tour.groupSize.max}</span></div>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            {tour.originalPrice && <span className="text-[11px] text-gray-400 line-through mr-1">₹{tour.originalPrice.toLocaleString()}</span>}
            <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tighter">₹{tour.price.toLocaleString()}</span>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
            Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={`tripzybee tours, ${filters.destination} travel, budget tour packages, solo travel groups, honeymoon destinations 2026`} />
        <link rel="canonical" href="https://tripzybee.com/tours" />
      </Helmet>

      {/* --- TOP SEO BANNER --- */}
      <section className="relative h-[300px] lg:h-[450px] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
          alt={`${filters.destination || 'India'} Travel Destination Banner`} 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-50" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl lg:text-7xl font-black italic uppercase text-white leading-none tracking-tighter mb-4 drop-shadow-2xl">
            {filters.destination ? `${filters.destination} Packages` : 'All Expeditions'}
          </h1>
          <p className="text-white/90 text-sm lg:text-xl font-medium tracking-wide drop-shadow-md">
            Unforgettable memories, handpicked destinations, and zero-compromise adventure.
          </p>
          <div className="mt-8 flex justify-center gap-4 hidden lg:flex">
             <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-widest">
               <ShieldCheck size={16} className="text-amber-400" /> Best Price Guarantee
             </div>
             <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-widest">
               <Zap size={16} className="text-amber-400" /> Instant Confirmation
             </div>
          </div>
        </div>
      </section>

      {/* Mobile Header Bar */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-bold italic uppercase tracking-tighter text-amber-600">Explore</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="p-2 rounded-lg bg-gray-100">
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button onClick={() => setShowFilters(true)} className="flex items-center gap-1 bg-amber-500 text-black text-xs font-bold uppercase px-3 py-1.5 rounded-lg">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Mobile Filter Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                  <h2 className="text-lg font-black uppercase italic">Refine Search</h2>
                  <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-8">
                  <FilterGroup label="Search keywords" icon={Search} content={
                    <input type="text" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} placeholder="E.G. LADAKH..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-bold uppercase bg-gray-50 focus:ring-2 focus:ring-amber-500 outline-none" />
                  }/>
                  <FilterGroup label="Destination" icon={MapPin} content={
                    <select value={filters.destination} onChange={(e) => handleFilterChange('destination', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-bold uppercase bg-gray-50 outline-none">
                      <option value="">All Regions</option>
                      <option value="Kashmir">Kashmir</option>
                      <option value="Himachal">Himachal</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                  }/>
                  <div className="flex gap-4">
                    <button onClick={clearFilters} className="flex-1 bg-gray-100 text-xs font-black uppercase py-4 rounded-xl">Clear</button>
                    <button onClick={() => setShowFilters(false)} className="flex-1 bg-amber-500 text-black text-xs font-black uppercase py-4 rounded-xl">Show Results</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Filter Expeditions</h2>
                <button onClick={clearFilters} className="text-[10px] text-amber-600 hover:text-amber-700 font-black uppercase underline underline-offset-4">Reset</button>
              </div>
              <div className="space-y-10">
                <FilterGroup label="Keywords" content={
                  <input type="text" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} placeholder="TREKKING, BEACH..." className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 text-[10px] font-black uppercase focus:border-amber-500 outline-none transition-colors" />
                }/>
                <FilterGroup label="Tour Category" content={
                  <div className="grid grid-cols-1 gap-2">
                    {tourTypes.map(type => (
                      <button key={type} onClick={() => handleFilterChange('tourType', type)} className={`text-left px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filters.tourType === type ? 'bg-amber-500 text-black' : 'hover:bg-gray-50 text-gray-400'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                }/>
                <FilterGroup label="Price Ceiling" content={
                  <input type="number" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} placeholder="MAX PRICE (₹)" className="w-full bg-gray-50 border-b-2 border-gray-100 p-3 text-[10px] font-black uppercase outline-none" />
                }/>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-xl font-black italic uppercase tracking-tighter text-gray-900">
                  {loading ? 'Discovering...' : `${pagination.totalTours || 0} Curated Packages`}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Handpicked by our Bee-Captains</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-4">
                <span className="text-[10px] font-black uppercase text-gray-400">Sort By:</span>
                <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)} className="bg-transparent text-[10px] font-black uppercase border-b border-amber-500 outline-none py-1">
                  {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <div className="hidden lg:flex bg-gray-100 p-1 rounded-xl">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid size={16}/></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}><List size={16}/></button>
                </div>
              </div>
            </div>

            {loading ? (
              <SkeletonGrid isListView={viewMode} />
            ) : tours.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <MapPin className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-black uppercase italic text-gray-900">No Trails Found</h3>
                <p className="text-xs text-gray-500 mt-2 mb-8">Try clearing your filters to explore more of India.</p>
                <button onClick={clearFilters} className="bg-black text-white px-10 py-4 rounded-full text-xs font-black uppercase hover:bg-amber-500 hover:text-black transition-all">Show all tours</button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8' : 'space-y-6 lg:space-y-8'}>
                  {tours.map((tour) => (
                    <TourCard key={tour._id} tour={tour} isListView={viewMode === 'list'} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <nav className="flex items-center justify-center gap-2 mt-20" aria-label="Tour Results Pagination">
                    <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={!pagination.hasPrev} className="p-3 rounded-full border border-gray-200 disabled:opacity-20 hover:bg-amber-500 transition-all"><ChevronLeft size={20}/></button>
                    <div className="flex gap-2">
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-10 h-10 rounded-full text-xs font-black ${pagination.currentPage === i + 1 ? 'bg-black text-white' : 'border border-gray-100 hover:bg-gray-50'}`}>{i + 1}</button>
                      ))}
                    </div>
                    <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={!pagination.hasNext} className="p-3 rounded-full border border-gray-200 disabled:opacity-20 hover:bg-amber-500 transition-all"><ChevronRight size={20}/></button>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>

        {/* --- SEO BOTTOM CONTENT BLOCK --- */}
        <section className="mt-32 pt-20 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-black italic uppercase leading-none mb-6">Why Tripzybee <span className="text-amber-500">Tours?</span></h2>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Tripzybee isn't just a travel agency; we are a community. We specialize in <strong>solo travel groups</strong>, custom <strong>honeymoon itineraries</strong>, and high-altitude <strong>expeditions</strong> across India and beyond.</p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><ShieldCheck size={20}/></div>
              <div><h4 className="text-[11px] font-black uppercase">Secure Bookings</h4><p className="text-[10px] text-gray-400 font-bold uppercase">256-bit encrypted payments and flexible cancellations.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Heart size={20}/></div>
              <div><h4 className="text-[11px] font-black uppercase">Bee Captain Support</h4><p className="text-[10px] text-gray-400 font-bold uppercase">Professional group leads to handle everything on-ground.</p></div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <Zap className="text-amber-500 mb-2" size={30} />
            <h4 className="text-lg font-black italic uppercase">Corporate Offsites</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 mb-6">Custom luxury packages for teams.</p>
            <Link to="/corporate" className="text-[10px] font-black uppercase border-b border-amber-500 pb-1">Get a Quote</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

const FilterGroup = ({ label, icon: Icon, content }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
      {Icon && <Icon size={12} className="text-amber-500" />} {label}
    </label>
    {content}
  </div>
);

export default Tours;