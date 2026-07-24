import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

export function AmbientAudio() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Enable ambient soundscape" : "Mute ambient soundscape"}
      className="btn-outline-glow fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
    >
      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
