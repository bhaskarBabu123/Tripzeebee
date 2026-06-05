import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Home, 
  User, 
  Calendar, 
  ShoppingCart, 
  Ticket,
  Settings,
  HelpCircle
} from 'lucide-react';

const UserSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/user', icon: Home, current: location.pathname === '/user' },
    { name: 'Profile', href: '/user/profile', icon: User, current: location.pathname === '/user/profile' },
    { name: 'My Bookings', href: '/user/bookings', icon: Calendar, current: location.pathname === '/user/bookings' },
    { name: 'Cart', href: '/user/cart', icon: ShoppingCart, current: location.pathname === '/user/cart' },
  ];

  const secondaryNavigation = [
    { name: 'Browse Tours', href: '/tours', icon: Ticket },
    { name: 'Settings', href: '/user/settings', icon: Settings },
    { name: 'Help', href: '/user/help', icon: HelpCircle },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Mobile close button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                item.current
                  ? 'bg-yellow-100 text-yellow-700 border-r-2 border-yellow-500'
                  : 'text-gray-700 hover:text-yellow-700 hover:bg-yellow-50'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  item.current
                    ? 'text-yellow-500'
                    : 'text-gray-500 group-hover:text-yellow-500'
                }`}
              />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-yellow-700 hover:bg-yellow-50 transition-colors duration-200"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-yellow-500" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-30 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={onClose}
          />
          <aside className="relative flex flex-col w-64 bg-white shadow-lg">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default UserSidebar;