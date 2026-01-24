import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async'; // Added for SEO Meta Management

// Public Layout
import PublicLayout from './layouts/PublicLayout';

// Public Pages
import Home from './pages/public/Home';
import Tours from './pages/public/Tours';
import TourDetails from './pages/public/TourDetails';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsAndConditions from './pages/public/TermsAndConditions';
import Sitemap from './pages/public/Sitemap';
import Visa from './pages/public/Visa';
import RefundPolicy from './pages/public/RefundPolicy'; // New SEO Page

// User & Admin Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserProfile from './pages/user/UserProfile';
import UserBookings from './pages/user/UserBookings';
import UserCart from './pages/user/UserCart';
import Checkout from './pages/user/Checkout';
import BookingSuccess from './pages/user/BookingSuccess';
import BookingDetails from './pages/user/BookingDetails';
import ETicket from './pages/user/ETicket';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTours from './pages/admin/AdminTours';
import AdminBookings from './pages/admin/AdminBookings';
import AdminTourForm from './pages/admin/AdminTourForm';

// Middleware
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50 selection:bg-amber-500/30">
              <Routes>
                
                {/* --- PUBLIC ROUTES (SEO Optimized Paths) --- */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="tours" element={<Tours />} />
                  <Route path="tours/:id" element={<TourDetails />} />
                  <Route path="about-us" element={<About />} /> {/* Updated for better SEO keyword */}
                  
                  {/* Legal Cluster - Matching Footer & Sitemap Links */}
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="refund-policy" element={<RefundPolicy />} />
                  <Route path="contact-us" element={<Contact />} />
                  <Route path="sitemap" element={<Sitemap />} />
                  <Route path="visa-information" element={<Visa />} />
                  
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                {/* --- USER PROTECTED ROUTES --- */}
                <Route path="/account" element={ // Changed from /user to /account for more standard UX
                  <ProtectedRoute>
                    <UserLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<UserDashboard />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="my-bookings" element={<UserBookings />} />
                  <Route path="bookings/:id" element={<BookingDetails />} />
                  <Route path="cart" element={<UserCart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="booking-success/:id" element={<BookingSuccess />} />
                  <Route path="e-ticket/:id" element={<ETicket />} />
                </Route>

                {/* --- ADMIN PROTECTED ROUTES --- */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="tours" element={<AdminTours />} />
                  <Route path="tours/new" element={<AdminTourForm />} />
                  <Route path="tours/edit/:id" element={<AdminTourForm />} />
                  <Route path="bookings" element={<AdminBookings />} />
                </Route>

                {/* 404 Redirect to Home for SEO safety */}
                <Route path="*" element={<Home />} />
                
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;