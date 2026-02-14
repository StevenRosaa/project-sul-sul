"use client";

interface SimCharacterProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SimCharacter({ onClick }: SimCharacterProps) {
  return (
    <div
      onClick={onClick}
      className="relative z-30 cursor-pointer group"
      title="Click to interact"
    >
      <div className="relative flex items-end justify-center">
        
        {/* Height uses "vh" to ensure the Sim fits the screen size */}
        <img 
          src="/Samu.png" 
          alt="My boyfriend Sim version" 
          className="w-auto h-[45vh] md:h-[60vh] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(104,157,200,0.8)] transition-all duration-300" 
        />
        
        {/* Ground shadow for 3D depth */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/40 blur-xl rounded-[100%] -z-10"></div>
        
      </div>
    </div>
  );
}