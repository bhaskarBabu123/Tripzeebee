import { useState, useRef } from "react";

const regions = [
  {
    title: "Varkala",
    desc: "Varkala is a coastal town in Kerala, India, renowned for its unique 15-million-year-old sedimentary cliffs adjacent to the Arabian Sea, a feature known as the Varkala Formation.",
    tags: ["Mountain Treks", "Bike Trips"],
    color: "bg-blue-50",
    image: "https://www.varkkala.com/uploads/slides/2435199045.webp",
  },
  {
    title: "Wayanad",
    desc: "Wayanad is famous for its lush green landscapes, spice plantations (coffee, tea, pepper, cardamom), wildlife sanctuaries, waterfalls, and ancient caves.",
    tags: ["Eco-Tourism", "Backpacking"],
    color: "bg-emerald-50",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/7/2024/12/23173554/glass-bridge-wayanad.jpeg",
  },
  {
    title: "Chikkamagaluru",
    desc: "Chikmagalur, nestled in the serene Western Ghats of Karnataka, is renowned for its lush coffee plantations, scenic beauty, and tranquil ambience.",
    tags: ["Heritage", "Coastal"],
    color: "bg-amber-50",
    image: "https://www.gosahin.com/go/d/1566050941_Chikkamagaluru-District.jpg",
  },
   {
    title: "Chikkamagaluru",
    desc: "Chikmagalur, nestled in the serene Western Ghats of Karnataka, is renowned for its lush coffee plantations, scenic beauty, and tranquil ambience.",
    tags: ["Heritage", "Coastal"],
    color: "bg-amber-50",
    image: "https://www.gosahin.com/go/d/1566050941_Chikkamagaluru-District.jpg",
  }
];

export default function RegionSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => current > 0 && setCurrent(current - 1);
  const next = () => current < regions.length - 1 && setCurrent(current + 1);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) next();
    if (dx > 40) prev();
  };

  return (
    <div className="w-full">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-400 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {regions.map((region, idx) => (
            <div key={idx} className="flex-none w-full px-3">
              <div
                className={`${region.color} rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all group`}
              >
                <img
                  src={region.image}
                  alt={region.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-black mb-3 uppercase italic group-hover:text-amber-600 transition-colors">
                    {region.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 font-medium">
                    {region.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {region.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          ‹
        </button>

        <div className="flex gap-2 items-center">
          {regions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-3 h-3 bg-slate-800 scale-110"
                  : "w-2 h-2 bg-slate-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === regions.length - 1}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}