import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Star, Clock, Users, MapPin, Calendar, ChevronDown, 
  Grid, List, X, ChevronLeft, ChevronRight, ArrowRight 
} from 'lucide-react';
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

  const TourCard = ({ tour, isListView = false }) => (
    <Link to={`/tours/${tour._id}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-all duration-200 flex flex-col">
      <div className={`relative overflow-hidden ${isListView ? 'h-32 sm:h-36' : 'h-44 sm:h-52'}`}>
        <img
          src={tour.images[0]?.url}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
        <div className="absolute left-3 top-3 bg-black/70 text-xs text-amber-300 px-2 py-1 rounded-full">
          {tour.tourType}
        </div>
        <div className="absolute right-3 top-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-0.5 text-[11px]">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>{tour.rating?.average || 4.5}</span>
        </div>
        {tour.originalPrice && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
            SAVE ₹{(tour.originalPrice - tour.price).toLocaleString()}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors">{tour.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">{tour.shortDescription}</p>
        
        <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{tour.duration.days}D/{tour.duration.nights}N</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Max {tour.groupSize.max}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            {tour.originalPrice && (
              <span className="text-[11px] text-gray-500 line-through mr-1">₹{tour.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ₹{tour.price.toLocaleString()}
            </span>
          </div>
          <div className="text-xs font-medium text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
            View
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header Bar */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">Tours</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-lg bg-gray-100"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1 bg-amber-500 text-black text-xs font-medium px-3 py-1.5 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Explore Tours</h1>
              <p className="text-sm text-gray-600 mt-1">{tours.length} tours available</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="p-1 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <FilterGroup 
                    label="Search" 
                    icon={Search}
                    content={
                      <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        placeholder="Tour name..."
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    }
                  />
                  <FilterGroup 
                    label="Destination" 
                    icon={MapPin}
                    content={
                      <select
                        value={filters.destination}
                        onChange={(e) => handleFilterChange('destination', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="">All destinations</option>
                        <option value="Kashmir">Kashmir</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Goa">Goa</option>
                        <option value="Himachal">Himachal Pradesh</option>
                        <option value="Andaman">Andaman</option>
                      </select>
                    }
                  />
                  <FilterGroup 
                    label="Price" 
                    icon={null}
                    content={
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          placeholder="Min"
                          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          placeholder="Max"
                          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    }
                  />
                  <div className="pt-4 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={clearFilters}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-black text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-72 xl:w-80 shrink-0">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1"
                >
                  Clear all
                </button>
              </div>
              
              <div className="space-y-4">
                <FilterGroup 
                  label="Search tours" 
                  icon={Search}
                  content={
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Any keywords..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  }
                />
                <FilterGroup 
                  label="Tour type" 
                  icon={null}
                  content={
                    <select
                      value={filters.tourType}
                      onChange={(e) => handleFilterChange('tourType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="">All types</option>
                      {tourTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  }
                />
                <FilterGroup 
                  label="Difficulty" 
                  icon={null}
                  content={
                    <select
                      value={filters.difficulty}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="">All levels</option>
                      {difficulties.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  }
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Desktop Sort */}
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <p className="text-sm text-gray-600 hidden sm:block">
                {loading ? 'Loading...' : `${pagination.totalTours || 0} tours`}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 hidden sm:block">Sort:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid place-items-center h-64">
                <div className="w-8 h-8 border border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : tours.length === 0 ? (
              <div className="text-center py-20">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tours found</h3>
                <p className="text-sm text-gray-600 mb-6">Try different filters or destinations</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 bg-amber-500 text-black px-6 py-2.5 rounded-xl font-medium hover:bg-amber-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6'
                    : 'space-y-4 lg:space-y-6'
                }>
                  {tours.map((tour) => (
                    <TourCard key={tour._id} tour={tour} isListView={viewMode === 'list'} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 lg:mt-16 px-4">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrev}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                        const pageNum = pagination.currentPage > 3 
                          ? pagination.currentPage - 3 + i 
                          : i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              pagination.currentPage === pageNum
                                ? 'bg-amber-500 text-black shadow-md shadow-amber-200 scale-105'
                                : 'bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Group Component
const FilterGroup = ({ label, icon: Icon, content }) => (
  <div>
    {label && (
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-amber-500" />}
        <label className="text-sm font-medium text-gray-900">{label}</label>
      </div>
    )}
    {content}
  </div>
);

export default Tours;
