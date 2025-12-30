import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  CheckCircle,
  Award,
  Headphones,
  Shield
} from 'lucide-react';
import axios from 'axios';
import HeroSection from './HeroSection';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [searchData, setSearchData] = useState({
    destination: '',
    tourType: '',
    startDate: '',
    duration: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      const response = await axios.get('/tours/featured/list');
      setFeaturedTours(response.data);
    } catch (error) {
      console.error('Error fetching featured tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.destination) params.append('destination', searchData.destination);
    if (searchData.tourType) params.append('tourType', searchData.tourType);
    if (searchData.duration) params.append('duration', searchData.duration);

    window.location.href = `/tours?${params.toString()}`;
  };

  const tourTypes = ['Adventure', 'Cultural', 'Beach', 'Mountain', 'Wildlife', 'Religious'];
  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      {/* <section className="relative overflow-hidden border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-[3fr,2fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
              curated indian journeys
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
              Plan your next
              <span className="text-amber-500"> trip</span> with a
              <br className="hidden sm:block" /> trusted local partner.
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mb-6">
              Discover thoughtfully designed itineraries, small-group departures, and
              transparent pricing across India&apos;s most loved destinations.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-3 sm:grid sm:grid-cols-4 sm:items-end sm:gap-3"
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    Destination
                  </label>
                  <select
                    value={searchData.destination}
                    onChange={(e) =>
                      setSearchData({ ...searchData, destination: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select</option>
                    <option value="Kashmir">Kashmir</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Goa">Goa</option>
                    <option value="Himachal">Himachal Pradesh</option>
                    <option value="Andaman">Andaman</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                    <Search className="w-3 h-3 text-amber-500" />
                    Tour type
                  </label>
                  <select
                    value={searchData.tourType}
                    onChange={(e) =>
                      setSearchData({ ...searchData, tourType: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Any</option>
                    {tourTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      Start date
                    </label>
                    <input
                      type="date"
                      value={searchData.startDate}
                      onChange={(e) =>
                        setSearchData({ ...searchData, startDate: e.target.value })
                      }
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-gray-50 border border-gray-200 rounded-md px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                 
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto sm:ml-2 inline-flex items-center justify-center gap-2 bg-amber-500 text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
                >
                  Search
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  No hidden charges
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-500" />
                  Small group departures
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
              >
                Browse all tours
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
              >
                Learn about Tripzybee
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative w-full h-[340px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg"
                alt="Travel in India"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-white">
                <div>
                  <p className="uppercase tracking-[0.15em] text-[10px] text-gray-200">
                    featured destination
                  </p>
                  <p className="text-sm font-medium">Kashmir · Himachal · Rajasthan</p>
                </div>
                <div className="flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>4.8 / 5 (2k+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <HeroSection/>

      {/* How to book */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                A simple way to <span className="text-amber-600">book</span> your trip
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-md">
                Start with a destination, share your dates, and complete the booking in a few
                focused steps.
              </p>
            </div>
            <p className="text-xs text-gray-500">
              End-to-end assistance from first enquiry to your return.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Explore itineraries',
                description:
                  'Browse curated routes for different budgets, seasons, and travel styles.',
                icon: Search
              },
              {
                step: '02',
                title: 'Review details',
                description:
                  'Check day-wise plans, stays, inclusions, and FAQs before you decide.',
                icon: MapPin
              },
              {
                step: '03',
                title: 'Confirm & pay',
                description:
                  'Block your seats with secure online payments and instant confirmation.',
                icon: CheckCircle
              },
              {
                step: '04',
                title: 'Travel with support',
                description:
                  'Get your e-ticket, documents, and on-trip support via phone and WhatsApp.',
                icon: Headphones
              }
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-[11px] font-medium text-black">
                    {item.step}
                  </div>
                  <item.icon className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                Featured <span className="text-amber-600">tours</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-md">
                Handpicked departures with consistent reviews, reliable on-ground teams, and
                clear inclusions.
              </p>
            </div>
            <Link
              to="/tours"
              className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-gray-900"
            >
              View all tours
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-7 h-7 border border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTours.map((tour) => (
                <Link
                  key={tour._id}
                  to={`/tours/${tour._id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
                >
                  <div className="relative h-44 bg-gray-100">
                    <img
                      src={tour.images[0]?.url}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute left-3 top-3 px-2 py-0.5 rounded-full bg-black/70 text-[11px] text-amber-300">
                      {tour.tourType}
                    </div>
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] text-gray-800">
                      <Star className="w-3 h-3 text-amber-500" />
                      <span>{tour.rating?.average || 4.5}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="text-sm font-semibold line-clamp-2">{tour.title}</h3>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {tour.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {tour.duration.days}D / {tour.duration.nights}N
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Max {tour.groupSize.max}</span>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-base font-semibold">
                          ₹{tour.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-gray-500 ml-1">per person</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700">
                        View details
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-12 sm:py-16 bg-[#111111] text-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                Why travellers choose <span className="text-amber-400">Tripzybee</span>
              </h2>
              <p className="text-sm text-gray-300 mt-1 max-w-md">
                A lean team focused on routes we understand well, with attention to details on
                ground.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Local expertise',
                description: 'On-ground teams and guides with deep regional knowledge.'
              },
              {
                icon: CheckCircle,
                title: 'Clear inclusions',
                description: 'Straightforward itineraries, inclusions, and cancellation policies.'
              },
              {
                icon: Headphones,
                title: 'Support on trip',
                description: 'Travel assistance via phone and WhatsApp from start to finish.'
              },
              {
                icon: Shield,
                title: 'Fair pricing',
                description: 'Competitive rates with responsible stays and experiences.'
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-800 bg-[#151515] p-4 flex flex-col gap-3"
              >
                <feature.icon className="w-4 h-4 text-amber-400" />
                <div>
                  <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Share your tentative <span className="text-amber-600">plan</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6 max-w-md">
              If you are still exploring dates or destinations, share a rough idea and a travel
              specialist will get in touch with options and budgets.
            </p>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="font-medium">Visit our office</p>
                  <p className="text-xs text-gray-500">
                    123 Travel Street, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="font-medium">Talk to the team</p>
                  <p className="text-xs text-gray-500">+91 98765 43210 · Mon–Sat · 10am–7pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
              <select className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500">
                <option value="">Preferred trip (optional)</option>
                <option value="Kashmir">Kashmir Valley</option>
                <option value="Rajasthan">Rajasthan Heritage</option>
                <option value="Kerala">Kerala Backwaters</option>
                <option value="Goa">Goa Beaches</option>
              </select>
              <textarea
                rows={4}
                placeholder="Share dates, group size, and a rough budget."
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              ></textarea>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-black text-sm font-medium px-4 py-2.5 rounded-md hover:bg-amber-600 transition-colors"
              >
                Send enquiry
              </button>
            </form>
            <p className="mt-3 text-[11px] text-gray-500">
              No spam. A Tripzybee consultant will contact you within one working day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
