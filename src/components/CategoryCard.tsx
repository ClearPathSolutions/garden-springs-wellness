import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "./icons";
import { cleanTitle } from "./SidebarCTA";
import type { RegistryEntry } from "@/lib/content";

export function CategoryCard({ entry }: { entry: RegistryEntry }) {
  const title = cleanTitle(entry.h1 || entry.title);
  const desc = entry.metaDesc?.slice(0, 130);
  return (
    <Link
      href={entry.urlPath}
      className="group reveal flex w-full flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      {entry.heroImage && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={entry.heroImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-forest-900 group-hover:text-forest-700">
          {title}
        </h3>
        {desc && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{desc}…</p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-500">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
