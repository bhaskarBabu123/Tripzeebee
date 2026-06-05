import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Plane, ShoppingCart, Bell, LogOut, User, 
  Calendar, Settings, ChevronDown, LayoutDashboard, 
  Heart, Ticket, HelpCircle, Search, Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const UserHeader = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Main Navigation Links (Visible on Header)
  const mainNav = [
    { name: 'Dashboard', href: '/user', icon: LayoutDashboard },
    { name: 'My Bookings', href: '/user/bookings', icon: Calendar },
    { name: 'Browse Tours', href: '/tours', icon: Compass },
  ];

  // Dropdown Links (Account & Support)
  const accountNav = [
    { name: 'My Profile', href: '/user/profile', icon: User },
    { name: 'Saved Wishlist', href: '/user/cart', icon: Heart }, // Linking to cart/wishlist
    { name: 'Support & Help', href: '/contact', icon: HelpCircle },
    { name: 'Account Settings', href: '/user/settings', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-slate-200 fixed top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. LOGO SECTION */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-yellow-400 p-1.5 rounded-lg shadow-sm">
              <Plane className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Tripzy<span className="text-yellow-500">bee</span>
            </span>
          </Link>

          {/* 2. MAIN NAV LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNav.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                    isActive 
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <link.icon size={16} className={isActive ? 'text-yellow-600' : ''} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 3. RIGHT ACTIONS (Cart, Notifications, Profile) */}
        <div className="flex items-center space-x-3 md:space-x-4">
          
          {/* Cart Icon */}
          <Link 
            to="/user/cart" 
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors group"
            title="View Cart"
          >
            <ShoppingCart size={20} className="group-hover:text-yellow-600" />
            {getCartItemsCount() > 0 && (
              <span className="absolute top-1 right-1 bg-black text-[10px] font-bold text-yellow-400 h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                {getCartItemsCount()}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell size={20} />
          </button>

          <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block" />

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 pl-3 rounded-xl border border-slate-200 hover:border-yellow-400 hover:shadow-md transition-all bg-white group"
            >
              <div className="hidden sm:block text-right">
                <p className="text-[11px] font-bold text-slate-400 leading-none uppercase tracking-tighter mb-1">Welcome</p>
                <p className="text-xs font-bold text-slate-900 leading-none">{user?.name?.split(' ')[0]}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-400 rounded-lg flex items-center justify-center border border-yellow-500/20 shadow-inner">
                <span className="text-xs font-bold text-black">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* DROPDOWN MENU */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {/* User Info Heading */}
                <div className="px-4 py-3 border-b border-slate-50 mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Account</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                </div>
                
                {/* Navigation Links */}
                <div className="space-y-0.5">
                  {accountNav.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.href} 
                      onClick={() => setIsProfileOpen(false)} 
                      className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-black transition-colors"
                    >
                      <item.icon size={16} className="text-slate-400" />
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Footer Section (Logout) */}
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE QUICK NAV (Visible only on small screens) */}
      <div className="md:hidden border-t border-slate-100 flex justify-around py-2 bg-white/80 backdrop-blur-md">
        {mainNav.map((link) => (
          <Link key={link.name} to={link.href} className="flex flex-col items-center gap-1 p-1">
            <link.icon size={18} className={location.pathname === link.href ? 'text-yellow-500' : 'text-slate-400'} />
            <span className="text-[9px] font-bold uppercase text-slate-500">{link.name}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default UserHeader;