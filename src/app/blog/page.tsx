import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { CategoryCard } from "@/components/CategoryCard";
import { CTASection } from "@/components/CTASection";
import { allPosts } from "@/lib/content";
import { cleanTitle } from "@/components/SidebarCTA";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Blog | Mental Health News & Resources",
  description:
    "Insights, guidance, and resources on mental health and wellness from the clinical team at Garden Springs Wellness.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = allPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="News & Resources"
        title="From the Garden Springs blog"
        intro="Insights and guidance from our clinical team to support your mental wellness journey."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <Section tone="white">
        <Container>
          {featured && (
            <Link
              href={featured.urlPath}
              className="group mb-14 grid overflow-hidden rounded-3xl border border-forest-900/10 bg-sand shadow-soft transition-shadow hover:shadow-card lg:grid-cols-2"
            >
              {featured.heroImage && (
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <Image
                    src={featured.heroImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="eyebrow text-gold-500">Featured</span>
                <h2 className="font-display mt-3 text-3xl text-forest-900 sm:text-4xl">
                  {cleanTitle(featured.h1 || featured.title)}
                </h2>
                {featured.metaDesc && (
                  <p className="mt-4 line-clamp-3 text-muted">{featured.metaDesc}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-500">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <CategoryCard key={p.urlPath} entry={p} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
