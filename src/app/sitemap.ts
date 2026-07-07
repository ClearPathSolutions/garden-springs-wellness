import type { MetadataRoute } from "next";
import { getRegistry, REDIRECTED } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const entries = getRegistry()
    // Exclude form-confirmation utility pages and redirected duplicates
    .filter((r) => !r.urlPath.startsWith("/thank-you") && !REDIRECTED.has(r.urlPath))
    .map((r) => ({
      url: base + (r.urlPath === "/" ? "" : r.urlPath),
      changeFrequency: "monthly" as const,
      priority: r.urlPath === "/" ? 1 : 0.7,
    }));
  return entries;
}
