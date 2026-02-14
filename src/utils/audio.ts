// src/utils/audio.ts

/**
 * Plays a short sound effect (SFX) from a given path.
 * @param soundPath - The relative path to the audio file in the public folder.
 */
export const playSFX = (soundPath: string) => {
  if (typeof window !== "undefined") {
    // Create a new audio instance for each effect to allow sound overlapping
    const audio = new Audio(soundPath);
    
    // Set sound effects volume to 50%
    audio.volume = 0.5; 
    
    audio.play().catch((error) => {
      console.warn("Audio playback blocked by the browser:", error);
    });
  }
};