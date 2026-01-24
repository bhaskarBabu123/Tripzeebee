import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X, 
  ChevronLeft, Check, LogOut, Globe, Heart, Briefcase, Map
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: { street: '', city: '', state: '', zipCode: '', country: '' },
    emergencyContact: { name: '', phone: '', relationship: '' },
    preferences: { tourTypes: [], destinations: [] }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        address: user.address || { street: '', city: '', state: '', zipCode: '', country: '' },
        emergencyContact: user.emergencyContact || { name: '', phone: '', relationship: '' },
        preferences: user.preferences || { tourTypes: [], destinations: [] }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateProfile(formData);
    if (success) setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans text-slate-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              {/* <button className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                <ChevronLeft size={22} className="text-slate-600" />
              </button> */}
              <h1 className="text-lg font-semibold tracking-tight">Account Settings</h1>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 shadow-sm"
            >
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          
          {/* Sidebar: Profile Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-24 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
              <div className="px-6 pb-8 -mt-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md mb-4">
                  <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-100">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-slate-400" />
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{formData.name}</h2>
                <p className="text-slate-500 text-sm mb-6">{formData.email}</p>
                
                <div className="w-full space-y-1">
                   <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 text-sm">
                      <span className="text-slate-500">Member Status</span>
                      <span className="font-bold text-amber-600 italic">Premium Bee</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 hidden lg:block shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Security</h3>
              <button className="w-full text-left text-sm font-medium flex items-center justify-between hover:text-amber-600 transition-colors">
                Change Password <ChevronLeft size={16} className="rotate-180" />
              </button>
              <button className="w-full text-left text-sm font-medium flex items-center justify-between hover:text-amber-600 transition-colors">
                Two-Factor Auth <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">OFF</span>
              </button>
            </div>
          </div>

          {/* Main Content: Bento Grid */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Phone size={18}/></div>
                   <h3 className="font-bold text-slate-800">Communication</h3>
                </div>
                <div className="space-y-4">
                   <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phone</p>
                      <p className="text-sm font-semibold">{formData.phone || 'Not provided'}</p>
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Birthday</p>
                      <p className="text-sm font-semibold">{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not set'}</p>
                   </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><MapPin size={18}/></div>
                   <h3 className="font-bold text-slate-800">Home Address</h3>
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-semibold text-slate-700 leading-snug">
                    {formData.address.street || 'Add street address'}
                   </p>
                   <p className="text-sm text-slate-500">
                    {formData.address.city}, {formData.address.state}
                   </p>
                   <p className="text-sm text-slate-500">
                    {formData.address.country} {formData.address.zipCode}
                   </p>
                </div>
              </div>
            </div>

            {/* Emergency Info - Full Width */}
            <div className="bg-[#1E293B] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
               <Shield size={80} className="absolute -right-4 -bottom-4 text-white/5" />
               <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Emergency Contact</h3>
                    <p className="text-lg font-bold">{formData.emergencyContact.name || 'Not set'}</p>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter">{formData.emergencyContact.relationship}</p>
                  </div>
                  <div className="h-12 w-[1px] bg-slate-700 hidden sm:block"></div>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-md">
                     <Phone size={16} className="text-amber-400"/>
                     <span className="font-mono font-bold tracking-tighter">{formData.emergencyContact.phone || '000-000-0000'}</span>
                  </div>
               </div>
            </div>

            {/* Travel Tags */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                   <Map size={16} className="text-slate-400"/> Travel Preferences
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.preferences.tourTypes.length > 0 ? (
                  formData.preferences.tourTypes.map((type, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200">
                      {type}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic">No preferences added yet.</p>
                )}
              </div>
            </div>

            <button 
              onClick={logout}
              className="w-full bg-rose-50 text-rose-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors active:scale-[0.98]"
            >
              <LogOut size={18} /> Log out from Tripzybee
            </button>
          </div>
        </div>
      </main>

      {/* --- PROFESSIONAL EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full h-[92vh] sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit Details</h2>
                <p className="text-xs text-slate-400 font-medium">Update your profile information</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={20}/>
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              <form id="edit-profile-form" onSubmit={handleSave} className="space-y-8">
                
                {/* Basic Section */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                      <input name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-semibold placeholder:text-slate-300" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Phone</label>
                      <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-semibold placeholder:text-slate-300" />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <h3 className="text-xs font-bold text-slate-800 uppercase">Residence</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input placeholder="Street Address" name="address.street" value={formData.address.street} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="City" name="address.city" value={formData.address.city} onChange={handleInputChange} className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold" />
                      <input placeholder="State" name="address.state" value={formData.address.state} onChange={handleInputChange} className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold" />
                    </div>
                  </div>
                </div>

                {/* Emergency Section */}
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <h3 className="text-xs font-bold text-slate-800 uppercase">Emergency Protocol</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input placeholder="Contact Person" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold" />
                    <input placeholder="Relationship" name="emergencyContact.relationship" value={formData.emergencyContact.relationship} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold" />
                    <input placeholder="Contact Phone" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleInputChange} className="sm:col-span-2 w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-semibold font-mono" />
                  </div>
                </div>

              </form>
            </div>

            {/* Fixed Modal Action Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Discard
              </button>
              <button 
                form="edit-profile-form"
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 py-4 rounded-2xl font-bold text-sm text-white hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Save Changes'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;