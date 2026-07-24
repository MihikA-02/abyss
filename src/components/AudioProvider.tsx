import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import bgAudioFile from "@/assets/bgaudio.mp3";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  pauseForReel: () => void;
  resumeFromReel: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // We track the *intended* user state (whether they want it unmuted or muted)
  // Default is playing (unmuted).
  const [isMuted, setIsMuted] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgAudioFile);
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (reelOpen || isMuted) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked by the browser. We don't forcefully set isMuted(true)
        // because we still want the UI to say it's "ON", and then play on first interaction.
        const onInteract = () => {
          if (audioRef.current?.paused && !isMuted && !reelOpen) {
            audioRef.current.play().catch(() => {});
          }
          document.removeEventListener("click", onInteract);
          document.removeEventListener("keydown", onInteract);
        };
        document.addEventListener("click", onInteract);
        document.addEventListener("keydown", onInteract);
      });
    }
  }, [isMuted, reelOpen]);

  // Clean up global audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const pauseForReel = () => setReelOpen(true);
  const resumeFromReel = () => setReelOpen(false);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, pauseForReel, resumeFromReel }}>
      {children}
    </AudioContext.Provider>
  );
}
