import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Video, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Video imports
import video1 from './videos/reels/video-1.mp4';
import video2 from './videos/reels/video-2.mp4';
import video3 from './videos/reels/video-3.mp4';
import video4 from './videos/reels/video-4.mp4';
import video5 from './videos/reels/video-5.mp4';
import video6 from './videos/reels/video-6.mp4';
import video7 from './videos/reels/video-7.mp4';

const ReelExperienceSection = () => {
  const videos = [video1, video2, video3, video4, video5, video6, video7];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef([]);

  // Handle Play/Pause
  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      // Pause all others first
      videoRefs.current.forEach((v, i) => { if (v && i !== index) v.pause(); });
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Sync state when swiping
  const handleStep = (newIndex) => {
    if (newIndex >= 0 && newIndex < videos.length) {
      // Pause current before moving
      if (videoRefs.current[activeIdx]) videoRefs.current[activeIdx].pause();
      setActiveIdx(newIndex);
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-12 md:py-24 bg-gray-950 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gray-900 px-4 py-1.5 rounded-full border border-gray-800 mb-4">
            <Video className="w-4 h-4 text-pink-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Live Experience</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2">Adventure Reels</h2>
          <p className="text-gray-500 text-sm">Swipe left or right to explore</p>
        </div>

        {/* Swipe Container */}
        <div className="relative flex items-center justify-center h-[65vh] md:h-[75vh]">
          <div className="relative w-full max-w-[320px] md:max-w-[400px] h-full flex items-center justify-center">
            
            <AnimatePresence initial={false}>
              {videos.map((src, index) => {
                const offset = index - activeIdx;
                const isCenter = index === activeIdx;
                const isVisible = Math.abs(offset) <= 1; // Only render prev, center, and next

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      x: offset * 260, // Distance between cards
                      scale: isCenter ? 1 : 0.85,
                      opacity: isCenter ? 1 : 0.4, // Next/Prev cards are "lightly displayed"
                      zIndex: isCenter ? 50 : 20,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -50) handleStep(activeIdx + 1);
                      if (info.offset.x > 50) handleStep(activeIdx - 1);
                    }}
                    className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <div className={`relative w-full h-full rounded-[2rem] overflow-hidden border-2 transition-colors duration-500 ${isCenter ? 'border-pink-500' : 'border-gray-800'}`}>
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={src}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      
                      {/* Play Overlay - Only for Center Card */}
                      {isCenter && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/10 z-10"
                          onClick={() => togglePlay(index)}
                        >
                          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform hover:scale-110">
                            {isPlaying ? <Pause className="text-white w-10 h-10" /> : <Play className="text-white w-10 h-10 ml-1" />}
                          </div>
                        </div>
                      )}

                      {/* Number Badge */}
                      <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-xl font-bold text-xs ${isCenter ? 'bg-pink-600 text-white' : 'bg-gray-900 text-gray-500'}`}>
                        0{index + 1}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-10 mt-10">
          <button 
            onClick={() => handleStep(activeIdx - 1)}
            disabled={activeIdx === 0}
            className={`p-4 rounded-full border transition-all ${activeIdx === 0 ? 'border-gray-900 text-gray-800' : 'border-gray-700 text-white hover:bg-gray-800'}`}
          >
            <ChevronLeft size={28} />
          </button>
          
          <div className="flex gap-2">
             {videos.map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-8 bg-pink-500' : 'w-2 bg-gray-800'}`} />
             ))}
          </div>

          <button 
            onClick={() => handleStep(activeIdx + 1)}
            disabled={activeIdx === videos.length - 1}
            className={`p-4 rounded-full border transition-all ${activeIdx === videos.length - 1 ? 'border-gray-900 text-gray-800' : 'border-gray-700 text-white hover:bg-gray-800'}`}
          >
            <ChevronRight size={28} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ReelExperienceSection;