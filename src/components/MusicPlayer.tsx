import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import bellaCiao from "@/assets/bella_ciao.mp3";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error("Audio playback failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 md:bottom-10 left-6 md:left-10 z-[100]">
      <audio ref={audioRef} src={bellaCiao} loop preload="auto" />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="flex items-center justify-center w-12 h-12 rounded-full border border-heist-red bg-background/80 backdrop-blur-md text-heist-red hover:bg-heist-red hover:text-primary-foreground transition glow-red group"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
