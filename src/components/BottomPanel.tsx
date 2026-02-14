"use client";
import { playSFX } from "@/utils/audio";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Heart, Eye } from "lucide-react";
import NeedsBar from "./NeedsBar";

interface BottomPanelProps {
  onToggleView?: () => void;
}

export default function BottomPanel({ onToggleView }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<"needs" | "traits">("needs");

  return (

    <motion.div 
      initial={{ y: 150, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      exit={{ y: 150, x: "-50%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}

      className="absolute bottom-6 left-1/2 w-[95%] max-w-3xl bg-gradient-to-b from-[#1c3f60]/95 to-[#0b1a2c]/95 border-4 border-[#689dc8] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.6)] p-5 backdrop-blur-md flex gap-6 z-40"
    >
      
      {/* Left Section: Avatar and info */}
      <div className="w-1/3 flex flex-col items-center justify-center border-r-2 border-[#689dc8]/40 pr-6">
        <div className="w-28 h-28 bg-[#112a45] rounded-full mb-3 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden relative">

          <img src="/avatar.jpeg" alt="Avatar" className="w-full h-full object-cover top-4 relative drop-shadow-md" />
        </div>
        <h2 className="text-white font-extrabold text-xl drop-shadow-lg tracking-wide">
          Amore Mio
        </h2>
        <p className="text-[#4ade80] text-sm font-bold mt-1 drop-shadow-sm">
          Umore: Eccellente
        </p>
      </div>

      {/* Right Section: Tab and contents */}
      <div className="flex-1 flex flex-col">
        
        <div className="flex gap-3 mb-4 border-b-2 border-[#689dc8]/40 pb-3 items-center">
          <button 
            onClick={() => {
                playSFX("/select.mp3");
                setActiveTab('needs');}}
            
            className={`p-2 rounded-xl transition-all ${activeTab === 'needs' ? 'bg-[#689dc8]/50 shadow-inner' : 'hover:bg-white/10'}`}
            title="Bisogni"
          >
            <Heart className="text-white w-6 h-6" />
          </button>
          <button 
            onClick={() => {
                playSFX("/select.mp3");
                setActiveTab('traits');}}
            className={`p-2 rounded-xl transition-all ${activeTab === 'traits' ? 'bg-[#689dc8]/50 shadow-inner' : 'hover:bg-white/10'}`}
            title="Simologia (Tratti)"
          >
            <User className="text-white w-6 h-6" />
          </button>

          <div className="flex-1"></div>

          {onToggleView && (
            <button
              onClick={onToggleView}
              className="flex items-center gap-2 p-2 px-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/10 transition-all text-white/80 hover:text-white"
              title="Nascondi Interfaccia (Sim View)"
            >
              <Eye className="w-5 h-5" />
              <span className="text-sm font-bold hidden sm:inline">Vista Sim</span>
            </button>
          )}
        </div>

        {/* Dynamic Content */}
        <div className="flex-1">
          {activeTab === 'needs' && (
            <div className="flex flex-col justify-center h-full">
              <NeedsBar label="Fame" fillPercentage={75} />
              <NeedsBar label="Energia" fillPercentage={60} />
              <NeedsBar label="Divertimento" fillPercentage={85} />
              <NeedsBar label="Amore" fillPercentage={100} /> 
            </div>
          )}

          {activeTab === 'traits' && (
            <div className="flex flex-col">
              <h3 className="text-[#689dc8] font-bold mb-3 text-sm uppercase tracking-wider">Tratti del Sim</h3>
              <div className="grid grid-cols-2 gap-3 text-white text-sm font-semibold">
                <div className="bg-black/40 p-3 rounded-lg border border-white/20 shadow-md">❤️ Inguaribile Romantico</div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/20 shadow-md">🍕 Buona Forchetta</div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/20 shadow-md">😴 Dormiglione</div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/20 shadow-md">🔥 Abile a baciare</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}