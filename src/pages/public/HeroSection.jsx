import React, { useEffect, useState } from "react";
import { ChevronRight, MoveRight, Sparkles, Compass, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import HeroLaptop from "../../assets/latesthero.mp4";
import HeroMobile from "../../assets/latesthero.mp4";
import { Helmet } from "react-helmet-async";

const STATS = [
  { value: "50+", label: "Active Routes" },
  { value: "450+", label: "Verified Stays" },
  { value: "5.0", label: "Safety Rating" },
];

const TAGS = ["Adventure Pack", "Backpacking", "Ladakh Hub"];

const HeroSection = () => {
  // matchMedia instead of raw innerWidth — avoids firing on every resize
  // tick and plays nicer with SSR hydration.
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handleChange = (e) => setIsMobile(e.matches);
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          TripzyBee | Group Tours, Solo Trips, Treks &amp; Adventure Travel India
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

      {/* 100dvh instead of 100vh: fixes the mobile address-bar jump that
          used to clip the CTA button on iOS Safari / Chrome Android */}
      <section
        aria-label="TripzyBee hero"
        className="relative h-[100dvh] max-h-[900px] min-h-[580px] w-full bg-black text-white overflow-hidden font-sans flex flex-col justify-between"
      >
        {/* --- VIDEO BACKGROUND (unchanged source, same mobile/desktop split) --- */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            key={isMobile ? "mobile" : "desktop"}
          >
            <source src={isMobile ? HeroMobile : HeroLaptop} type="video/mp4" />
          </video>
          {/* Layered gradients: keeps footage vibrant in the mid-frame while
              guaranteeing text contrast top and bottom — no flat dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* --- MAIN CONTENT --- */}
        <main className="relative z-20 max-w-[1440px] w-full mx-auto px-6 lg:px-16 flex-1 flex flex-col justify-center pt-16 sm:pt-0">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-yellow-400/20 rounded-full pl-2.5 pr-4 py-1.5 w-fit">
              <Sparkles
                className="text-yellow-400 drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)]"
                size={13}
                aria-hidden="true"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
                A Tribe Of Explorers
              </span>
            </div>

            <div className="space-y-1 drop-shadow-lg">
              <h1 className="text-[15vw] sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                Tripzy<span className="text-yellow-400">Bee</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-light tracking-wide text-white/95">
                Curated{" "}
                <span className="font-semibold italic text-yellow-400">
                  Solo-Friendly
                </span>{" "}
                Group Trips
              </h2>
            </div>

            <p className="text-xs lg:text-sm font-normal leading-relaxed text-white/85 drop-shadow-md max-w-xl">
              TripzyBee is the{" "}
              <strong className="text-white font-semibold">
                best travel agency in Bangalore
              </strong>{" "}
              for 2026 — running custom{" "}
              <strong className="font-semibold">solo travel packages</strong>,{" "}
              <strong className="font-semibold">Ladakh bike trips</strong>, and
              elite <strong className="font-semibold">backpacking expeditions</strong>{" "}
              across the Himalayas and South India.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
              <Link
                to="/tours"
                className="group relative inline-flex items-center justify-between gap-6 bg-yellow-400 text-black font-extrabold text-[11px] uppercase tracking-wider px-7 py-4 rounded-lg overflow-hidden transition-all duration-300 shadow-xl shadow-yellow-400/10 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Compass size={14} aria-hidden="true" />
                  Explore All Trips 2026
                </span>
                <ChevronRight
                  size={16}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/90 hover:text-yellow-400 transition-colors py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded"
              >
                <span>Best Travel Agency Bangalore</span>
                <MoveRight
                  size={14}
                  className="text-yellow-400 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </main>

        {/* --- Scroll cue: small, quiet, disappears if reduced-motion is set --- */}
        <div className="relative z-20 hidden sm:flex justify-center pb-2" aria-hidden="true">
          <ChevronDown className="text-white/40 motion-safe:animate-bounce" size={18} />
        </div>

        {/* --- STATS + TAGS STRIP --- */}
        <div className="relative z-20 w-full border-t border-white/10 bg-black/40 backdrop-blur-sm py-4 px-6 lg:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-12 text-[10px] uppercase font-bold tracking-wider flex-wrap justify-center">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && (
                    <div className="w-px h-3 bg-white/20 hidden sm:block" aria-hidden="true" />
                  )}
                  <div>
                    <span className="text-yellow-400 mr-2">{stat.value}</span>
                    <span className="text-white/60">{stat.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-[9px] text-white/40 tracking-widest font-bold uppercase">
              {TAGS.map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && (
                    <span className="w-1 h-1 bg-yellow-400 rounded-full" aria-hidden="true" />
                  )}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;