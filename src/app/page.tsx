"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff } from "lucide-react";
import Plumbob from "@/components/Plumbob";
import BottomPanel from "@/components/BottomPanel";
import PieMenu from "@/components/PieMenu";
import SimCharacter from "@/components/SimCharacter"; 
import SimsModal, { ModalContent } from "@/components/SimsModal";
import IntroScreen from "@/components/IntroSceen";
import { PieMenuAction } from "@/types";
import { playSFX } from "@/utils/audio";

export default function Home() {

  const [showIntro, setShowIntro] = useState(true);

  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [showUI, setShowUI] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const playlist = ["/Amazing Facsimile.mp3", "/Fortissimo Personality.mp3", "/Identity Check.mp3", "/Verisimilitude.mp3"];

  // Function for the playlist
  const playNextSong = () => {
    if (typeof window !== "undefined") {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
      const audio = new Audio(playlist[currentSongIndex]);
      audio.volume = 0.2;
      audio.onended = () => {
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
      };
      audio.play().catch(e => console.log("BGM bloccata", e));
      bgmRef.current = audio;
    }
  };

  // Effect for the playlist
  useEffect(() => {

    if (!showIntro) {
      playNextSong();
    }
  }, [currentSongIndex, showIntro]); 

  const handleIntroComplete = () => {
    setShowIntro(false);

  };

  const triggerModal = (content: ModalContent) => {
    playSFX("/notification.mp3"); 
    setActiveModal(content);
  };

  const myActions: PieMenuAction[] = [
    { label: "Romantico...", onClick: () => triggerModal({ title: "Dichiarazione d'Amore", text: "La simulazione lo conferma... Giacomo ha detto di sì!", imageSrc: "/romantico.jpeg" }) },
    { label: "Chiedi di uscire", onClick: () => triggerModal({ title: "Appuntamento Accettato!", text: "Giacomo: Vuoi uscire dall'indiano stasera? Samuel: Si!", imageSrc: "/chiedi-di-uscire.jpeg" }) },
    { label: "Fai una faccia buffa", onClick: () => triggerModal({ title: "Buffonata", text: "Livello di carisma aumentato...", imageSrc: "/fai-una-faccia-buffa.jpeg" }) },
    { label: "Ricorda il primo bacio", onClick: () => triggerModal({ title: "Ricordo Indelebile", text: "I due Sim vivranno una vita felice e contenta!", imageSrc: "/primo-bacio.jpeg" }) },
  ];

  const handleSimClick = (e: React.MouseEvent) => {
    e.stopPropagation();     
    playSFX("/select.mp3");
    if (!menuPosition) {
      setMenuPosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <>
      {/* The components that hovers all*/}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50"
          >
            <IntroScreen onIntroComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 bg-gradient-to-b from-[#87CEEB] to-[#e0f6ff]">
        
        <AnimatePresence>
          {showUI && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 left-6 md:top-10 md:left-10 z-10 pointer-events-none select-none text-left"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg shadow-black tracking-wide">
                Bentornato, Amore.
              </h1>
              <p className="text-white drop-shadow-md mt-2 font-semibold">
                Clicca sul Sim per interagire
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 flex flex-col items-center justify-center mt-8 -translate-y-24">
          <Plumbob />
          <SimCharacter onClick={handleSimClick} />
        </div>

        <AnimatePresence mode="wait">
          {showUI ? (
            <BottomPanel 
              key="bottom-panel" 
              onToggleView={() => {
                playSFX("/select.mp3");
                setShowUI(false);
              }} 
            />
          ) : (
            <motion.button
              key="show-ui-btn"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => {
                e.stopPropagation(); 
                playSFX("/select.mp3");
                setShowUI(true);
              }}
              className="absolute bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg transition-colors cursor-pointer"
            >
              <EyeOff className="w-5 h-5" />
              <span className="font-bold text-sm">Mostra UI</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuPosition && (
            <PieMenu 
              position={menuPosition} 
              actions={myActions} 
              onClose={() => setMenuPosition(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeModal && (
            <SimsModal 
              content={activeModal} 
              onClose={() => {
                playSFX("/select.mp3");
                setActiveModal(null);
              }} 
            />
          )}
        </AnimatePresence>

      </main>
    </>
  );
}