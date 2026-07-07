import { PageHero, type Crumb } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { ContentBlocks, extractMeta, tableOfContents } from "@/components/ContentBlocks";
import { SidebarCTA } from "@/components/SidebarCTA";
import { CTASection } from "@/components/CTASection";
import { UsersIcon, ClockIcon, ArrowRight } from "@/components/icons";
import type { Page, RegistryEntry } from "@/lib/content";

export function ArticleTemplate({
  page,
  eyebrow,
  breadcrumbs,
  related,
}: {
  page: Page;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  related?: RegistryEntry[];
}) {
  const { reviewedBy, reviewedOn, body } = extractMeta(page.blocks);
  const intro = page.metaDesc || undefined;
  const toc = tableOfContents(body);
  const showToc = toc.length >= 4;

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={cleanH1(page.h1)}
        intro={intro}
        image={page.heroImage}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white py-14 sm:py-20">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <article>
              {(reviewedBy || reviewedOn) && (
                <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-forest-900/10 pb-6 text-sm text-muted">
                  {reviewedBy && (
                    <span className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-forest-500" />
                      Clinically reviewed by <strong className="font-semibold text-forest-800">{reviewedBy}</strong>
                    </span>
                  )}
                  {reviewedOn && (
                    <span className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-forest-500" />
                      Updated {reviewedOn}
                    </span>
                  )}
                </div>
              )}
              {showToc && (
                <nav
                  aria-label="On this page"
                  className="mb-10 rounded-2xl border border-forest-900/10 bg-sand p-6 sm:p-7"
                >
                  <p className="eyebrow mb-4 text-gold-500">On this page</p>
                  <ol className="grid gap-2 sm:grid-cols-2">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="group flex items-start gap-2 text-sm leading-snug text-forest-900/80 transition-colors hover:text-forest-900"
                        >
                          <ArrowRight className="mt-1 h-3 w-3 shrink-0 text-gold-500 transition-transform group-hover:translate-x-0.5" />
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <ContentBlocks blocks={body} />
            </article>

            <SidebarCTA related={related} />
          </div>
        </Container>
      </div>

      <CTASection />
    </>
  );
}

function cleanH1(h1: string): string {
  return h1.replace(/\s*\|\s*Garden Springs.*/i, "").trim();
}
