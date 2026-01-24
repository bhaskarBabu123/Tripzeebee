import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Eye,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTours: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0
  });
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [popularTours, setPopularTours] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/admin/stats');
      const { stats, monthlyBookings, popularTours, recentBookings } = response.data;
      
      setStats(stats);
      setMonthlyBookings(monthlyBookings);
      setPopularTours(popularTours);
      setRecentBookings(recentBookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Tours',
      value: stats.totalTours,
      icon: MapPin,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: CreditCard,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-yellow-500" />
              Monthly Bookings
            </h2>
          </div>
          
          <div className="space-y-4">
            {monthlyBookings.length > 0 ? (
              monthlyBookings.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {getMonthName(month._id.month)} {month._id.year}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ 
                          width: `${Math.min((month.count / Math.max(...monthlyBookings.map(m => m.count))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900 w-8">{month.count}</span>
                    <span className="text-sm text-gray-500">
                      {formatCurrency(month.revenue)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No booking data available</p>
            )}
          </div>
        </div>

        {/* Popular Tours */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
              Popular Tours
            </h2>
          </div>
          
          <div className="space-y-4">
            {popularTours.length > 0 ? (
              popularTours.map((tour, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {tour.tour.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {tour.tour.destinations?.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{tour.bookings}</span>
                    <p className="text-xs text-gray-500">bookings</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No tour data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-blue-500" />
              Recent Bookings
            </h2>
            <a href="/admin/bookings" className="text-yellow-600 hover:text-yellow-700 font-medium">
              View All
            </a>
          </div>
          
          <div className="space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {booking.tour.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {booking.user.name} • {formatDate(booking.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">
                      {formatCurrency(booking.totalPrice)}
                    </span>
                    <p className={`text-xs px-2 py-1 rounded-full ${
                      booking.bookingStatus === 'Confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : booking.bookingStatus === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.bookingStatus}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No recent bookings</p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-6 w-6 mr-2 text-purple-500" />
            Quick Stats
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Confirmed Bookings</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ 
                      width: `${stats.totalBookings > 0 ? (stats.confirmedBookings / stats.totalBookings) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="font-medium text-gray-900">
                  {stats.confirmedBookings}/{stats.totalBookings}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Booking Value</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(stats.totalBookings > 0 ? stats.totalRevenue / stats.totalBookings : 0)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tours per User</span>
              <span className="font-medium text-gray-900">
                {stats.totalUsers > 0 ? (stats.totalBookings / stats.totalUsers).toFixed(1) : '0'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Revenue per Tour</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(stats.totalTours > 0 ? stats.totalRevenue / stats.totalTours : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-6 text-black">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/admin/tours/new"
            className="bg-black bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg text-center transition-colors"
          >
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <span className="font-medium">Add New Tour</span>
          </a>
          
          <a
            href="/admin/users"
            className="bg-black bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg text-center transition-colors"
          >
            <Users className="h-8 w-8 mx-auto mb-2" />
            <span className="font-medium">Manage Users</span>
          </a>
          
          <a
            href="/admin/bookings"
            className="bg-black bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg text-center transition-colors"
          >
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <span className="font-medium">View Bookings</span>
          </a>
          
          <a
            href="/admin/tours"
            className="bg-black bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg text-center transition-colors"
          >
            <Eye className="h-8 w-8 mx-auto mb-2" />
            <span className="font-medium">Manage Tours</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;