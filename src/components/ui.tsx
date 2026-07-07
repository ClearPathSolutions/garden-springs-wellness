import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 text-gold-500 ${className}`}>
      <span className="h-px w-6 bg-gold-500/60" aria-hidden />
      {children}
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon = false,
}: BtnProps) {
  const sizes =
    size === "lg" ? "px-7 py-4 text-[0.95rem]" : "px-5 py-3 text-sm";
  const variants: Record<string, string> = {
    primary:
      "bg-forest-900 text-cream hover:bg-forest-800 shadow-soft",
    gold: "bg-gold-500 text-forest-950 hover:bg-gold-400 shadow-soft",
    outline:
      "border border-forest-900/25 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-cream",
    ghost: "text-forest-900 hover:text-gold-500",
    light:
      "bg-cream text-forest-900 hover:bg-white shadow-soft",
  };
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ${sizes} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <Eyebrow className={`${align === "center" ? "justify-center" : ""} mb-4`}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] ${light ? "text-cream" : "text-forest-900"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${light ? "text-cream/75" : "text-muted"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "sand" | "cream" | "forest" | "forestGrad";
  id?: string;
}) {
  const tones: Record<string, string> = {
    white: "bg-white",
    sand: "bg-sand",
    cream: "bg-cream",
    forest: "bg-forest-900 text-cream",
    forestGrad:
      "bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-cream",
  };
  return (
    <section id={id} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
