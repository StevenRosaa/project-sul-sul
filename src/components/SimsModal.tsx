"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface ModalContent {
  title: string;
  text: string;
  imageSrc?: string;
}

interface SimsModalProps {
  content: ModalContent;
  onClose: () => void;
}

export default function SimsModal({ content, onClose }: SimsModalProps) {
  return (
    <>
      {/* Dark blurred backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-pointer"
      />

      {/* Modal Container Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm bg-gradient-to-b from-[#1c3f60] to-[#0b1a2c] border-4 border-[#689dc8] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-6 flex flex-col items-center"
      >
        {/* Title */}
        <h2 className="text-[#a2d4f7] font-extrabold text-2xl mb-4 text-center drop-shadow-md tracking-wide">
          {content.title}
        </h2>

        {/* Image (if present) */}
        {content.imageSrc && (
          <div className="w-full h-48 bg-[#112a45] rounded-xl border-2 border-[#689dc8]/50 overflow-hidden mb-4 shadow-inner relative flex items-center justify-center">
            {/* The image will cover the frame. Use object-contain if you prefer not to crop it */}
            <img 
              src={content.imageSrc} 
              alt={content.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Descriptive Text */}
        <p className="text-white text-center font-semibold text-base mb-6 drop-shadow-sm leading-relaxed">
          {content.text}
        </p>

        {/* Sims 3 style "OK" button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-8 py-2 bg-gradient-to-b from-[#4ade80] to-[#22c55e] border-2 border-white/80 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:from-[#22c55e] hover:to-[#16a34a] hover:shadow-[0_0_15px_rgba(74,222,128,0.8)]"
        >
          <Check className="w-6 h-6 text-white drop-shadow-md" strokeWidth={3} />
          <span className="text-white font-extrabold text-lg drop-shadow-md">OK</span>
        </button>
      </motion.div>
    </>
  );
}