import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { site } from "@/lib/site";
import { Check, PhoneIcon } from "@/components/icons";
import type { Page } from "@/lib/content";

export function ThankYouTemplate({ page }: { page: Page }) {
  return (
    <section className="bg-forest-900 py-24 text-cream sm:py-32">
      <Container size="narrow" className="text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-forest-950">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl">
          {page.h1?.replace(/\s*\|.*/, "") || "Thank You"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/75">
          We&apos;ve received your request. A member of our compassionate admissions team
          will reach out to you shortly. If you&apos;d like to speak with someone right
          away, we&apos;re here for you.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.phone.primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-4 font-semibold text-forest-950 transition-colors hover:bg-gold-400" suppressHydrationWarning
          >
            <PhoneIcon className="h-4 w-4" />
            Call {site.phone.primary}
          </a>
          <Button href="/" variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream hover:text-forest-950">
            Back to Home
          </Button>
        </div>
        <p className="mt-10 text-sm text-cream/50">
          In a crisis? Call or text <Link href="tel:988" className="underline">988</Link> for the
          Suicide &amp; Crisis Lifeline, available 24/7.
        </p>
      </Container>
    </section>
  );
}
