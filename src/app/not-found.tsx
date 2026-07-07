import { Container, Button } from "@/components/ui";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="bg-forest-900 py-24 text-cream sm:py-36">
      <Container size="narrow" className="text-center">
        <p className="font-display text-7xl text-gold-400">404</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">We couldn&apos;t find that page</h1>
        <p className="mx-auto mt-4 max-w-lg text-cream/70">
          The page you&apos;re looking for may have moved. Let&apos;s get you back on track —
          or reach out to our team directly, anytime.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="gold" size="lg">Back to Home</Button>
          <a
            href={site.phone.primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-4 font-semibold text-cream transition-colors hover:bg-cream hover:text-forest-950"
          >
            <PhoneIcon className="h-4 w-4" />
            Call {site.phone.primary}
          </a>
        </div>
      </Container>
    </section>
  );
}
