import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon, ShieldIcon, Check } from "./icons";
import type { RegistryEntry } from "@/lib/content";

export function SidebarCTA({ related }: { related?: RegistryEntry[] }) {
  return (
    <aside className="lg:sticky lg:top-28 space-y-5">
      {/* Contact card */}
      <div className="overflow-hidden rounded-2xl bg-forest-900 p-6 text-cream shadow-card">
        <p className="eyebrow text-gold-400">Confidential Help</p>
        <h3 className="font-display mt-2 text-2xl">Speak with our team today</h3>
        <p className="mt-2 text-sm text-cream/70">
          Free, confidential assessment. Compassionate guidance — no pressure.
        </p>
        <a
          href={site.phone.primaryHref}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3.5 font-semibold text-forest-950 transition-colors hover:bg-gold-400" suppressHydrationWarning
        >
          <PhoneIcon className="h-4 w-4" />
          {site.phone.primary}
        </a>
        <Link
          href="/verify-insurance"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950"
        >
          <ShieldIcon className="h-4 w-4" />
          Verify Your Insurance
        </Link>
      </div>

      {/* Trust points */}
      <div className="rounded-2xl border border-forest-900/10 bg-sand p-6">
        <ul className="space-y-3 text-sm text-forest-900/85">
          {[
            "In-network with most major PPO & POS plans",
            "PHP, IOP & Outpatient levels of care",
            "Individualized, evidence-based treatment",
            "Calm, restorative Englewood setting",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {related && related.length > 0 && (
        <div className="rounded-2xl border border-forest-900/10 bg-white p-6">
          <p className="eyebrow mb-3 text-gold-500">Explore More</p>
          <ul className="space-y-1">
            {related.slice(0, 6).map((r) => (
              <li key={r.urlPath}>
                <Link
                  href={r.urlPath}
                  className="block rounded-lg px-2 py-2 text-sm text-forest-900/80 transition-colors hover:bg-forest-50 hover:text-forest-900"
                >
                  {cleanTitle(r.h1 || r.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export function cleanTitle(t: string): string {
  return t
    .replace(/\s*[|–-]\s*Garden Springs.*$/i, "")
    .replace(/\s*[|–-]\s*(New Jersey|NJ).*$/i, "")
    .trim();
}
