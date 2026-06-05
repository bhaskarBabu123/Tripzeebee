import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Globe,
  ShieldCheck,
  Zap,
  Headphones,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import contactImage from "../../assets/contact.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTrip: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Split Full Name into First and Last for your Mongoose Schema
    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Not Provided";

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: formData.email,
      number: Number(formData.phone), // Schema expects Number
      Destination: formData.preferredTrip,
      TourDetails: formData.message,
    };

    try {
      const response = await fetch("https://tripzeebee-backend.onrender.com/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredTrip: "",
          message: "",
        });
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "Submission failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const INDIAN_STATES = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>Contact Tripzybee | Travel Agency Bangalore</title>
      </Helmet>

      {/* --- BANNER --- */}
      <section className="bg-gray-900 py-10 lg:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={contactImage}
            className="w-full h-full object-cover"
            alt="Banner"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-black mb-2">
            Connect with Tripzybee
          </p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-none uppercase italic">
            Let's Plan Your{" "}
            <span className="text-amber-500 underline decoration-2 underline-offset-4 not-italic">
              Next Move.
            </span>
          </h1>
        </div>
      </section>

      {/* --- MAIN GRID --- */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 bg-slate-50 border border-gray-100 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle size={16} className="text-amber-600" />
              <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Group Trip & Solo Inquiry Form
              </h2>
            </div>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-green-200">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-black italic uppercase">
                  Message Received!
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Our travel experts will ping you within 60 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[10px] font-black uppercase underline decoration-amber-500 underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-tighter bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="E.G. RAHUL SHARMA"
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="NAME@DOMAIN.COM"
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">
                      WhatsApp Number
                    </label>
                    <input
                      name="phone"
                      type="number"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9036751234"
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase ml-1">
                      Destination
                    </label>
                    <div className="relative">
                      <select
                        name="preferredTrip"
                        value={formData.preferredTrip}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase appearance-none transition-all pr-10"
                      >
                        <option value="">SELECT DESTINATION</option>
                        {INDIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state.toUpperCase()}
                          </option>
                        ))}
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase ml-1">
                    Tour Details
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="TELL US ABOUT YOUR TRAVEL PLANS..."
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl focus:border-amber-500 outline-none p-4 text-xs font-bold uppercase resize-none transition-all"
                  ></textarea>
                </div>
                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      <Send size={14} /> Dispatch Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* --- SIDEBAR --- */}
          <div className="flex flex-col gap-4">
            <div className="bg-amber-500 rounded-3xl p-8 text-black flex-1 shadow-xl shadow-amber-100">
              <h3 className="text-2xl font-black mb-6 italic uppercase leading-tight">
                Bangalore HQ
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 flex items-center gap-1">
                    <Phone size={10} /> Emergency Hotline
                  </p>
                  <p className="text-lg font-black tracking-tighter">
                    +91 90367 51234
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 flex items-center gap-1">
                    <Mail size={10} /> Support Email
                  </p>
                  <p className="text-sm font-black underline decoration-2 underline-offset-4">
                    Tripzybee@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 flex items-center gap-1">
                    <MapPin size={10} /> Registered Office
                  </p>
                  <p className="text-[11px] font-bold leading-relaxed mt-1 uppercase tracking-tight">
                    Lakshmi Tarang Society, 3rd Main Road,
                    <br />
                    RMV 2nd Stage, KGE Layout, Sanjayanagara,
                    <br />
                    Bengaluru, Karnataka 560094
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                <Globe size={14} /> Social Pulse
              </h4>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <Instagram
                  size={20}
                  className="hover:text-amber-500 cursor-pointer transition-colors"
                />
                <Twitter
                  size={20}
                  className="hover:text-amber-500 cursor-pointer transition-colors"
                />
                <Facebook
                  size={20}
                  className="hover:text-amber-500 cursor-pointer transition-colors"
                />
                <span className="text-[10px] font-black tracking-widest text-amber-500">
                  @TRIPZYBEE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
