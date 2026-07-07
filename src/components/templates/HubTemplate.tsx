import { PageHero, type Crumb } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { ContentBlocks, extractMeta } from "@/components/ContentBlocks";
import { CategoryCard } from "@/components/CategoryCard";
import { CTASection } from "@/components/CTASection";
import type { Page, RegistryEntry } from "@/lib/content";

export function HubTemplate({
  page,
  eyebrow,
  children,
  gridTitle,
  breadcrumbs,
}: {
  page: Page;
  eyebrow?: string;
  children: RegistryEntry[];
  gridTitle?: string;
  breadcrumbs?: Crumb[];
}) {
  const { body } = extractMeta(page.blocks);
  // Keep hub intro concise — first ~4 substantive blocks
  const intro = body.filter((b) => b.tag === "p").slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={page.h1.replace(/\s*\|\s*Garden Springs.*/i, "")}
        intro={page.metaDesc || undefined}
        image={page.heroImage}
        breadcrumbs={breadcrumbs}
      />

      {intro.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <Container size="narrow">
            <ContentBlocks blocks={intro} />
          </Container>
        </section>
      )}

      <section className="bg-sand py-16 sm:py-20">
        <Container>
          {gridTitle && (
            <h2 className="font-display mb-10 text-center text-3xl text-forest-900 sm:text-4xl">
              {gridTitle}
            </h2>
          )}
          {/* Centered flex-wrap keeps the final row balanced (no orphaned card
              stranded hard-left) regardless of how many children a hub has. */}
          <div className="flex flex-wrap justify-center gap-6">
            {children.map((c) => (
              <div
                key={c.urlPath}
                className="flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <CategoryCard entry={c} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
