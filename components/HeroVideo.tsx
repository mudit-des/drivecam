"use client";

import { useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    // Stay on the last frame — do nothing (no loop, no reset).
    // The video element naturally pauses when playback ends without `loop`.
  };

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="block h-auto w-full rounded-5xl"
      />

    </div>
  );
}
