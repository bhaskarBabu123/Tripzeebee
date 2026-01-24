import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, Plus, CreditCard as Edit, Trash2, Eye, Star, Clock, Users, Calendar } from 'lucide-react';
import axios from 'axios';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1
  });

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

      const response = await axios.get(`/admin/tours?${params.toString()}`);
      setTours(response.data.tours);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour? This action cannot be undone.')) {
      try {
        await axios.delete(`/tours/${tourId}`);
        fetchTours(); // Refresh the list
        alert('Tour deleted successfully');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete tour');
      }
    }
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MapPin className="h-8 w-8 mr-3 text-yellow-500" />
            Tour Management
          </h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage all tour packages</p>
        </div>
        
        <Link
          to="/admin/tours/new"
          className="mt-4 md:mt-0 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Tour
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours by title or destination..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value, page: 1})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {pagination.totalTours || 0} tours found
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
        </div>
      ) : tours.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
          <p className="text-gray-600 mb-6">
            {filters.search || filters.status 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by creating your first tour package.'
            }
          </p>
          <Link
            to="/admin/tours/new"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create First Tour
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={tour.images[0]?.url}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(tour.status)}`}>
                      {tour.status}
                    </span>
                    {tour.featured && (
                      <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{tour.rating?.average || 0}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{tour.shortDescription}</p>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tour.destinations.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{tour.duration.days}D/{tour.duration.nights}N</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Max {tour.groupSize.max}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{tour.tourType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">₹{tour.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Code: {tour.tourCode}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Created: {formatDate(tour.createdAt)}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/tours/${tour._id}`}
                        className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Tour"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      
                      <Link
                        to={`/admin/tours/edit/${tour._id}`}
                        className="text-yellow-600 hover:text-yellow-700 p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Edit Tour"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteTour(tour._id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Tour"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.currentPage} of {pagination.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-2 border rounded-lg ${
                        pagination.currentPage === i + 1
                          ? 'bg-yellow-400 border-yellow-400 text-black'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminTours;