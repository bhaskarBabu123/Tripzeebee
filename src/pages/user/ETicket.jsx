import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Download, ChevronLeft, Calendar, MapPin, 
  Users, Clock, Phone, Mail, CheckCircle 
} from 'lucide-react';
import axios from 'axios';

const ETicket = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/bookings/${id}`);
      setBooking(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'TBD';
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-slate-900 rounded-full animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Loading ticket</span>
        </div>
      </div>
    );
  }

  if (!booking || !booking.eTicket?.issued) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full bg-white rounded-2xl p-6 border border-slate-100">
          <div className="w-12 h-12 mx-auto mb-3 bg-amber-50 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 mb-2">Ticket Not Ready</h2>
          <p className="text-xs text-slate-500 mb-6">E-Ticket not available yet</p>
          <Link to="/user/bookings" className="w-full block bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 py-2.5 px-4 rounded-xl text-xs font-semibold text-center">
            View Trips
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="flex items-center px-4 py-2.5">
          <Link to={`/user/bookings/${booking._id}`} className="p-1.5 -ml-1 rounded-lg hover:bg-slate-50 flex-center">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <h1 className="text-sm font-semibold text-slate-900 ml-2 flex-1">E-Ticket</h1>
          <button
            onClick={handlePrint}
            className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg flex-center hover:scale-105 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-3 lg:px-6 py-3 lg:py-6 print:p-2 print:max-w-full">
        
        {/* Ticket Container */}
        <div className="bg-white border border-slate-100 rounded-2xl lg:rounded-3xl print:border-none print:rounded-none print:shadow-none shadow-none overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
              
              {/* Logo */}
              <div className="flex items-center gap-2 flex-1">
                <div className="w-9 h-9 lg:w-11 lg:h-11 bg-slate-900/20 rounded-xl flex-center">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-slate-900 rounded-lg flex-center" />
                </div>
                <div>
                  <h1 className="text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-tight">Tripzybee</h1>
                  <p className="text-[10px] lg:text-xs text-slate-900/90 uppercase tracking-wider">E-Ticket</p>
                </div>
              </div>

              {/* Ticket ID */}
              <div className="text-right">
                <p className="text-[10px] lg:text-xs text-slate-900/70 uppercase tracking-wider font-mono">Ticket</p>
                <p className="font-bold text-sm lg:text-base text-slate-900">
                  {booking.eTicket?.ticketNumber || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">

            {/* Tour Title */}
            <h2 className="text-sm lg:text-base font-bold text-slate-900 mb-3 lg:mb-4 line-clamp-2 leading-tight">
              {booking.tour?.title || 'Trip Details'}
            </h2>

            {/* Meta Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-4">
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] lg:text-xs">
                <MapPin className="w-2.5 h-2.5 text-amber-500" />
                <span className="font-semibold uppercase tracking-wide truncate">{booking.tour?.destinations?.[0]}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] lg:text-xs">
                <Calendar className="w-2.5 h-2.5 text-amber-500" />
                <span className="font-semibold uppercase tracking-wide">{formatDate(booking.startDate)}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] lg:text-xs">
                <Clock className="w-2.5 h-2.5 text-amber-500" />
                <span className="font-semibold uppercase tracking-wide">{booking.tour?.duration?.days || 0}d</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] lg:text-xs">
                <Users className="w-2.5 h-2.5 text-amber-500" />
                <span className="font-semibold uppercase tracking-wide">{booking.travelers?.length || 0}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right mb-4 pt-1 border-t border-slate-100">
              <p className="text-[10px] lg:text-xs font-medium text-slate-500 uppercase tracking-wide mb-0.5">Total</p>
              <p className="text-base lg:text-lg font-bold text-slate-900">
                ₹{booking.totalPrice?.toLocaleString() || '0'}
              </p>
            </div>

            {/* Booking Info */}
            <div className="bg-slate-50 rounded-xl p-3 lg:p-4 mb-4 border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 text-[10px] lg:text-xs">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600 uppercase tracking-wider">Booking ID</span>
                  <span className="font-mono font-semibold text-slate-900">{booking.bookingId}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600 uppercase tracking-wider">Status</span>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wide">
                    <CheckCircle className="w-2 h-2" />
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className="mb-4">
              <h3 className="text-[11px] lg:text-xs font-semibold text-slate-900 uppercase tracking-wide mb-2.5 flex items-center gap-1">
                Travelers ({booking.travelers?.length || 0})
              </h3>
              <div className="space-y-2">
                {booking.travelers?.slice(0, 3).map((traveler, index) => (
                  <div key={index} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-slate-500 uppercase tracking-wider block text-[8px] mb-0.5">Name</span>
                        <span className="font-semibold text-slate-900 truncate block">{traveler.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase tracking-wider block text-[8px] mb-0.5">ID</span>
                        <span className="font-mono text-[9px] text-slate-900">{traveler.documentNumber}</span>
                      </div>
                    </div>
                  </div>
                )) || <p className="text-[10px] text-slate-500 italic p-3">No travelers</p>}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-1.5 mb-4">
              <h4 className="text-[11px] lg:text-xs font-semibold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1">
                Check-in Rules
              </h4>
              {[
                'Printed ticket required',
                'Valid ID matching booking',
                'Arrive 30min early', 
                'Check weather updates'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-1.5 text-[10px] text-slate-700 leading-tight">
                  <CheckCircle className="w-2.5 h-2.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500 uppercase tracking-wider font-medium">
              <div className="flex flex-wrap gap-4 lg:gap-6 justify-center items-center mb-1.5">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-500" />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="w-px h-3 bg-slate-300 lg:block hidden" />
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-amber-500" />
                  <a href="mailto:support@tripzybee.com">support@tripzybee.com</a>
                </div>
              </div>
              <p>Computer generated • {new Date().toLocaleDateString()}</p>
            </div>

          </div>
        </div>

      </div>

      <style jsx>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:shadow-none * { visibility: visible; }
          .print\\:hidden { display: none !important; }
          @page { margin: 0.5cm; }
        }
      `}</style>
    </div>
  );
};

export default ETicket;
