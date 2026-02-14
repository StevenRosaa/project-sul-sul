"use client";

interface NeedsBarProps {
  label: string;
  fillPercentage: number;
}

export default function NeedsBar({ label, fillPercentage }: NeedsBarProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {/* Need Label */}
      <span className="text-white text-sm font-bold w-24 text-right drop-shadow-md">
        {label}
      </span>
      
      {/* Bar Container */}
      <div className="flex-1 h-5 bg-black/60 border-2 border-gray-400 rounded-full overflow-hidden relative shadow-inner">
        {/* Green Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] transition-all duration-1000 ease-out"
          style={{ width: `${fillPercentage}%` }}
        />
        {/* Subtle reflection for that "2000s glossy" effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20" />
      </div>
    </div>
  );
}