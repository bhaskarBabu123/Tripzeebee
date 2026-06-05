import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, LogOut, User, Calendar, Settings, ChevronDown, LayoutDashboard, Heart, Compass, Info, Phone, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo.png'
const UnifiedHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. PUBLIC LINKS (Always visible)
  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Tours', href: '/tours' },
    // { name: 'Visa', href: '/visa' },
    { name: 'Contact', href: '/contact-us' },
  ];

  // 2. USER LINKS (Visible only when logged in)
  const userLinks = [
    { name: 'Profile', href: '/user/profile', icon: LayoutDashboard },
    { name: 'My Bookings', href: '/user/bookings', icon: Calendar },
  ];

  useEffect(() => {
    const close = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsProfileOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <>
      <header className="bg-white border-b border-slate-100 fixed top-0 w-full z-[100] h-18 py-2">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="" width="150" />
            </Link>

            {/* DESKTOP NAV: Combines Public + User Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                    location.pathname === link.href ? 'text-yellow-600' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Divider if authenticated */}
              {isAuthenticated && <div className="h-4 w-px bg-slate-200 mx-2" />}
              
              {isAuthenticated && userLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                    location.pathname === link.href ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/user/cart" className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                  <ShoppingCart size={20} className={getCartItemsCount() > 0 ? "fill-rose-500 text-rose-500" : ""} />
                  {getCartItemsCount() > 0 && (
                    <span className="absolute top-0 right-0 bg-black text-yellow-400 text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full border border-white">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:border-yellow-400 transition-all bg-white"
                  >
                    <div className="h-8 w-8 bg-slate-900 text-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-white border border-slate-100 rounded-2xl shadow-2xl py-3 z-[110] animate-in fade-in slide-in-from-top-2">
                      <div className="px-5 py-3 border-b border-slate-50 mb-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                      </div>
                      <Link to="/user/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-widest transition-all"><User size={16}/> Profile Info</Link>
                     
                      <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-3 mt-2 text-[11px] font-black text-rose-600 border-t border-slate-50 hover:bg-rose-50 uppercase tracking-widest"><LogOut size={16}/> Sign Out</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-black">Login</Link>
                <Link to="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-sm">Join Now</Link>
              </div>
            )}

            <button onClick={() => setIsDrawerOpen(true)} className="lg:hidden p-2 text-slate-900 bg-slate-50 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (Visible on top of everything) */}
      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200]" onClick={() => setIsDrawerOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-80 bg-white z-[210] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-10">
              <span className="font-black text-lg uppercase tracking-widest">Menu</span>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-slate-50 rounded-full"><X size={20} /></button>
            </div>
            
            <nav className="flex flex-col gap-3">
              {[...publicLinks, ...(isAuthenticated ? userLinks : [])].map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsDrawerOpen(false)} 
                  className={`px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all border ${
                    location.pathname === link.href ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-slate-50 border-slate-100 text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t pt-6">
              {isAuthenticated ? (
                <button onClick={logout} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-rose-50 text-rose-600 font-black uppercase text-[10px] tracking-widest rounded-2xl">
                  <LogOut size={18}/> Sign Out
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsDrawerOpen(false)} className="w-full block text-center px-6 py-4 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl">
                  Login to Account
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UnifiedHeader;