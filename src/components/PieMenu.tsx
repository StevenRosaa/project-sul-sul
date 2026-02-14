"use client";
import { playSFX } from "@/utils/audio";
import { motion } from "framer-motion";
import { PieMenuAction } from "@/types";

interface PieMenuProps {
  position: { x: number; y: number };
  actions: PieMenuAction[];
  onClose: () => void;
}

export default function PieMenu({ position, actions, onClose }: PieMenuProps) {
  // Radius of the circle on which the buttons are positioned
  const MENU_RADIUS = 140;

  const numActions = actions.length;
  const angleStep = 360 / numActions;
  
  // Start from the top (-90 degrees) and offset by half a step to center the first button
  const startAngle = -90 - angleStep / 2;

  return (
    <>
      {/* Invisible backdrop to close the menu when clicking outside */}
      <div className="fixed inset-0 z-50" onClick={onClose} />

      {/* Menu container, centered on the click point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
        // Using width: 0 and height: 0 to create a central anchor point
        className="fixed z-50 pointer-events-none flex items-center justify-center"
        style={{
          top: position.y,
          left: position.x,
          width: 0,
          height: 0,
        }}
      >
        {actions.map((action, i) => {
          // Angle and position calculation for each button
          const angle = startAngle + i * angleStep;
          const angleRad = (angle * Math.PI) / 180;

          // Coordinates for the center of the button+bubble group
          const buttonX = MENU_RADIUS * Math.cos(angleRad);
          const buttonY = MENU_RADIUS * Math.sin(angleRad);

          return (
            <motion.div
              key={i}
              // Position the element and center it on its point
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: buttonX,
                top: buttonY,
                x: "-50%",
                y: "-50%",
              }}
              // Hover and click animations
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                playSFX("/select.mp3");
                action.onClick();
                onClose();
              }}
            >
              {/* Relative container to overlay the bubble and button */}
              <div className="relative flex items-center justify-center">
                
                {/* CONNECTION BUBBLE (smaller, behind, and facing the center) */}
                <div
                  className="absolute w-7 h-7 rounded-full bg-gradient-to-b from-[#689dc8] to-[#3b7ab5] border-2 border-[#a2d4f7] shadow-md -z-10 transition-colors group-hover:from-[#8ec5f0] group-hover:to-[#4a8cc7]"
                  style={{
                    left: "50%",
                    top: "50%",
                    // Move the bubble toward the center of the menu (parent's 0,0 coordinates)
                    x: `${-Math.cos(angleRad) * 60}%`, 
                    y: `${-Math.sin(angleRad) * 60}%`,
                    transform: "translate(-50%, -50%)", // Center it before applying the offset
                  }}
                />

                {/* MAIN BUTTON (blue rounded pill) */}
                <div className="w-44 py-2 px-3 bg-gradient-to-b from-[#3b7ab5] to-[#143252] border-2 border-[#689dc8] rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all group-hover:from-[#4a8cc7] group-hover:to-[#1c3f60] group-hover:border-[#a2d4f7] group-hover:shadow-[0_0_15px_rgba(104,157,200,0.6)]">
                  <p className="text-white font-bold text-sm text-center drop-shadow-sm leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                    {action.label}
                  </p>
                </div>

              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}