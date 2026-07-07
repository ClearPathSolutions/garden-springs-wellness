"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Recreates the original site's Elementor hero background slideshow:
// facility photos crossfading every 5s with a slow Ken Burns zoom.
const slides = [
  "/media/uploads/2025/01/Garden-Springs-Wellness-50-scaled.webp",
  "/media/uploads/2025/01/Garden-Springs-Wellness-16-scaled.webp",
  "/media/uploads/2024/11/image-1.webp",
  "/media/uploads/2025/01/Garden-Springs-Wellness-5-scaled.webp",
];

const HOLD_MS = 5000; // time each slide is shown (matches the original)

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMotion(false);
      return; // hold on the first frame — no cycling, no zoom
    }
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      HOLD_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            preload={i === 0}
            className={`object-cover transition-transform ease-out duration-[6500ms] ${
              motion && i === active ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      ))}
    </>
  );
}
