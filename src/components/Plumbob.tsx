"use client";
import { motion } from "framer-motion";

export default function Plumbob() {
  return (
    <div className="relative z-50 flex flex-col items-center mb-6 cursor-pointer">
      <motion.div
        animate={{
          y: [0, -20, 0], // Floating up and down effect
          rotateY: [0, 360], // Continuous rotation like in-game
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateY: {
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="relative flex flex-col items-center hover:scale-110 transition-transform"
      >
        {/* Top half of the diamond */}
        <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[50px] border-l-transparent border-r-transparent border-b-[#43ea2b]" />
        
        {/* Bottom half of the diamond (slightly darker for a 3D shadow effect) */}
        <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-t-[50px] border-l-transparent border-r-transparent border-t-[#32b81f]" />
        
        {/* Green glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-400 opacity-40 rounded-full blur-2xl -z-10" />
      </motion.div>
    </div>
  );
}