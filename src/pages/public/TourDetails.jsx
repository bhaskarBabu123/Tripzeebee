// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import {
//   Star,
//   Clock,
//   Users,
//   MapPin,
//   Calendar,
//   Shield,
//   CheckCircle,
//   X,
//   Utensils,
//   Bed,
//   Heart,
//   Share2,
//   ChevronLeft,
//   Minus,
//   Plus,
//   ArrowRight,
//   ShieldCheck,
//   Phone,
//   Zap,
//   Briefcase,
//   FileText,
//   Info,
// } from "lucide-react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { useCart } from "../../context/CartContext";
// import ItineraryAccordion from "./ItineraryAccordion";

// const TourDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const { addToCart } = useCart();

//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImg, setSelectedImg] = useState(0);
//   const [bookingData, setBookingData] = useState({
//     travelers: 1,
//     startDate: "",
//   });
//   const [addingToCart, setAddingToCart] = useState(false);

//   useEffect(() => {
//     const fetchTour = async () => {
//       try {
//         const res = await axios.get(`/tours/${id}`);
//         setTour(res.data);
//         if (res.data.startDates?.length > 0) {
//           setBookingData((prev) => ({
//             ...prev,
//             startDate: res.data.startDates[0],
//           }));
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTour();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!isAuthenticated) return navigate("/login");
//     setAddingToCart(true);
//     const result = await addToCart(
//       tour._id,
//       bookingData.travelers,
//       bookingData.startDate,
//     );
//     alert(result.success ? "Saved to Wishlist" : result.message);
//     setAddingToCart(false);
//   };

//   // SEO Structured Data (Schema.org)
//   const jsonLd = tour
//     ? {
//         "@context": "https://schema.org",
//         "@type": "Trip",
//         name: tour.title,
//         description: tour.description,
//         image: tour.images.map((img) => img.url),
//         touristType: tour.tourType,
//         offers: {
//           "@type": "Offer",
//           price: tour.price,
//           priceCurrency: "INR",
//           availability: "https://schema.org/InStock",
//           url: window.location.href,
//         },
//         aggregateRating: {
//           "@type": "AggregateRating",
//           ratingValue: tour.rating.average,
//           reviewCount: tour.rating.count,
//         },
//       }
//     : null;

//   // Skeleton Components (Keeping your original code)
//   const SkeletonNav = () => (
//     <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 animate-pulse">
//       <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
//         <div className="w-24 h-4 bg-slate-200 rounded" />
//         <div className="flex items-center gap-4">
//           <div className="w-20 h-5 bg-slate-200 rounded" />
//           <div className="flex gap-1.5">
//             <div className="w-6 h-6 bg-slate-200 rounded-lg" />
//             <div className="w-6 h-6 bg-slate-200 rounded-lg" />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );

//   const SkeletonGallery = () => (
//     <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm animate-pulse">
//       <div className="relative h-[400px] overflow-hidden rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//       </div>
//       <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-1">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="shrink-0 w-24 h-16 bg-slate-200 rounded-md overflow-hidden"
//           >
//             <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const SkeletonHeader = () => (
//     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse space-y-4">
//       <div className="h-8 bg-slate-200 rounded w-5/6" />
//       <div className="flex flex-wrap items-center gap-5">
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-slate-200 rounded-full" />
//           <div className="h-4 bg-slate-200 rounded w-32" />
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-slate-200 rounded-full" />
//           <div className="h-4 bg-slate-200 rounded w-20" />
//         </div>
//         <div className="w-28 h-6 bg-slate-200 rounded-full" />
//       </div>
//     </div>
//   );

//   const SkeletonStats = () => (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//       {[...Array(4)].map((_, i) => (
//         <div
//           key={i}
//           className="bg-white p-4 border border-slate-200 rounded-xl flex items-center gap-3 animate-pulse"
//         >
//           <div className="w-10 h-10 bg-slate-200 rounded-lg" />
//           <div>
//             <div className="h-3 bg-slate-200 rounded w-16 mb-2" />
//             <div className="h-4 bg-slate-200 rounded w-24" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const SkeletonContent = () => (
//     <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100 animate-pulse">
//       <div className="p-6">
//         <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
//         <div className="space-y-3">
//           <div className="h-4 bg-slate-200 rounded w-full" />
//           <div className="h-4 bg-slate-200 rounded w-5/6" />
//           <div className="h-4 bg-slate-200 rounded w-3/4" />
//           <div className="flex flex-wrap gap-2 mt-4">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="h-6 bg-slate-200 rounded-lg w-20" />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="p-6 grid md:grid-cols-2 gap-8 bg-slate-50/30">
//         <div>
//           <div className="h-3 bg-slate-200 rounded w-28 mb-4" />
//           <div className="space-y-3">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <div className="w-4 h-4 bg-slate-200 rounded-full" />
//                 <div className="h-3 bg-slate-200 rounded w-40" />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <div className="h-3 bg-slate-200 rounded w-32 mb-4" />
//           <div className="space-y-3">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <div className="w-4 h-4 bg-slate-200 rounded-full" />
//                 <div className="h-3 bg-slate-200 rounded w-32" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const SkeletonChecklists = () => (
//     <div className="grid md:grid-cols-2 gap-4">
//       {[...Array(2)].map((_, i) => (
//         <div
//           key={i}
//           className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm animate-pulse"
//         >
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-4 h-4 bg-slate-200 rounded-full" />
//             <div className="h-3 bg-slate-200 rounded w-32" />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {[...Array(6)].map((_, j) => (
//               <div key={j} className="h-6 bg-slate-200 rounded-md w-20" />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const SkeletonSidebar = () => (
//     <div className="lg:col-span-4">
//       <div className="sticky top-20 space-y-4">
//         <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md shadow-slate-200/40 animate-pulse">
//           <div className="mb-6 pb-6 border-b border-slate-50">
//             <div className="h-3 bg-slate-200 rounded w-24 mb-2" />
//             <div className="flex items-baseline gap-2">
//               <div className="h-10 bg-slate-200 rounded w-32" />
//               <div className="h-5 bg-slate-200 rounded w-20" />
//             </div>
//             <div className="h-5 bg-slate-200 rounded w-28 mt-2" />
//           </div>

//           <div className="space-y-5">
//             <div className="space-y-2">
//               <div className="h-3 bg-slate-200 rounded w-20" />
//               <div className="h-12 bg-slate-200 rounded-lg relative" />
//             </div>

//             <div className="space-y-2">
//               <div className="h-3 bg-slate-200 rounded w-28" />
//               <div className="h-12 bg-slate-200 rounded-lg flex items-center justify-between p-3" />
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <div className="h-3 bg-slate-200 rounded w-20" />
//                 <div className="h-6 bg-slate-200 rounded w-24" />
//               </div>
//               <div className="space-y-2">
//                 <div className="h-10 bg-slate-200 rounded-lg" />
//                 <div className="h-10 bg-slate-200 rounded-lg" />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 pt-5 border-t border-slate-50">
//             <div className="flex items-start gap-3">
//               <div className="w-5 h-5 bg-slate-200 rounded-full mt-1" />
//               <div>
//                 <div className="h-3 bg-slate-200 rounded w-32" />
//                 <div className="h-3 bg-slate-200 rounded w-48 mt-1" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-slate-900 h-20 rounded-xl flex items-center justify-between p-5 animate-pulse">
//           <div>
//             <div className="h-3 bg-slate-700 rounded w-24" />
//             <div className="h-4 bg-slate-600 rounded w-32 mt-1" />
//           </div>
//           <div className="w-8 h-8 bg-slate-700 rounded-lg" />
//         </div>
//       </div>
//     </div>
//   );

//   if (loading || !tour) {
//     return (
//       <div className="min-h-screen bg-slate-50/50 text-slate-700 font-sans">
//         <SkeletonNav />
//         <main className="max-w-7xl mx-auto px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             <div className="lg:col-span-8 space-y-6">
//               <SkeletonGallery />
//               <SkeletonHeader />
//               <SkeletonStats />
//               <SkeletonContent />
//               <SkeletonChecklists />
//             </div>
//             <SkeletonSidebar />
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50/50 text-slate-700 font-sans">
//       {/* SEO META TAGS */}
//       <Helmet>
//         <title>{`${tour.title} - Book Now at ₹${tour.price}`}</title>
//         <meta
//           name="description"
//           content={`Explore ${tour.title} for ${tour.duration.days} days. Includes ${tour.highlights.slice(0, 3).join(", ")}. Book your next adventure in ${tour.destinations[0]} today.`}
//         />
//         <meta
//           name="keywords"
//           content={`${tour.destinations.join(", ")}, ${tour.tourType} tour, travel packages, ${tour.title}`}
//         />
//         <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
//       </Helmet>

//       {/* COMPACT NAV */}
//       <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-black transition-colors"
//           >
//             <ChevronLeft size={14} /> BACK TO LIST
//           </button>
//           <div className="flex items-center gap-4">
//             <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase bg-slate-100 px-2 py-1 rounded-md">
//               ID: {tour.tourCode}
//             </span>
//             <div className="flex gap-1.5">
//               <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
//                 <Share2 size={16} className="text-slate-500" />
//               </button>
//               <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
//                 <Heart size={16} className="text-slate-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 py-6">
//         {/* SEO BREADCRUMBS */}
//         <nav className="flex mb-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 gap-2">
//           <Link to="/" className="hover:text-yellow-600 transition-colors">
//             Home
//           </Link>
//           <span>/</span>
//           <Link to="/tours" className="hover:text-yellow-600 transition-colors">
//             Tours
//           </Link>
//           <span>/</span>
//           <span className="text-slate-600">{tour.destinations[0]}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* GALLERY PANEL */}
//             <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
//               <div className="relative h-[400px] overflow-hidden rounded-lg">
//                 <img
//                   src={tour.images[selectedImg]?.url}
//                   className="w-full h-full object-cover"
//                   alt={`${tour.title} main view`}
//                 />
//               </div>
//               <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-1 scrollbar-hide">
//                 {tour.images.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedImg(i)}
//                     className={`shrink-0 w-24 h-16 rounded-md border-2 overflow-hidden transition-all ${selectedImg === i ? "border-yellow-500 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
//                   >
//                     <img
//                       src={img.url}
//                       className="w-full h-full object-cover"
//                       alt={`${tour.title} thumbnail ${i + 1}`}
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* HEADER INFO */}
//             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//               <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
//                 {tour.title}
//               </h1>
//               <div className="flex flex-wrap items-center gap-5 text-sm">
//                 <div className="flex items-center gap-1 text-slate-600">
//                   <MapPin size={14} className="text-yellow-600" />{" "}
//                   {tour.destinations.join(", ")}
//                 </div>
//                 <div className="flex items-center gap-1 text-slate-600">
//                   <Star size={14} className="text-yellow-500 fill-yellow-500" />{" "}
//                   {tour.rating.average}{" "}
//                   <span className="text-slate-400">
//                     ({tour.rating.count} reviews)
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold">
//                   {tour.tourType} Expedition
//                 </div>
//               </div>
//             </div>

//             {/* QUICK STAT GRID */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {[
//                 {
//                   label: "Duration",
//                   val: `${tour.duration.days}D / ${tour.duration.nights}N`,
//                   icon: <Clock size={16} />,
//                 },
//                 {
//                   label: "Group Size",
//                   val: `${tour.groupSize.min}-${tour.groupSize.max} People`,
//                   icon: <Users size={16} />,
//                 },
//                 {
//                   label: "Difficulty",
//                   val: tour.difficulty,
//                   icon: <Zap size={16} />,
//                 },
//                 {
//                   label: "Transport",
//                   val: tour.transport,
//                   icon: <Briefcase size={16} />,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-4 border border-slate-200 rounded-xl flex items-center gap-3 hover:border-slate-300 transition-colors"
//                 >
//                   <div className="p-2 bg-slate-50 text-yellow-600 rounded-lg">
//                     {item.icon}
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
//                       {item.label}
//                     </p>
//                     <p className="text-xs font-bold text-slate-800">
//                       {item.val}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SECTIONS */}
//             <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
//               <div className="p-6">
//                 <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest flex items-center gap-2">
//                   Overview
//                 </h3>
//                 <p className="text-[14px] text-slate-600 leading-relaxed">
//                   {tour.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mt-5">
//                   {tour.highlights.map((h, i) => (
//                     <span
//                       key={i}
//                       className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg"
//                     >
//                       ✦ {h}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <ItineraryAccordion tour={tour} />

//               <div className="p-6 grid md:grid-cols-2 gap-8 bg-slate-50/30">
//                 <div>
//                   <h3 className="text-[11px] font-bold uppercase text-slate-400 mb-3 tracking-widest">
//                     What's Included
//                   </h3>
//                   <ul className="text-xs text-slate-600 space-y-2.5">
//                     {tour.inclusions.map((item, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <CheckCircle
//                           size={14}
//                           className="text-emerald-500 shrink-0"
//                         />{" "}
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="text-[11px] font-bold uppercase text-slate-400 mb-3 tracking-widest">
//                     What's Not Included
//                   </h3>
//                   <ul className="text-xs text-slate-600 space-y-2.5">
//                     {tour.exclusions.map((item, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <X size={14} className="text-rose-400 shrink-0" />{" "}
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* CHECKLISTS */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
//                 <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
//                   <Briefcase size={14} /> Essentials to Carry
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {tour.packingList.map((item, i) => (
//                     <span
//                       key={i}
//                       className="text-[11px] font-medium border border-slate-100 px-2.5 py-1 rounded-md bg-slate-50/50"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
//                 <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
//                   <FileText size={14} /> Documents Required
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {tour.documentsRequired.map((item, i) => (
//                     <span
//                       key={i}
//                       className="text-[11px] font-medium border border-slate-100 px-2.5 py-1 rounded-md bg-slate-50/50"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* SEO RELATED TAGS SECTION */}
//             <div className="p-4 border-t border-slate-200">
//               <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
//                 Related Destinations
//               </p>
//               <div className="flex gap-4 text-[11px] text-yellow-600 font-medium">
//                 <Link
//                   to={`/search?dest=${tour.destinations[0]}`}
//                   className="hover:underline"
//                 >
//                   More tours in {tour.destinations[0]}
//                 </Link>
//                 <Link
//                   to={`/search?type=${tour.tourType}`}
//                   className="hover:underline"
//                 >
//                   Top {tour.tourType} Packages
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <div className="lg:col-span-4">
//             <div className="sticky top-20 space-y-4">
//               <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md shadow-slate-200/40">
//                 <div className="mb-6 pb-6 border-b border-slate-50">
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
//                     Total Package Price
//                   </p>
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-3xl font-bold text-slate-900 tracking-tight">
//                       ₹{tour.price.toLocaleString()}
//                     </span>
//                     <span className="text-sm text-slate-400 line-through">
//                       ₹{tour.originalPrice.toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="mt-2 inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">
//                     BEST PRICE GUARANTEED
//                   </div>
//                 </div>

//                 <div className="space-y-5">
//                   <div className="space-y-2">
//                     <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
//                       Travel Date
//                     </label>
//                     {tour.startDates?.length > 0 ? (
//                       <select
//                         value={bookingData.startDate}
//                         onChange={(e) =>
//                           setBookingData((p) => ({
//                             ...p,
//                             startDate: e.target.value,
//                           }))
//                         }
//                         className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg appearance-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none transition-all cursor-pointer"
//                       >
//                         {tour.startDates.map((date, i) => (
//                           <option key={i} value={date}>
//                             {new Date(date).toLocaleDateString("en-IN", {
//                               weekday: "short",
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                             })}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <div className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg text-slate-400">
//                         No dates available — contact us
//                       </div>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
//                       Number of Guests
//                     </label>
//                     <div className="flex items-center justify-between border border-slate-200 p-2 rounded-lg bg-slate-50">
//                       <button
//                         onClick={() =>
//                           setBookingData((p) => ({
//                             ...p,
//                             travelers: Math.max(1, p.travelers - 1),
//                           }))
//                         }
//                         className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-yellow-400 transition-colors"
//                       >
//                         <Minus size={14} />
//                       </button>
//                       <span className="text-sm font-bold text-slate-800">
//                         {bookingData.travelers}
//                       </span>
//                       <button
//                         onClick={() =>
//                           setBookingData((p) => ({
//                             ...p,
//                             travelers: Math.min(
//                               tour.groupSize.max,
//                               p.travelers + 1,
//                             ),
//                           }))
//                         }
//                         className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-yellow-400 transition-colors"
//                       >
//                         <Plus size={14} />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="pt-2">
//                     <div className="flex justify-between items-center mb-4 px-1">
//                       <span className="text-xs font-semibold text-slate-500">
//                         Net Payable:
//                       </span>
//                       <span className="text-xl font-bold text-slate-900">
//                         ₹{(tour.price * bookingData.travelers).toLocaleString()}
//                       </span>
//                     </div>

//                     <div className="space-y-2.5">
//                       <button
//                         onClick={() =>
//                           navigate("/user/checkout", {
//                             state: { tour, ...bookingData },
//                           })
//                         }
//                         className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
//                       >
//                         Proceed to Booking
//                       </button>
//                       <button
//                         onClick={handleAddToCart}
//                         disabled={addingToCart}
//                         className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
//                       >
//                         {addingToCart ? "Wait..." : "Add to Wishlist"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-5 border-t border-slate-50">
//                   <div className="flex items-start gap-3">
//                     <ShieldCheck
//                       size={18}
//                       className="text-emerald-500 mt-0.5"
//                     />
//                     <div>
//                       <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
//                         Free Cancellation
//                       </p>
//                       <p className="text-[10px] text-slate-500 leading-normal">
//                         {tour.cancellationPolicy}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
//                 <div>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
//                     Expert Help
//                   </p>
//                   <p className="text-xs font-semibold">+91 9036751234</p>
//                 </div>
//                 <div className="p-2 bg-slate-800 rounded-lg">
//                   <Phone size={18} className="text-yellow-400" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TourDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  Shield,
  CheckCircle,
  X,
  Utensils,
  Bed,
  Heart,
  Share2,
  ChevronLeft,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Phone,
  Zap,
  Briefcase,
  FileText,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import axios from "axios";
import emailjs from "@emailjs/browser"; // ADDED: EmailJS client for sending booking requests
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import ItineraryAccordion from "./ItineraryAccordion";

// ADDED: Replace these with your real EmailJS credentials from emailjs.com
const EMAILJS_SERVICE_ID = "service_3krkqnm";
const EMAILJS_TEMPLATE_ID = "template_qllq6hv";
const EMAILJS_PUBLIC_KEY = "7ogPXMKfFPMLlyri8";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    startDate: "",
  });
  const [addingToCart, setAddingToCart] = useState(false);

  // ADDED: state for the Book Now popup + booking-request form + email send status
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    idProofType: "Aadhar Card",
    idProofNumber: "",
    emergencyName: "",
    emergencyPhone: "",
    specialRequests: "",
  });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // null | "success" | "error"

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`/tours/${id}`);
        setTour(res.data);
        if (res.data.startDates?.length > 0) {
          setBookingData((prev) => ({
            ...prev,
            startDate: res.data.startDates[0],
          }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) return navigate("/login");
    setAddingToCart(true);
    const result = await addToCart(
      tour._id,
      bookingData.travelers,
      bookingData.startDate,
    );
    alert(result.success ? "Saved to Wishlist" : result.message);
    setAddingToCart(false);
  };

  // ADDED: generic handler for booking form inputs
  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  // ADDED: reset the popup back to a blank form (used after closing / trying again)
  const resetBookingModal = () => {
    setShowBookingModal(false);
    setSendStatus(null);
    setSending(false);
  };

  // ADDED: builds the full data payload and sends it via EmailJS to admin
  const handleSendBooking = async (e) => {
    e.preventDefault();

    // Basic required-field guard so admin doesn't get empty requests
    if (
      !bookingForm.fullName ||
      !bookingForm.email ||
      !bookingForm.phone ||
      !bookingForm.address ||
      !bookingForm.city ||
      !bookingForm.idProofNumber
    ) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    setSending(true);
    setSendStatus(null);

    const formattedDate = bookingData.startDate
      ? new Date(bookingData.startDate).toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not specified";

    // All trip + traveler details bundled together to send to admin's inbox
    const templateParams = {
      // Trip details
      tour_title: tour.title,
      tour_code: tour.tourCode,
      tour_destinations: tour.destinations.join(", "),
      tour_type: tour.tourType,
      tour_duration: `${tour.duration.days}D / ${tour.duration.nights}N`,
      tour_price_per_person: `₹${tour.price.toLocaleString()}`,
      travel_start_date: formattedDate,
      total_travelers: bookingData.travelers,
      total_payable: `₹${(tour.price * bookingData.travelers).toLocaleString()}`,

      // Customer / traveler details
      customer_name: bookingForm.fullName,
      customer_email: bookingForm.email,
      customer_phone: bookingForm.phone,
      customer_alt_phone: bookingForm.altPhone || "N/A",
      customer_address: bookingForm.address,
      customer_city: bookingForm.city,
      id_proof_type: bookingForm.idProofType,
      id_proof_number: bookingForm.idProofNumber,
      emergency_contact_name: bookingForm.emergencyName || "N/A",
      emergency_contact_phone: bookingForm.emergencyPhone || "N/A",
      special_requests: bookingForm.specialRequests || "None",

      // So admin can hit "reply" straight to the customer
      reply_to: bookingForm.email,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setSendStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };

  // SEO Structured Data (Schema.org)
  const jsonLd = tour
    ? {
        "@context": "https://schema.org",
        "@type": "Trip",
        name: tour.title,
        description: tour.description,
        image: tour.images.map((img) => img.url),
        touristType: tour.tourType,
        offers: {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: window.location.href,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tour.rating.average,
          reviewCount: tour.rating.count,
        },
      }
    : null;

  // Skeleton Components (Keeping your original code)
  const SkeletonNav = () => (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
        <div className="w-24 h-4 bg-slate-200 rounded" />
        <div className="flex items-center gap-4">
          <div className="w-20 h-5 bg-slate-200 rounded" />
          <div className="flex gap-1.5">
            <div className="w-6 h-6 bg-slate-200 rounded-lg" />
            <div className="w-6 h-6 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    </nav>
  );

  const SkeletonGallery = () => (
    <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm animate-pulse">
      <div className="relative h-[400px] overflow-hidden rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
      <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-24 h-16 bg-slate-200 rounded-md overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );

  const SkeletonHeader = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse space-y-4">
      <div className="h-8 bg-slate-200 rounded w-5/6" />
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-200 rounded-full" />
          <div className="h-4 bg-slate-200 rounded w-32" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-200 rounded-full" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
        <div className="w-28 h-6 bg-slate-200 rounded-full" />
      </div>
    </div>
  );

  const SkeletonStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-4 border border-slate-200 rounded-xl flex items-center gap-3 animate-pulse"
        >
          <div className="w-10 h-10 bg-slate-200 rounded-lg" />
          <div>
            <div className="h-3 bg-slate-200 rounded w-16 mb-2" />
            <div className="h-4 bg-slate-200 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );

  const SkeletonContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100 animate-pulse">
      <div className="p-6">
        <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="flex flex-wrap gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-slate-200 rounded-lg w-20" />
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 grid md:grid-cols-2 gap-8 bg-slate-50/30">
        <div>
          <div className="h-3 bg-slate-200 rounded w-28 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded w-40" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-3 bg-slate-200 rounded w-32 mb-4" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonChecklists = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm animate-pulse"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-slate-200 rounded-full" />
            <div className="h-3 bg-slate-200 rounded w-32" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="h-6 bg-slate-200 rounded-md w-20" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const SkeletonSidebar = () => (
    <div className="lg:col-span-4">
      <div className="sticky top-20 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md shadow-slate-200/40 animate-pulse">
          <div className="mb-6 pb-6 border-b border-slate-50">
            <div className="h-3 bg-slate-200 rounded w-24 mb-2" />
            <div className="flex items-baseline gap-2">
              <div className="h-10 bg-slate-200 rounded w-32" />
              <div className="h-5 bg-slate-200 rounded w-20" />
            </div>
            <div className="h-5 bg-slate-200 rounded w-28 mt-2" />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded w-20" />
              <div className="h-12 bg-slate-200 rounded-lg relative" />
            </div>

            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded w-28" />
              <div className="h-12 bg-slate-200 rounded-lg flex items-center justify-between p-3" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-3 bg-slate-200 rounded w-20" />
                <div className="h-6 bg-slate-200 rounded w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-10 bg-slate-200 rounded-lg" />
                <div className="h-10 bg-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-50">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-slate-200 rounded-full mt-1" />
              <div>
                <div className="h-3 bg-slate-200 rounded w-32" />
                <div className="h-3 bg-slate-200 rounded w-48 mt-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 h-20 rounded-xl flex items-center justify-between p-5 animate-pulse">
          <div>
            <div className="h-3 bg-slate-700 rounded w-24" />
            <div className="h-4 bg-slate-600 rounded w-32 mt-1" />
          </div>
          <div className="w-8 h-8 bg-slate-700 rounded-lg" />
        </div>
      </div>
    </div>
  );

  if (loading || !tour) {
    return (
      <div className="min-h-screen bg-slate-50/50 text-slate-700 font-sans">
        <SkeletonNav />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <SkeletonGallery />
              <SkeletonHeader />
              <SkeletonStats />
              <SkeletonContent />
              <SkeletonChecklists />
            </div>
            <SkeletonSidebar />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-700 font-sans">
      {/* SEO META TAGS */}
      <Helmet>
        <title>{`${tour.title} - Book Now at ₹${tour.price}`}</title>
        <meta
          name="description"
          content={`Explore ${tour.title} for ${tour.duration.days} days. Includes ${tour.highlights.slice(0, 3).join(", ")}. Book your next adventure in ${tour.destinations[0]} today.`}
        />
        <meta
          name="keywords"
          content={`${tour.destinations.join(", ")}, ${tour.tourType} tour, travel packages, ${tour.title}`}
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* COMPACT NAV */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-black transition-colors"
          >
            <ChevronLeft size={14} /> BACK TO LIST
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase bg-slate-100 px-2 py-1 rounded-md">
              ID: {tour.tourCode}
            </span>
            <div className="flex gap-1.5">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <Share2 size={16} className="text-slate-500" />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <Heart size={16} className="text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* SEO BREADCRUMBS */}
        <nav className="flex mb-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 gap-2">
          <Link to="/" className="hover:text-yellow-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-yellow-600 transition-colors">
            Tours
          </Link>
          <span>/</span>
          <span className="text-slate-600">{tour.destinations[0]}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            {/* GALLERY PANEL */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img
                  src={tour.images[selectedImg]?.url}
                  className="w-full h-full object-cover"
                  alt={`${tour.title} main view`}
                />
              </div>
              <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-1 scrollbar-hide">
                {tour.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`shrink-0 w-24 h-16 rounded-md border-2 overflow-hidden transition-all ${selectedImg === i ? "border-yellow-500 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover"
                      alt={`${tour.title} thumbnail ${i + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* HEADER INFO */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-1 text-slate-600">
                  <MapPin size={14} className="text-yellow-600" />{" "}
                  {tour.destinations.join(", ")}
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />{" "}
                  {tour.rating.average}{" "}
                  <span className="text-slate-400">
                    ({tour.rating.count} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold">
                  {tour.tourType} Expedition
                </div>
              </div>
            </div>

            {/* QUICK STAT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Duration",
                  val: `${tour.duration.days}D / ${tour.duration.nights}N`,
                  icon: <Clock size={16} />,
                },
                {
                  label: "Group Size",
                  val: `${tour.groupSize.min}-${tour.groupSize.max} People`,
                  icon: <Users size={16} />,
                },
                {
                  label: "Difficulty",
                  val: tour.difficulty,
                  icon: <Zap size={16} />,
                },
                {
                  label: "Transport",
                  val: tour.transport,
                  icon: <Briefcase size={16} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 border border-slate-200 rounded-xl flex items-center gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="p-2 bg-slate-50 text-yellow-600 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECTIONS */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
              <div className="p-6">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest flex items-center gap-2">
                  Overview
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {tour.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {tour.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg"
                    >
                      ✦ {h}
                    </span>
                  ))}
                </div>
              </div>

              <ItineraryAccordion tour={tour} />

              <div className="p-6 grid md:grid-cols-2 gap-8 bg-slate-50/30">
                <div>
                  <h3 className="text-[11px] font-bold uppercase text-slate-400 mb-3 tracking-widest">
                    What's Included
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-2.5">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle
                          size={14}
                          className="text-emerald-500 shrink-0"
                        />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold uppercase text-slate-400 mb-3 tracking-widest">
                    What's Not Included
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-2.5">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <X size={14} className="text-rose-400 shrink-0" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CHECKLISTS */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                  <Briefcase size={14} /> Essentials to Carry
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tour.packingList.map((item, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium border border-slate-100 px-2.5 py-1 rounded-md bg-slate-50/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                  <FileText size={14} /> Documents Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tour.documentsRequired.map((item, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium border border-slate-100 px-2.5 py-1 rounded-md bg-slate-50/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO RELATED TAGS SECTION */}
            <div className="p-4 border-t border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
                Related Destinations
              </p>
              <div className="flex gap-4 text-[11px] text-yellow-600 font-medium">
                <Link
                  to={`/search?dest=${tour.destinations[0]}`}
                  className="hover:underline"
                >
                  More tours in {tour.destinations[0]}
                </Link>
                <Link
                  to={`/search?type=${tour.tourType}`}
                  className="hover:underline"
                >
                  Top {tour.tourType} Packages
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md shadow-slate-200/40">
                <div className="mb-6 pb-6 border-b border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Total Package Price
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      ₹{tour.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{tour.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">
                    BEST PRICE GUARANTEED
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Travel Date
                    </label>
                    {tour.startDates?.length > 0 ? (
                      <select
                        value={bookingData.startDate}
                        onChange={(e) =>
                          setBookingData((p) => ({
                            ...p,
                            startDate: e.target.value,
                          }))
                        }
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg appearance-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none transition-all cursor-pointer"
                      >
                        {tour.startDates.map((date, i) => (
                          <option key={i} value={date}>
                            {new Date(date).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg text-slate-400">
                        No dates available — contact us
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Number of Guests
                    </label>
                    <div className="flex items-center justify-between border border-slate-200 p-2 rounded-lg bg-slate-50">
                      <button
                        onClick={() =>
                          setBookingData((p) => ({
                            ...p,
                            travelers: Math.max(1, p.travelers - 1),
                          }))
                        }
                        className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-yellow-400 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-slate-800">
                        {bookingData.travelers}
                      </span>
                      <button
                        onClick={() =>
                          setBookingData((p) => ({
                            ...p,
                            travelers: Math.min(
                              tour.groupSize.max,
                              p.travelers + 1,
                            ),
                          }))
                        }
                        className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-yellow-400 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-4 px-1">
                      <span className="text-xs font-semibold text-slate-500">
                        Net Payable:
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        ₹{(tour.price * bookingData.travelers).toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {/*
                        ORIGINAL "Proceed to Booking" button — kept here, commented out.
                        Hidden instead of removed because online checkout/payment
                        gateway attracts GST on the transaction. Booking requests
                        are now collected via the "Book Now" popup below and
                        emailed to admin instead, so no online payment is taken here.
                      */}
                      {/*
                      <button
                        onClick={() =>
                          navigate("/user/checkout", {
                            state: { tour, ...bookingData },
                          })
                        }
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                      >
                        Proceed to Booking
                      </button>
                      */}

                      {/* ADDED: Book Now opens the booking-request popup */}
                      <button
                        onClick={() => {
                          if (!isAuthenticated) return navigate("/login");
                          setSendStatus(null);
                          setShowBookingModal(true);
                        }}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                      >
                        Book Now
                      </button>

                      <button
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                        className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                        {addingToCart ? "Wait..." : "Add to Wishlist"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-50">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={18}
                      className="text-emerald-500 mt-0.5"
                    />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                        Free Cancellation
                      </p>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {tour.cancellationPolicy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Expert Help
                  </p>
                  <p className="text-xs font-semibold">+91 9036751234</p>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Phone size={18} className="text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ADDED: Book Now popup — collects trip + traveler details and emails admin */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* SUCCESS STATE */}
            {sendStatus === "success" ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Booking Request Sent!
                </h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Your request for <b>{tour.title}</b> has been emailed to our
                  team. We'll reach out to you at {bookingForm.email} shortly
                  to confirm your trip.
                </p>
                <button
                  onClick={resetBookingModal}
                  className="mt-6 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            ) : sendStatus === "error" ? (
              /* ERROR STATE */
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                  <XCircle size={32} className="text-rose-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Couldn't Send Request
                </h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Something went wrong while sending your booking request.
                  Please try again, or call us at +91 9036751234.
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSendStatus(null)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={resetBookingModal}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* FORM STATE */
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Complete Your Booking Request
                  </h3>
                  <button
                    onClick={resetBookingModal}
                    disabled={sending}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X size={18} className="text-slate-500" />
                  </button>
                </div>

                {/* Trip summary (read-only, pulled from selections above) */}
                <div className="mx-6 mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <p className="font-bold text-slate-800">{tour.title}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-slate-500">
                    <span>
                      <Calendar size={12} className="inline mr-1 -mt-0.5" />
                      {bookingData.startDate
                        ? new Date(bookingData.startDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )
                        : "No date selected"}
                    </span>
                    <span>
                      <Users size={12} className="inline mr-1 -mt-0.5" />
                      {bookingData.travelers} traveler
                      {bookingData.travelers > 1 ? "s" : ""}
                    </span>
                    <span className="font-bold text-slate-800">
                      Total: ₹
                      {(tour.price * bookingData.travelers).toLocaleString()}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSendBooking} className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={bookingForm.fullName}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={bookingForm.email}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={bookingForm.phone}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="+91 9XXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Alternate Phone
                      </label>
                      <input
                        type="tel"
                        name="altPhone"
                        value={bookingForm.altPhone}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={bookingForm.address}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="House no, street, area"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={bookingForm.city}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="e.g. Mangaluru"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        ID Proof Type
                      </label>
                      <select
                        name="idProofType"
                        value={bookingForm.idProofType}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all cursor-pointer"
                      >
                        <option>Aadhar Card</option>
                        <option>Passport</option>
                        <option>Driving License</option>
                        <option>Voter ID</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        ID Proof Number *
                      </label>
                      <input
                        type="text"
                        name="idProofNumber"
                        required
                        value={bookingForm.idProofNumber}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="ID number"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        name="emergencyName"
                        value={bookingForm.emergencyName}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={bookingForm.emergencyPhone}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        rows={3}
                        value={bookingForm.specialRequests}
                        onChange={handleBookingFormChange}
                        className="w-full border border-slate-200 bg-slate-50 text-sm p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all resize-none"
                        placeholder="Dietary needs, room preferences, etc."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      "Send Booking Request"
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">
                    No online payment is taken here — our team will contact
                    you to confirm and arrange payment offline.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
