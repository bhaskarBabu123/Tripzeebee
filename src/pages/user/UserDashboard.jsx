import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard, 
  TrendingUp,
  Plane,
  Star,
  Plus
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    totalSpent: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/bookings/my-bookings');
      const bookings = response.data;
      
      // Calculate stats
      const total = bookings.length;
      const upcoming = bookings.filter(b => 
        new Date(b.startDate) > new Date() && b.bookingStatus === 'Confirmed'
      ).length;
      const completed = bookings.filter(b => 
        new Date(b.endDate) < new Date() && b.bookingStatus === 'Completed'
      ).length;
      const spent = bookings
        .filter(b => b.paymentStatus === 'Completed')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      setStats({
        totalBookings: total,
        upcomingTrips: upcoming,
        completedTrips: completed,
        totalSpent: spent
      });

      // Get recent bookings
      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-8 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! ✈️
            </h1>
            <p className="text-black/80 text-lg">
              Ready for your next adventure? Check out your trips and explore new destinations.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-black/10 rounded-full flex items-center justify-center">
              <Plane className="h-12 w-12 text-black" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            to="/tours"
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Book New Trip
          </Link>
          <Link
            to="/user/bookings"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Bookings
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Upcoming Trips</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.upcomingTrips}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed Trips</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedTrips}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link
              to="/user/bookings"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="p-6">
          {recentBookings.length === 0 ? (
            <div className="text-center py-12">
              <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No bookings yet</p>
              <p className="text-gray-400">Start your travel journey today!</p>
              <Link
                to="/tours"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold mt-4 inline-block transition-colors"
              >
                Explore Tours
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.tour?.images?.[0]?.url}
                      alt={booking.tour?.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {booking.tour?.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(booking.startDate)}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.tour?.duration?.days}D/{booking.tour?.duration?.nights}N
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          booking.bookingStatus === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.bookingStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                      <Link
                        to={`/user/bookings/${booking._id}`}
                        className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                    <p className="text-gray-900 font-semibold mt-1">
                      ₹{booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/tours"
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Browse Tours</h3>
              <p className="text-blue-100">Discover amazing destinations</p>
            </div>
            <MapPin className="h-8 w-8 text-blue-200" />
          </div>
        </Link>

        <Link
          to="/user/profile"
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Update Profile</h3>
              <p className="text-purple-100">Manage your information</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-200" />
          </div>
        </Link>

        <Link
          to="/user/cart"
          className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">View Cart</h3>
              <p className="text-orange-100">Check saved tours</p>
            </div>
            <CreditCard className="h-8 w-8 text-orange-200" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;