import Link from "next/link";
import { site } from "@/lib/site";
import type { Block, Run } from "@/lib/content";

const REAL_EMAIL = site.email;

// Render a block's inline content: plain text, or structured runs with links/bold/italic.
function Inline({ block }: { block: Block }) {
  if (!block.runs) return <>{block.text}</>;
  return (
    <>
      {block.runs.map((r: Run, i: number) => {
        let node: React.ReactNode = r.t;
        if (r.b) node = <strong key="b">{node}</strong>;
        if (r.i) node = <em key="i">{node}</em>;
        if (r.href) {
          const cls = "font-medium text-forest-700 underline decoration-gold-400/50 underline-offset-2 transition-colors hover:text-forest-900 hover:decoration-gold-500";
          if (r.ext || !r.href.startsWith("/")) {
            const isMail = r.href.startsWith("mailto:");
            return (
              <a
                key={i}
                href={r.href}
                {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer nofollow" })}
                className={cls}
              >
                {node}
              </a>
            );
          }
          return (
            <Link key={i} href={r.href} className={cls}>
              {node}
            </Link>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

// Restore the real address from the scraped Cloudflare "[email protected]" placeholder,
// and linkify a run whose whole text is the email.
function cleanRuns(runs: Run[]): Run[] {
  return runs.map((r) => {
    const t = (r.t ?? "").replace(/\[email protected\]/gi, REAL_EMAIL);
    if (!r.href && t.trim() === REAL_EMAIL) {
      return { ...r, t, href: `mailto:${REAL_EMAIL}`, ext: true };
    }
    return { ...r, t };
  });
}

// Scraped WordPress chrome that leaked into article bodies as trailing blocks:
// social-share button stubs and sidebar widget headings. Everything from the
// first such marker to the end of the document is layout, not article content.
const CHROME_HEADING =
  /^(request a callback|recent articles|recent posts|related (articles|posts)|categories|archives|leave a (comment|reply)|search)$/i;
const SOCIAL_STUB = /^(fb|tw|ln|pn|in|pin|share( this)?)$/i;

function isChromeMarker(b: Block): boolean {
  const t = b.text.trim();
  if (/^h[1-4]$/.test(b.tag) && CHROME_HEADING.test(t)) return true;
  if (b.tag === "li" && SOCIAL_STUB.test(t)) return true;
  return false;
}

// Renders extracted content blocks as styled long-form prose.
// - drops leading duplicate <h1> (already shown in the hero)
// - lifts out "Clinically Reviewed By / Reviewed On" meta (from anywhere)
// - restores the obfuscated contact email
// - truncates trailing scraped share/widget chrome
export function extractMeta(blocks: Block[]): {
  reviewedBy?: string;
  reviewedOn?: string;
  body: Block[];
} {
  let reviewedBy: string | undefined;
  let reviewedOn: string | undefined;
  const body: Block[] = [];
  let seenRealContent = false;
  let chrome = false;

  for (const b of blocks) {
    const t = b.text.trim();
    // Review byline can appear anywhere (often below the share chrome) — capture it regardless.
    if (/^clinically review(ed)? by[:\s]/i.test(t)) {
      reviewedBy = t.replace(/^clinically review(ed)? by[:\s]*/i, "");
      continue;
    }
    if (/^reviewed on[:\s]/i.test(t)) {
      reviewedOn = t.replace(/^reviewed on[:\s]*/i, "");
      continue;
    }
    // Once the trailing chrome starts, drop everything after it (but keep scanning for the byline above).
    if (!chrome && seenRealContent && isChromeMarker(b)) chrome = true;
    if (chrome) continue;

    // Drop WordPress/Elementor leftovers and lone obfuscated-email placeholders
    if (/no posts were found/i.test(t)) continue;
    if (/^\[email protected\]$/i.test(t)) continue;
    // Skip the leading duplicate H1(s)
    if (!seenRealContent && b.tag === "h1") continue;
    // Skip ALL breadcrumb/menu list items that appear before the first paragraph
    if (!seenRealContent && b.tag === "li") continue;
    // A leading H2/H3 alone isn't "real content" yet (it's often the page label);
    // only a paragraph or the second heading confirms the body has started.
    if (b.tag === "p") seenRealContent = true;
    body.push({
      tag: b.tag === "h1" ? "h2" : b.tag,
      text: b.text.replace(/\[email protected\]/gi, REAL_EMAIL),
      ...(b.runs ? { runs: cleanRuns(b.runs) } : {}),
    });
  }
  return { reviewedBy, reviewedOn, body };
}

// Deterministic, unique heading anchor ids — used by both the renderer and the
// table of contents so their links always match.
function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "section"
  );
}

export function assignHeadingIds(blocks: Block[]): string[] {
  const seen = new Map<string, number>();
  return blocks.map((b) => {
    if (b.tag !== "h2" && b.tag !== "h3") return "";
    const base = slugify(b.text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  });
}

// "On this page" entries: top-level (h2) sections only.
export function tableOfContents(blocks: Block[]): { id: string; text: string }[] {
  const ids = assignHeadingIds(blocks);
  return blocks
    .map((b, i) => ({ b, id: ids[i] }))
    .filter((x) => x.b.tag === "h2" && !CHROME_HEADING.test(x.b.text.trim()))
    .map((x) => ({ id: x.id, text: x.b.text }));
}

const isRef = (b: Block) => b.tag === "p" && /^\[\d+\]\s/.test(b.text.trim());

export function ContentBlocks({ blocks }: { blocks: Block[] }) {
  const ids = assignHeadingIds(blocks);
  const out: React.ReactNode[] = [];
  let listBuffer: Block[] = [];
  let refBuffer: Block[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length) {
      const items = [...listBuffer];
      out.push(
        <ul key={`ul-${key++}`}>
          {items.map((li, i) => (
            <li key={i}>
              <Inline block={li} />
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushRefs = () => {
    if (refBuffer.length) {
      const items = refBuffer.map((b) => {
        const href = b.runs?.find((r) => r.href)?.href;
        // Drop the leading "[n]" marker and any trailing bare URL; the number
        // comes from the CSS counter and the whole citation links to the source.
        const label = b.text
          .replace(/^\[\d+\]\s*/, "")
          .replace(/\s*https?:\/\/\S+\/?\s*$/i, "")
          .trim();
        return { href, label };
      });
      out.push(
        <ol key={`refs-${key++}`} className="references">
          {items.map((it, i) => (
            <li key={i}>
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-forest-700 underline decoration-gold-400/50 underline-offset-2 hover:text-forest-900"
                >
                  {it.label}
                </a>
              ) : (
                it.label
              )}
            </li>
          ))}
        </ol>
      );
      refBuffer = [];
    }
  };

  const flush = () => {
    flushList();
    flushRefs();
  };

  blocks.forEach((b, idx) => {
    if (b.tag === "li") {
      flushRefs();
      listBuffer.push(b);
      return;
    }
    if (isRef(b)) {
      flushList();
      refBuffer.push(b);
      return;
    }
    flush();
    switch (b.tag) {
      case "h2":
        out.push(<h2 key={key++} id={ids[idx] || undefined}><Inline block={b} /></h2>);
        break;
      case "h3":
        out.push(<h3 key={key++} id={ids[idx] || undefined}><Inline block={b} /></h3>);
        break;
      case "h4":
        out.push(<h4 key={key++}><Inline block={b} /></h4>);
        break;
      case "blockquote":
        out.push(
          <blockquote
            key={key++}
            className="my-6 border-l-2 border-gold-500 bg-forest-50/60 px-6 py-4 font-display text-xl italic text-forest-800"
          >
            <Inline block={b} />
          </blockquote>
        );
        break;
      default:
        out.push(<p key={key++}><Inline block={b} /></p>);
    }
  });
  flush();

  return <div className="prose-gsw">{out}</div>;
}
