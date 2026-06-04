"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/assets";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    // Stay on the last frame — do nothing (no loop, no reset).
    // The video element naturally pauses when playback ends without `loop`.
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      void v.play().catch(() => {
        /* iOS Low Power Mode / autoplay rejection — fallback handles it */
      });
    };
    tryPlay();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) tryPlay();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <video
        ref={videoRef}
        src={withBasePath("/hero.mp4")}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="block h-auto w-full rounded-5xl"
      />

    </div>
  );
}
