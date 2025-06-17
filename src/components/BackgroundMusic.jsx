import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Create and store the audio instance
    const audio = new Audio("/audio/jazz-background-music.mp3");
    audio.loop = true;
    audio.volume = 0.1;

    // Store the reference
    if (audioRef.current) {
      audioRef.current = audio;
    }

    // Play after user interaction
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
        })
        .catch((e) => {
          console.warn("Autoplay failed:", e);
        });

      // Only set this listener once
      document.removeEventListener("click", tryPlay);
    };

    // Listen for user interaction to allow autoplay
    document.addEventListener("click", tryPlay);

    return () => {
      // Cleanup
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line
  }, []);

  return null;
}
