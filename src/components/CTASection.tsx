import Link from "next/link";
import { Container } from "./ui";
import { site } from "@/lib/site";
import { PhoneIcon, ShieldIcon } from "./icons";

export function CTASection({
  title = "You don't have to navigate this alone.",
  text = "Reach out today for a free, confidential conversation with our admissions team. We'll help you understand your options and take the next step at your pace.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 px-6 py-12 text-center shadow-card sm:px-12 sm:py-16">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-forest-500/20 blur-3xl" aria-hidden />
          <div className="relative">
            <p className="eyebrow mx-auto text-gold-400">Reconnect, Restore, &amp; Renew</p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl text-cream sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/70">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={site.phone.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-4 font-semibold text-forest-950 transition-colors hover:bg-gold-400"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {site.phone.primary}
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-4 font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950"
              >
                <ShieldIcon className="h-4 w-4" />
                Verify Your Insurance
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
