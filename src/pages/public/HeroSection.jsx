import React, { useEffect, useState } from "react";
import { ChevronRight, MoveRight, Sparkles, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import HeroLaptop from "../../assets/latesthero.mp4";
import HeroMobile from "../../assets/hampi.mp4";
import { Helmet } from "react-helmet-async";

const HeroSection = () => {
  const [sWidth, setSWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileVideo = HeroMobile;
  const desktopVideo = HeroLaptop;

  return (
    <>
      <Helmet>
        <title>
          TripzyBee | Group Tours, Solo Trips, Treks & Adventure Travel India
        </title>
        <meta
          name="description"
          content="TripzyBee is India's trusted travel community offering group tours, solo trips, trekking adventures, backpacking expeditions, Ladakh bike trips, Himalayan journeys and curated travel experiences."
        />
        <meta
          name="keywords"
          content="TripzyBee, group tours India, solo travel India, trekking tours, backpacking trips, Ladakh bike trip, Himalayan tours, travel community India, adventure travel India, weekend getaways"
        />
        <meta name="author" content="TripzyBee" />
        <meta
          property="og:title"
          content="TripzyBee | Solo Friendly Group Trips Across India"
        />
        <meta
          property="og:description"
          content="Explore curated group tours, trekking adventures, backpacking journeys and unforgettable travel experiences with TripzyBee."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tripzybee.com/" />
        <meta
          property="og:image"
          content="https://www.tripzybee.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="TripzyBee | Group Tours & Solo Adventures"
        />
        <meta
          name="twitter:description"
          content="India's travel community for solo travelers, group tours, trekking and adventure trips."
        />
        <link rel="canonical" href="https://www.tripzybee.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "TripzyBee",
            url: "https://www.tripzybee.com",
            description:
              "India's travel community for group tours, solo travel, trekking adventures and curated travel experiences.",
            logo: "https://www.tripzybee.com/logo.png",
          })}
        </script>
      </Helmet>

      {/* --- HERO CONTAINER (Strictly height-restricted for no scrolling) --- */}
      <div className="relative h-[calc(100vh-70px)] min-h-[550px] w-full bg-black text-white overflow-hidden font-sans flex flex-col justify-between">
        {/* --- FULL VIBRANCY REEL VIDEO BACKGROUND (No dark filters/opacity) --- */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            key={sWidth < 568 ? "mobile" : "desktop"}
          >
            <source
              src={sWidth < 568 ? mobileVideo : desktopVideo}
              type="video/mp4"
            />
          </video>
        </div>

        {/* --- MAIN HERO CONTENT (No container shapes, text floats cleanly over the video) --- */}
        <main className="relative z-20 max-w-[1440px] w-full mx-auto px-6 lg:px-16 flex-1 flex flex-col justify-center pt-0">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <Sparkles
                className="text-yellow-400 drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)]"
                size={13}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 drop-shadow-md">
                A Tribe Of Explorers
              </span>
            </div>

            <div className="space-y-1 drop-shadow-lg">
              <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                Tripzy<span className="text-yellow-400">Bee</span>
              </h1>
              <h2 className="text-2xl lg:text-4xl font-light tracking-wide text-white">
                Curated{" "}
                <span className="font-semibold italic text-yellow-400">
                  Solo-Friendly
                </span>{" "}
                Group Trips
              </h2>
            </div>

            <p className="text-xs lg:text-sm font-normal leading-relaxed text-white/90 drop-shadow-md max-w-xl">
              Tripzybee is configured as the{" "}
              <strong className="text-white font-medium">
                best travel agency in Bangalore
              </strong>{" "}
              for 2026. We execute custom <strong>solo travel packages</strong>,{" "}
              <strong>Ladakh bike trips</strong>, and elite{" "}
              <strong>backpacking expeditions</strong> across the Himalayas and
              South India.
            </p>

            {/* RAW MINIMAL ACTION BUTTONS */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
              <Link
                to="/tours"
                className="group relative inline-flex items-center justify-between gap-6 bg-yellow-400 text-black font-extrabold text-[11px] uppercase tracking-wider px-6 py-3.5 rounded-lg overflow-hidden transition-all duration-300 shadow-xl shadow-black/20 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Compass size={14} />
                  Explore All Trips 2026
                </span>
                <ChevronRight
                  size={16}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-yellow-400 transition-colors py-2 drop-shadow-md"
              >
                <span>Best Travel Agency Bangalore</span>
                <MoveRight
                  size={14}
                  className="text-yellow-400 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </main>

        {/* --- INLINE STATS & FOOTER STRIP --- */}
        <div className="relative z-20 w-full border-t border-white/10 bg-black/40 backdrop-blur-sm py-4 px-6 lg:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Flat Inline Text Metrics */}
            <div className="flex items-center gap-8 lg:gap-12 text-[10px] uppercase font-bold tracking-wider">
              <div>
                <span className="text-yellow-400 mr-2">50+</span>
                <span className="text-white/60">Active Routes</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <div>
                <span className="text-yellow-400 mr-2">450+</span>
                <span className="text-white/60">Verified Stays</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <div>
                <span className="text-yellow-400 mr-2">5.0</span>
                <span className="text-white/60">Safety Rating</span>
              </div>
            </div>

            {/* Sub-Footer Brand Labels */}
            <div className="flex items-center gap-4 sm:gap-6 text-[9px] text-white/40 tracking-widest font-bold uppercase">
              <span>Adventure Pack</span>
              <span className="w-1 h-1 bg-yellow-400 rounded-full" />
              <span>Backpacking</span>
              <span className="w-1 h-1 bg-yellow-400 rounded-full" />
              <span>Ladakh Hub</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
