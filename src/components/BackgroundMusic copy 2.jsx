import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = (useRef < HTMLAudioElement) | (null > null);
  const [isMuted, setIsMuted] = useState(false);

  console.log("audioRef.current", audioRef.current);

  useEffect(() => {
    const audio = new Audio("/audio/jazz-background-music.mp3");
    audio.loop = true;
    audio.volume = 0.1; // Set initial volume

    if (audioRef.current) {
      audioRef.current = audio;
    }
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            console.log("Music started");
          })
          .catch((err) => {
            console.warn("Playback failed", err);
          });
      }
      document.removeEventListener("click", playAudio);
    };

    document.addEventListener("click", playAudio);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", playAudio);
    };
  });

  const toggleMute = () => {
    console.log("hit");
    if (audioRef.current) {
      console.log("yes");
      const newMuteStatus = !isMuted;
      audioRef.current.muted = newMuteStatus;
      setIsMuted(newMuteStatus);
    }
  };

  return (
    <button
      onClick={toggleMute}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.6)",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1.2rem",
      }}
    >
      {isMuted ? "🔇 Unmute" : "🔊 Mute"}
    </button>
  );
}
