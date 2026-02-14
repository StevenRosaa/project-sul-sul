"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSFX } from "@/utils/audio";

interface IntroScreenProps {
  onIntroComplete: () => void;
}

export default function IntroScreen({ onIntroComplete }: IntroScreenProps) {
  const [isStarted, setIsStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    playSFX("/select.mp3");
    setIsStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            key="button-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-[110]"
          >
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-10 py-5 bg-gradient-to-b from-[#3b7ab5] to-[#143252] border-4 border-[#689dc8] rounded-full shadow-[0_0_30px_rgba(104,157,200,0.6)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
              
              <span className="text-white font-extrabold text-2xl md:text-3xl drop-shadow-lg tracking-wider relative z-10 uppercase">
                Avvia la simulazione
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Intro */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        onEnded={onIntroComplete}
        className={`w-full h-full object-contain transition-opacity duration-1000 ${
          isStarted ? "opacity-100" : "opacity-0"
        }`}
        playsInline
      />
    </div>
  );
}