import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui";
import { ChevronDown } from "./icons";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-cream/60">
        <li>
          <Link href="/" className="hover:text-cream">Home</Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronDown className="h-3 w-3 -rotate-90 opacity-50" />
            {c.href ? (
              <Link href={c.href} className="hover:text-cream">{c.label}</Link>
            ) : (
              <span className="text-cream/90">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string | null;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-cream">
      {/* Decorative background */}
      <div className="absolute inset-0" aria-hidden>
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/92 via-forest-900/75 to-forest-900/35" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800" />
        )}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && <p className="eyebrow mb-4 text-gold-400">{eyebrow}</p>}
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
              {intro}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
