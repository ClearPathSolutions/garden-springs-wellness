"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CloseIcon, ChevronDown } from "./icons";

export type GalleryImage = { src: string; alt: string };

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((i) => (i === null ? null : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, go]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-forest-600"
          >
            <Image
              src={img.src}
              alt={img.alt || "Garden Springs Wellness facility"}
              width={700}
              height={500}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-forest-950/0 transition-colors group-hover:bg-forest-950/15" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-950/92 p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:left-6"
          >
            <ChevronDown className="h-6 w-6 rotate-90" />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active].src}
              alt={images[active].alt || "Garden Springs Wellness facility"}
              width={1400}
              height={1000}
              className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:right-6"
          >
            <ChevronDown className="h-6 w-6 -rotate-90" />
          </button>
        </div>
      )}
    </>
  );
}
