import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { Gallery, type GalleryImage } from "@/components/Gallery";
import { CTASection } from "@/components/CTASection";
import { LeafIcon, BrainIcon, HeartIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tour Our Facility | Mental Health Treatment Center in Englewood",
  description:
    "Explore and tour our modern mental health treatment center in Englewood, New Jersey. Designed to promote calm and wellness at every turn.",
  alternates: { canonical: "/tour" },
};

const gallery: GalleryImage[] = [
  { src: "/media/uploads/2026/04/garden-springs-wellness-3-scaled-1.webp", alt: "Interior of the New Jersey mental health clinic" },
  { src: "/media/uploads/2026/04/garden-springs-wellness-16-scaled-1.webp", alt: "Lobby of the treatment center" },
  { src: "/media/uploads/2025/01/Garden-Springs-Wellness-2-scaled.webp", alt: "Group therapy room" },
  { src: "/media/uploads/2026/04/garden-springs-wellness-39.webp", alt: "Comfortable seating area" },
  { src: "/media/uploads/2025/01/Garden-Springs-Wellness-5-scaled.webp", alt: "Inside view of the treatment center" },
  { src: "/media/uploads/2026/04/garden-springs-wellness-43.webp", alt: "Conference room" },
  { src: "/media/uploads/2025/01/Garden-Springs-Wellness-12-scaled.webp", alt: "Therapy suite" },
  { src: "/media/uploads/2026/04/garden-springs-wellness-32-scaled-1.webp", alt: "Waiting area" },
  { src: "/media/uploads/2025/01/Garden-Springs-Wellness-13-scaled.webp", alt: "Calming interior space" },
  { src: "/media/uploads/2026/04/garden-springs-wellness-10-scaled-1.webp", alt: "Interior of Garden Springs Wellness" },
  { src: "/media/uploads/2025/01/Garden-Springs-Wellness-22-scaled.webp", alt: "Client lounge" },
  { src: "/media/uploads/2025/01/Garden-Springs-Wellness-26-scaled.webp", alt: "Patient area of the clinic" },
];

const features = [
  { Icon: LeafIcon, t: "Aromatherapy", d: "Built into our central unit to create a continuously calming, welcoming environment." },
  { Icon: BrainIcon, t: "Mindfulness", d: "Dedicated spaces for meditation, mindfulness practice, and quiet reflection." },
  { Icon: HeartIcon, t: "Sand Therapy", d: "Expressive, sensory therapy that supports emotional processing and grounding." },
  { Icon: LeafIcon, t: "Sound Therapy", d: "Immersive sound experiences designed to soothe the nervous system." },
];

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore Our Facilities"
        title="Tour our Englewood treatment center"
        intro="A nurturing, state-of-the-art environment designed for lasting wellness. We understand the challenges you face — so we built a space where you can focus entirely on healing."
        image="/media/uploads/2026/04/garden-springs-wellness-51-scaled-1.webp"
        breadcrumbs={[{ label: "Tour" }]}
      />

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="A Space Designed for Healing"
            title="Modern comfort meets clinical excellence"
            intro="Our newly-renovated facility combines the latest technology and interior design with warm, restorative touches — from soundproofed therapy suites to calming group rooms."
            align="center"
            className="mb-14"
          />
          <Gallery images={gallery} />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="Wellness-Driven Amenities"
            title="Designed with your lasting wellness in mind"
            align="center"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-forest-900">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection title="Come see it for yourself." text="Schedule a tour or speak with our admissions team to learn more about starting treatment at Garden Springs Wellness." />
    </>
  );
}
