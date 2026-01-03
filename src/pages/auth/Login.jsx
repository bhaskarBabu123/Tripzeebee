import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png'


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || '/user';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email needed';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password required';
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
    const result = await login(formData);
    
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
        <div className="max-w-md w-full mx-auto">
          
          {/* Back Button */}
          {/* <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-200 hover:text-white text-sm transition-all backdrop-blur-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link> */}

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-xl">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <img src={logo} alt="" width={150} />
              </div>
              <h1 className="text-2xl text-slate-900 mb-2 font-semibold">Sign In</h1>
              <p className="text-sm text-slate-600">Enter your details to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error */}
              {errors.submit && (
                <div className="bg-rose-50/90 border border-rose-200/80 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-rose-700 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                      errors.email 
                        ? 'border-rose-400 bg-rose-50/80' 
                        : 'border-slate-300/50 hover:border-slate-400/80'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-rose-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs text-slate-700 uppercase tracking-wide mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border border-1 rounded-lg text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${
                      errors.password 
                        ? 'border-rose-400 bg-rose-50/80' 
                        : 'border-slate-300/50 hover:border-slate-400/80'
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100/50 rounded transition-colors backdrop-blur-sm"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs text-rose-600">{errors.password}</p>
                )}
              </div>

           

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 py-3.5 px-4 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus:ring-2 focus:ring-amber-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 px-4 text-xs text-slate-500">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Signup & Demo */}
              <div className="text-center space-y-4">
                <p className="text-xs text-slate-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    Create account
                  </Link>
                </p>

                {/* Demo Accounts */}
                {/* <div className="pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-4 text-center">Quick Demo Login</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setFormData({email: 'admin@tripzybee.com', password: 'admin123'})}
                      className="w-full p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all text-xs text-left backdrop-blur-sm"
                    >
                      <div className="font-medium text-slate-800 mb-1">Admin</div>
                      <div className="text-slate-600">admin@tripzybee.com</div>
                      <div className="text-slate-600 font-mono text-[10px]">admin123</div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({email: 'john@example.com', password: 'user123'})}
                      className="w-full p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all text-xs text-left backdrop-blur-sm"
                    >
                      <div className="font-medium text-slate-800 mb-1">User</div>
                      <div className="text-slate-600">john@example.com</div>
                      <div className="text-slate-600 font-mono text-[10px]">user123</div>
                    </button>
                  </div>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
