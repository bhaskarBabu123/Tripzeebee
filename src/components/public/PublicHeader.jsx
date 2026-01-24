import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Plane, ShoppingCart, User, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const PublicHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { getCartItemsCount } = useCart();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Tours', href: '/tours', current: location.pathname === '/tours' },
    { name: 'About', href: '/about-us', current: location.pathname === '/about-us' },
    { name: 'Contact', href: '/contact-us', current: location.pathname === '/contact-us' }
  ];

  const handleUserAction = () => {
    if (isAuthenticated) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 rounded-full">
              <Plane className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Tripzy<span className="text-yellow-500">bee</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-700 hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                to="/user/cart"
                className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            )}
            
            <button
              onClick={handleUserAction}
              className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {isAuthenticated ? (
                <>
                  <User className="h-4 w-4" />
                  <span>{user.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <Link
                to="/user/cart"
                className="relative p-2 text-gray-700"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  item.current
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={() => {
                handleUserAction();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-3 rounded-lg font-medium"
            >
              {isAuthenticated ? (
                <>
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;