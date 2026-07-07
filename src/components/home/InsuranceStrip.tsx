import Image from "next/image";

// Curated set of the strongest insurance logos (deduped from the WordPress carousel).
const logos = [
  { src: "/media/uploads/2024/11/insurance-copy.webp", alt: "Aetna" },
  { src: "/media/uploads/2024/11/insurance-7.webp", alt: "Horizon" },
  { src: "/media/uploads/2024/11/insurance-2-copy.webp", alt: "Cigna" },
  { src: "/media/uploads/2024/11/insurance-2.webp", alt: "BlueCross BlueShield" },
  { src: "/media/uploads/2024/11/insurance-6.webp", alt: "Anthem" },
  { src: "/media/uploads/2024/11/insurance-1-copy.webp", alt: "UnitedHealthcare" },
  { src: "/media/uploads/2024/11/insurance-4.webp", alt: "Magellan Health" },
  { src: "/media/uploads/2024/11/insurance-5.webp", alt: "Multiplan" },
  { src: "/media/uploads/2024/11/insurance-13.webp", alt: "Highmark" },
  { src: "/media/uploads/2024/11/insurance-11.webp", alt: "GEHA" },
];

export function InsuranceStrip() {
  return (
    <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
      {logos.map((l) => (
        <div key={l.alt} className="flex items-center justify-center">
          <Image
            src={l.src}
            alt={`${l.alt} insurance accepted`}
            width={150}
            height={60}
            className="h-9 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
}
