import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPageByUrl,
  catchAllParams,
  categoryOf,
  categoryLabel,
  isHub,
  immediateChildrenOf,
  siblingsOf,
  type Category,
} from "@/lib/content";
import { primaryNav } from "@/lib/site";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { ThankYouTemplate } from "@/components/templates/ThankYouTemplate";
import type { Crumb } from "@/components/PageHero";
import { site } from "@/lib/site";
import type { Page } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return catchAllParams();
}

function urlFromParams(slug: string[]): string {
  return "/" + slug.join("/");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByUrl(urlFromParams(slug));
  if (!page) return {};
  const title = page.title?.replace(/\s*\|\s*Garden Springs.*/i, "").trim();
  return {
    title: title || page.h1,
    description: page.metaDesc,
    alternates: { canonical: page.urlPath },
    openGraph: {
      title: page.title || page.h1,
      description: page.metaDesc,
      url: page.urlPath,
      images: page.heroImage ? [page.heroImage] : undefined,
    },
  };
}

// Human label for a path segment (used in breadcrumbs)
function labelForRoot(cat: Category): string {
  const found = primaryNav.find((n) => n.href === "/" + cat);
  return found?.label ?? cat.replace(/-/g, " ");
}

function buildBreadcrumbs(urlPath: string, cat: Category): Crumb[] {
  const crumbs: Crumb[] = [];
  const parts = urlPath.replace(/^\/|\/$/g, "").split("/");
  if (["treatment", "conditions", "therapy", "who-we-help", "areas-we-serve", "programs"].includes(cat)) {
    crumbs.push({ label: labelForRoot(cat), href: "/" + cat });
    if (parts.length > 2) {
      // nested: link the mid segment to its page
      crumbs.push({ label: pretty(parts[1]), href: "/" + parts.slice(0, 2).join("/") });
    }
  } else if (cat === "post") {
    crumbs.push({ label: "Blog", href: "/blog" });
  }
  return crumbs;
}

function pretty(seg: string): string {
  return seg
    .replace(/-/g, " ")
    .replace(/\bnj\b/gi, "NJ")
    .replace(/\biop\b/gi, "IOP")
    .replace(/\bphp\b/gi, "PHP")
    .replace(/\bocd\b/gi, "OCD")
    .replace(/\bcbt\b/gi, "CBT")
    .replace(/\bdbt\b/gi, "DBT")
    .replace(/\bptsd\b/gi, "PTSD")
    .replace(/\bemdr\b/gi, "EMDR")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildJsonLd(page: Page, cat: Category, crumbs: Crumb[]) {
  const url = site.url + page.urlPath;
  const graph: Record<string, unknown>[] = [];

  const isMedical = ["conditions", "treatment", "therapy", "programs"].includes(cat);
  graph.push({
    "@type": cat === "post" ? "Article" : isMedical ? "MedicalWebPage" : "WebPage",
    "@id": url,
    url,
    name: page.title || page.h1,
    headline: page.h1,
    description: page.metaDesc,
    ...(page.heroImage ? { image: site.url + page.heroImage } : {}),
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    ...(cat === "post"
      ? {
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
        }
      : {}),
  });

  const itemList = [{ name: "Home", url: site.url }, ...crumbs.map((c) => ({
    name: c.label,
    url: c.href ? site.url + c.href : url,
  }))];
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: itemList.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  });

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const urlPath = urlFromParams(slug);
  const page = getPageByUrl(urlPath);
  if (!page) notFound();

  const cat = categoryOf(urlPath);
  const eyebrow = categoryLabel(cat);
  const breadcrumbs = buildBreadcrumbs(urlPath, cat);
  const jsonLd = buildJsonLd(page, cat, breadcrumbs);
  const JsonLd = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );

  // Thank-you confirmation pages
  if (cat === "thankyou") {
    return <ThankYouTemplate page={page} />;
  }

  // Category hub pages (Treatment, Conditions, Therapy, Who We Help, Areas, Programs)
  if (isHub(urlPath)) {
    const root = urlPath.replace(/^\/|\/$/g, "");
    return (
      <>
        {JsonLd}
        <HubTemplate
          page={page}
          eyebrow="Garden Springs Wellness"
          gridTitle={categoryLabel(cat)}
          children={immediateChildrenOf(root)}
          breadcrumbs={breadcrumbs}
        />
      </>
    );
  }

  // Detail / article / blog / landing pages
  const related = siblingsOf(urlPath).slice(0, 6);
  return (
    <>
      {JsonLd}
      <ArticleTemplate
        page={page}
        eyebrow={eyebrow}
        breadcrumbs={breadcrumbs}
        related={related.length ? related : undefined}
      />
    </>
  );
}
