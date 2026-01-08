import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png'

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email needed';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    const { confirmPassword, ...submitData } = formData;
    const result = await register(submitData);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ submit: result.message });
    }
    
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&fit=crop&auto=format')`
      }}
    >
      {/* Light Black Shade Overlay */}
      <div className="absolute inset-0 bg-slate-900/60"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full mx-auto">
          
          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-200 hover:text-white text-sm transition-all backdrop-blur-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex justify-center">
                             <img src={logo} alt="" width={150} />
                           </div>
              <h1 className="text-xl sm:text-2xl text-slate-900 mb-2 font-semibold">Create Account</h1>
              <p className="text-sm text-slate-600">Join Tripzybee to start booking your trips</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error */}
              {errors.submit && (
                <div className="bg-rose-50/90 border border-rose-200/80 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-rose-700 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                        errors.name 
                          ? 'border-rose-400 bg-rose-50/80' 
                          : 'border-slate-300/50 hover:border-slate-400/80'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  {errors.name && <p className="mt-2 text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                        errors.email 
                          ? 'border-rose-400 bg-rose-50/80' 
                          : 'border-slate-300/50 hover:border-slate-400/80'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-xs text-rose-600">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                        errors.phone 
                          ? 'border-rose-400 bg-rose-50/80' 
                          : 'border-slate-300/50 hover:border-slate-400/80'
                      }`}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  {errors.phone && <p className="mt-2 text-xs text-rose-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                        errors.password 
                          ? 'border-rose-400 bg-rose-50/80' 
                          : 'border-slate-300/50 hover:border-slate-400/80'
                      }`}
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100/50 rounded transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-2 text-xs text-rose-600">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                        errors.confirmPassword 
                          ? 'border-rose-400 bg-rose-50/80' 
                          : 'border-slate-300/50 hover:border-slate-400/80'
                      }`}
                      placeholder="Repeat password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100/50 rounded transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-2 text-xs text-rose-600">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-sm text-slate-700 uppercase tracking-wide mb-4 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                      Street Address
                    </label>
                    <input
                      id="address.street"
                      name="address.street"
                      type="text"
                      value={formData.address.street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                      placeholder="House number, street name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                      City
                    </label>
                    <input
                      id="address.city"
                      name="address.city"
                      type="text"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                      placeholder="City name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                      State
                    </label>
                    <input
                      id="address.state"
                      name="address.state"
                      type="text"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                      placeholder="State name"
                    />
                  </div>
                  <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                        ZIP Code
                      </label>
                      <input
                        id="address.zipCode"
                        name="address.zipCode"
                        type="text"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                        placeholder="ZIP"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                        Country
                      </label>
                      <select
                        id="address.country"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                      >
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-sm text-slate-700 uppercase tracking-wide mb-4 font-medium flex items-center gap-2">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                      Name
                    </label>
                    <input
                      id="emergencyContact.name"
                      name="emergencyContact.name"
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                      Phone
                    </label>
                    <input
                      id="emergencyContact.phone"
                      name="emergencyContact.phone"
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                      Relationship
                    </label>
                    <select
                      id="emergencyContact.relationship"
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-1 border-slate-300/50 rounded-lg text-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all"
                    >
                      <option value="">Select</option>
                      <option>Parent</option>
                      <option>Spouse</option>
                      <option>Sibling</option>
                      <option>Friend</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 py-4 px-6 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus:ring-2 focus:ring-amber-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

 
