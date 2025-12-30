import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plane, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 w-full z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 mr-2"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-yellow-400 p-2 rounded-full">
                <Plane className="h-6 w-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Tripzy<span className="text-yellow-500">bee</span>
              </span>
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                Admin
              </span>
            </Link>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-700 hover:text-yellow-600 transition-colors relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <Settings className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;