import Link from "next/link";
import Image from "next/image";

// Recreates the "GARDEN SPRINGS / WELLNESS CENTER" lockup with the lotus mark,
// so it stays crisp and recolorable rather than shipping the raster wordmark.
export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const mark = variant === "light" ? "/brand/logo-mark-cream.svg" : "/brand/logo-mark.svg";
  const text = variant === "light" ? "text-cream" : "text-forest-900";
  const rule = variant === "light" ? "bg-gold-300/70" : "bg-gold-500/70";
  return (
    <Link
      href="/"
      aria-label="Garden Springs Wellness — home"
      className={`group flex items-center gap-3 ${className}`}
    >
      <Image
        src={mark}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:scale-105"
        preload
      />
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="font-display text-[1.15rem] font-semibold tracking-[0.14em] sm:text-[1.3rem]">
          GARDEN SPRINGS
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span className={`h-px w-5 ${rule}`} aria-hidden />
          <span className="eyebrow text-[0.55rem] opacity-80">Wellness Center</span>
        </span>
      </span>
    </Link>
  );
}
