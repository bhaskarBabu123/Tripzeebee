import { useState, useRef } from "react";

const regions = [
  {
    title: "Varkala",
    desc: "Varkala is a coastal town in Kerala, India, renowned for its unique 15-million-year-old sedimentary cliffs adjacent to the Arabian Sea, a feature known as the Varkala Formation.",
    tags: ["Mountain Treks", "Bike Trips"],
    color: "bg-blue-50",
    image: "https://holaciti.com/assets/Articles/1764469841_1ViFxIR2ey.webp",
  },
  {
    title: "Wayanad",
    desc: "Wayanad is famous for its lush green landscapes, spice plantations (coffee, tea, pepper, cardamom), wildlife sanctuaries, waterfalls, and ancient caves.",
    tags: ["Eco-Tourism", "Backpacking"],
    color: "bg-emerald-50",
    image: "https://assets.cntraveller.in/photos/64a80fe81e94724098a8021d/4:3/w_2356,h_1767,c_limit/mountain%20shadows.jpeg",
  },
  {
    title: "Chikkamagaluru",
    desc: "Chikmagalur, nestled in the serene Western Ghats of Karnataka, is renowned for its lush coffee plantations, scenic beauty, and tranquil ambience.",
    tags: ["Heritage", "Coastal"],
    color: "bg-amber-50",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2026/06/26132043/untitled-design-2026-05-19t150131-235.jpeg",
  },
  {
    title: "Kodaikanal",
    desc: "Kodaikanal, the 'Princess of Hill Stations' in Tamil Nadu's Palani Hills, is known for its star-shaped lake, pine forests, and cool misty climate year-round.",
    tags: ["Hill Station", "Lake Views"],
    color: "bg-teal-50",
    image: "https://kanyakumaritouristplaces.com/wp-content/uploads/2025/06/Kodaikanal.webp",
  },
  {
    title: "Munnar",
    desc: "Munnar in Kerala's Western Ghats is famous for its rolling tea estates, misty mountains, and the rare Neelakurinji flowers that bloom once every twelve years.",
    tags: ["Tea Estates", "Nature Walks"],
    color: "bg-lime-50",
    image: "https://static.toiimg.com/photo/115812822.cms",
  },
  {
    title: "Gokarna",
    desc: "Gokarna is a laid-back temple town on Karnataka's coast, loved for its pristine beaches like Om Beach and Kudle Beach, and its more relaxed, less crowded vibe than Goa.",
    tags: ["Beach", "Backpacking"],
    color: "bg-sky-50",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iTcYaOgJPnhOo1VN--JGs-dyDV5smSUc66IKyvfMVqdzjPRYn_xz2n8&s=10",
  },
  {
    title: "Goa",
    desc: "Goa is India's beach capital, blending golden sands, Portuguese-era architecture, vibrant nightlife, water sports, and a laid-back coastal culture.",
    tags: ["Beach", "Nightlife"],
    color: "bg-orange-50",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRpZAEylCui2Tkiotuyi8Cl-LaG7Q9zjhxfVwzi1AIbeTGpvbek8TPUfQt&s=10",
  },
  {
    title: "Rajasthan",
    desc: "Rajasthan, the Land of Kings, is famed for its majestic forts and palaces, golden desert dunes of Jaisalmer, and vibrant royal heritage across Jaipur, Udaipur, and Jodhpur.",
    tags: ["Heritage", "Desert Safari"],
    color: "bg-rose-50",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f9/rajasthan.jpg?w=1200&h=700&s=1",
  },
  {
    title: "Pondicherry",
    desc: "Pondicherry charms visitors with its French colonial quarter, seaside promenade, pastel-colored streets, and the tranquil spiritual community of Auroville nearby.",
    tags: ["Coastal", "Heritage"],
    color: "bg-indigo-50",
    image: "https://live.staticflickr.com/1661/24587611109_a8e1b337a2_b.jpg",
  },
  {
    title: "Hampi",
    desc: "Hampi, a UNESCO World Heritage Site in Karnataka, showcases the stunning ruins of the Vijayanagara Empire scattered among giant boulders and banana plantations.",
    tags: ["Heritage", "Backpacking"],
    color: "bg-yellow-50",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD01hxHwFQbbp_rvjlKbxChgKCB8FOaCW2N3nOeHjGcZ55zXfQJ8t-kL8&s=10",
  },
  {
    title: "Alleppey",
    desc: "Alleppey, the 'Venice of the East', is famed for its tranquil backwaters, houseboat cruises through palm-fringed canals, and traditional Kerala village life.",
    tags: ["Backwaters", "Houseboats"],
    color: "bg-cyan-50",
    image: "https://www.alphonsostories.com/AlphonSoStoriesImages/SubServiceImage/Alleppey-Village-Walk02.jpg",
  },
  {
    title: "Kochi",
    desc: "Kochi blends colonial history and coastal charm, from the iconic Chinese fishing nets of Fort Kochi to spice markets, colorful street art, and a thriving arts scene.",
    tags: ["Heritage", "Coastal"],
    color: "bg-fuchsia-50",
    image: "https://ak-d.tripcdn.com/images/0100b12000lqjobo6EF24_C_640_320_R5_Q70.jpg_.webp",
  },
  {
    title: "Ooty",
    desc: "Ooty, the 'Queen of Hill Stations' in the Nilgiris, offers botanical gardens, a scenic toy train, tea gardens, and cool weather amid rolling blue hills.",
    tags: ["Hill Station", "Tea Gardens"],
    color: "bg-violet-50",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/ooty/mmt/destination/m_Ooty_activity_mountains_l_368_613.jpg?im=Resize=(412,412)",
  },
  {
    title: "Coonoor",
    desc: "Coonoor, a quieter neighbor to Ooty in the Nilgiris, is known for its sprawling tea estates, Sim's Park, and scenic viewpoints along the Nilgiri Mountain Railway.",
    tags: ["Tea Estates", "Hill Station"],
    color: "bg-pink-50",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScom8oPli1Ag5Afz-gDHW98kpGMTNTXzOCLGG3EhtURbfEQ3SYmdES44Mj&s=10",
  },
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
