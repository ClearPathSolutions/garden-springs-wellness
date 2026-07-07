"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { primaryNav, site } from "@/lib/site";
import {
  PhoneIcon,
  ChevronDown,
  MenuIcon,
  CloseIcon,
  ShieldIcon,
  MapPin,
} from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change + lock body scroll while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-forest-950 text-cream/85 lg:block">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-8 py-2 text-xs">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold-400" />
            {site.address.full}
          </span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <ShieldIcon className="h-3.5 w-3.5 text-gold-400" />
              Most major PPO &amp; POS insurance accepted
            </span>
            <a href={site.phone.primaryHref} className="flex items-center gap-2 font-semibold hover:text-gold-300">
              <PhoneIcon className="h-3.5 w-3.5 text-gold-400" />
              {site.phone.primary}
            </a>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-forest-900/10 bg-white/95 shadow-soft backdrop-blur"
            : "border-transparent bg-white/80 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-2 px-5 py-3 sm:px-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-0.5 whitespace-nowrap rounded-full px-2 py-2 text-[0.9rem] font-medium text-forest-900/85 transition-colors hover:text-gold-500"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3 w-3 opacity-60" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full min-w-[16rem] translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white p-2 shadow-card">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-sm text-forest-900/80 transition-colors hover:bg-forest-50 hover:text-forest-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Link
              href="/verify-insurance"
              className="whitespace-nowrap rounded-full border border-forest-900/20 px-3.5 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:border-forest-900 hover:bg-forest-900 hover:text-cream"
            >
              Verify Insurance
            </Link>
            <a
              href={site.phone.primaryHref}
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gold-500 px-4 py-2.5 text-sm font-semibold text-forest-950 shadow-soft transition-colors hover:bg-gold-400"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {site.phone.primary}
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={site.phone.primaryHref}
              aria-label={`Call ${site.phone.primary}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-forest-950 shadow-soft"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/15 text-forest-900"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-forest-950/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-forest-900/10 px-5 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/15 text-forest-900"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
            {primaryNav.map((item) => (
              <div key={item.href} className="border-b border-forest-900/8">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((e) => (e === item.href ? null : item.href))
                      }
                      className="flex w-full items-center justify-between py-3.5 text-left text-base font-semibold text-forest-900"
                      aria-expanded={expanded === item.href}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expanded === item.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        expanded === item.href
                          ? "grid-rows-[1fr] pb-3"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2.5 text-[0.95rem] text-forest-800/85 hover:bg-forest-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3.5 text-base font-semibold text-forest-900"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="space-y-3 border-t border-forest-900/10 bg-white/60 px-5 py-5">
            <a
              href={site.phone.primaryHref}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 px-5 py-3.5 font-semibold text-cream"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {site.phone.primary}
            </a>
            <Link
              href="/verify-insurance"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3.5 font-semibold text-forest-950"
            >
              <ShieldIcon className="h-4 w-4" />
              Verify Your Insurance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
