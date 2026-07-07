import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import {
  PhoneIcon,
  MailIcon,
  MapPin,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./icons";

const columns = [
  {
    title: "Treatment",
    links: [
      { label: "Partial Hospitalization (PHP)", href: "/treatment/partial-hospitalization" },
      { label: "Intensive Outpatient (IOP)", href: "/treatment/intensive-outpatient-iop" },
      { label: "Outpatient Program", href: "/treatment/outpatient-program" },
      { label: "Psychiatry Services", href: "/treatment/psychiatry-services" },
      { label: "Aftercare Coordination", href: "/treatment/aftercare-coordination" },
    ],
  },
  {
    title: "Conditions",
    links: [
      { label: "Depression", href: "/conditions/depression" },
      { label: "Anxiety", href: "/conditions/anxiety-treatment" },
      { label: "Bipolar Disorder", href: "/conditions/bipolar-disorder" },
      { label: "PTSD & Trauma", href: "/conditions/ptsd-trauma" },
      { label: "All Conditions", href: "/conditions" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Therapies", href: "/therapy" },
      { label: "Who We Help", href: "/who-we-help" },
      { label: "Tour Our Facility", href: "/tour" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="bg-forest-950 text-cream/75">
      {/* CTA band */}
      <div className="border-b border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-8">
          <p className="eyebrow text-gold-400">Reconnect, Restore, &amp; Renew</p>
          <h2 className="font-display max-w-2xl text-3xl text-cream sm:text-4xl">
            Take the first step toward lasting mental wellness.
          </h2>
          <p className="max-w-xl text-cream/70">
            Our admissions team is here to answer your questions with compassion and
            complete confidentiality — no pressure, no judgment.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phone.primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-4 font-semibold text-forest-950 transition-colors hover:bg-gold-400"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {site.phone.primary}
            </a>
            <Link
              href="/verify-insurance"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-4 font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950"
            >
              Verify Your Insurance
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              Premier, whole-person mental health treatment in Englewood, New Jersey —
              blending evidence-based clinical care with a calm, restorative environment.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4 text-gold-400">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-cream/70 transition-colors hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-4 border-t border-cream/10 pt-8 text-sm sm:grid-cols-3">
          <a href={site.phone.primaryHref} className="flex items-center gap-3 hover:text-cream">
            <PhoneIcon className="h-4 w-4 text-gold-400" />
            {site.phone.primary}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-cream">
            <MailIcon className="h-4 w-4 text-gold-400" />
            {site.email}
          </a>
          <a href={site.address.mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cream">
            <MapPin className="h-4 w-4 text-gold-400" />
            {site.address.full}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-cream/80">Privacy Policy</Link>
            <Link href="/contact-us" className="hover:text-cream/80">Contact</Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
          <p className="text-[0.7rem] leading-relaxed text-cream/40">
            If you or someone you know is experiencing a mental health emergency, call 988
            (Suicide &amp; Crisis Lifeline) or 911 immediately. Garden Springs Wellness provides
            outpatient levels of care and does not offer 24-hour emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}
