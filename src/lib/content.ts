import fs from "node:fs";
import path from "node:path";
import registry from "@/content/registry.json";
import postSlugs from "@/content/posts.json";

export type Run = { t: string; href?: string; ext?: boolean; b?: boolean; i?: boolean };
export type Block = { tag: string; text: string; runs?: Run[] };
export type Img = { src: string; alt: string };

export type Page = {
  urlPath: string;
  slug: string;
  title: string;
  h1: string;
  metaDesc: string;
  heroImage: string | null;
  blocks: Block[];
  images: Img[];
  wordCount: number;
};

export type RegistryEntry = {
  urlPath: string;
  file: string;
  title: string;
  h1: string;
  metaDesc: string;
  words: number;
  heroImage: string | null;
};

export type Category =
  | "treatment"
  | "conditions"
  | "therapy"
  | "who-we-help"
  | "areas-we-serve"
  | "programs"
  | "post"
  | "landing"
  | "thankyou"
  | "core";

const PAGES_DIR = path.join(process.cwd(), "src/content/pages");
const reg = registry as RegistryEntry[];
const posts = new Set(postSlugs as string[]);

const CATEGORY_ROOTS: Category[] = [
  "treatment",
  "conditions",
  "therapy",
  "who-we-help",
  "areas-we-serve",
  "programs",
];

// Pages that get bespoke, hand-built routes (excluded from the catch-all).
export const CUSTOM_ROUTES = new Set<string>([
  "/",
  "/contact-us",
  "/verify-insurance",
  "/tour",
  "/about-us",
  "/blog",
]);

// Legacy paths handled by 301 redirects in next.config.ts — not rendered or listed.
// - /programs was a near-verbatim duplicate of /conditions (folded into /treatment)
// - /thank-you-*-2 were duplicate WordPress form-confirmation pages
export const REDIRECTED = new Set<string>([
  "/programs",
  "/thank-you-callback-2",
  "/thank-you-insurance-2",
]);

export function categoryOf(urlPath: string): Category {
  const clean = urlPath.replace(/^\/|\/$/g, "");
  const seg = clean.split("/");
  if (urlPath === "/") return "core";
  if (clean.startsWith("thank-you")) return "thankyou";
  const root = seg[0] as Category;
  if (CATEGORY_ROOTS.includes(root)) return root;
  if (posts.has(clean)) return "post";
  if (["about-us", "contact-us", "verify-insurance", "tour", "blog", "privacy-policy"].includes(clean))
    return "core";
  return "landing";
}

export function isHub(urlPath: string): boolean {
  const clean = urlPath.replace(/^\/|\/$/g, "");
  return (CATEGORY_ROOTS as string[]).includes(clean);
}

export function getRegistry(): RegistryEntry[] {
  return reg;
}

export function getPageByUrl(urlPath: string): Page | null {
  const entry = reg.find((r) => r.urlPath === urlPath);
  if (!entry) return null;
  return loadPage(entry.file);
}

export function loadPage(file: string): Page | null {
  const fp = path.join(PAGES_DIR, file + ".json");
  if (!fs.existsSync(fp)) return null;
  return JSON.parse(fs.readFileSync(fp, "utf8")) as Page;
}

// Direct children of a category hub (e.g. all /therapy/* detail pages).
export function childrenOf(root: string): RegistryEntry[] {
  const prefix = "/" + root.replace(/^\/|\/$/g, "") + "/";
  return reg
    .filter((r) => r.urlPath.startsWith(prefix) && r.urlPath !== prefix)
    // only the immediate + nested detail pages, not the hub itself
    .sort((a, b) => a.urlPath.localeCompare(b.urlPath));
}

// Only the direct (one level deep) children of a hub, for card grids.
export function immediateChildrenOf(root: string): RegistryEntry[] {
  const base = "/" + root.replace(/^\/|\/$/g, "");
  const depth = base.split("/").length; // e.g. /treatment -> 2
  return childrenOf(root).filter(
    (r) => r.urlPath.replace(/\/$/, "").split("/").length === depth + 1
  );
}

// Sibling pages within the same parent path (for related links).
export function siblingsOf(urlPath: string): RegistryEntry[] {
  const parts = urlPath.replace(/^\/|\/$/g, "").split("/");
  parts.pop();
  const parent = "/" + parts.join("/");
  return childrenOf(parent).filter((r) => r.urlPath !== urlPath);
}

export function allPosts(): RegistryEntry[] {
  return reg
    .filter((r) => posts.has(r.urlPath.replace(/^\/|\/$/g, "")))
    .sort((a, b) => a.title.localeCompare(b.title));
}

// Every path the catch-all route should statically generate
// (everything except the bespoke, hand-built routes).
export function catchAllParams(): { slug: string[] }[] {
  return reg
    .filter((r) => !CUSTOM_ROUTES.has(r.urlPath) && !REDIRECTED.has(r.urlPath))
    .map((r) => ({ slug: r.urlPath.replace(/^\/|\/$/g, "").split("/") }));
}

const CATEGORY_LABELS: Record<string, string> = {
  treatment: "Treatment Programs",
  conditions: "Conditions We Treat",
  therapy: "Therapies & Modalities",
  "who-we-help": "Who We Help",
  "areas-we-serve": "Areas We Serve",
  programs: "Programs",
  post: "From the Blog",
  landing: "Mental Health",
};

export function categoryLabel(cat: Category): string {
  return CATEGORY_LABELS[cat] ?? "Garden Springs Wellness";
}
