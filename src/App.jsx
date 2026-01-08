import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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

// User Layout
import UserLayout from './layouts/UserLayout';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserProfile from './pages/user/UserProfile';
import UserBookings from './pages/user/UserBookings';
import UserCart from './pages/user/UserCart';
import Checkout from './pages/user/Checkout';
import BookingSuccess from './pages/user/BookingSuccess';
import BookingDetails from './pages/user/BookingDetails';
import ETicket from './pages/user/ETicket';

// Admin Layout
import AdminLayout from './layouts/AdminLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTours from './pages/admin/AdminTours';
import AdminBookings from './pages/admin/AdminBookings';
import AdminTourForm from './pages/admin/AdminTourForm';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsAndConditions from './pages/public/TermsAndConditions';
import Sitemap from './pages/public/Sitemap';
import Visa from './pages/public/Visa';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop/>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="tours" element={<Tours />} />
                <Route path="tours/:id" element={<TourDetails />} />
                <Route path="about" element={<About />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsAndConditions />} />
                <Route path="contact" element={<Contact />} />
                <Route path="sitemap" element={<Sitemap />} />
                <Route path="visa" element={<Visa />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* User Protected Routes */}
              <Route path="/user" element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }>
                <Route index element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="bookings" element={<UserBookings />} />
                <Route path="bookings/:id" element={<BookingDetails />} />
                <Route path="cart" element={<UserCart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="booking-success/:id" element={<BookingSuccess />} />
                <Route path="ticket/:id" element={<ETicket />} />
              </Route>

              {/* Admin Protected Routes */}
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
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Cart from './Cart'

// function App() {
//   return (
//     <div>

//       <BrowserRouter>
//         <Routes>
//          <Route path='/Bhaskar' element={<Cart productname="iphone" productimage="https://cdn.thewirecutter.com/wp-content/media/2025/09/BG-IPHONE-2048px_IPHONE-17-PRO-MAX_BACK.jpg?auto=webp&quality=75&width=1024"/>}/>

//         </Routes>
      
//       </BrowserRouter>
      
//     </div>
//   )
// }

// export default App