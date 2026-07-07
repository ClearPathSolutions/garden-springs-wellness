import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container, Eyebrow, Button, Section, SectionHeading } from "@/components/ui";
import { CTASection } from "@/components/CTASection";
import { BrainIcon, HeartIcon, LeafIcon, Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us | Garden Springs Wellness",
  description:
    "Learn about Garden Springs Wellness — our client-centered philosophy, integrative treatment programs, and the compassionate team behind New Jersey's premier mental health care.",
  alternates: { canonical: "/about-us" },
};

const pillars = [
  { Icon: BrainIcon, t: "Mind", d: "Evidence-based clinical therapies — CBT, DBT, EMDR and more — tailored to each client." },
  { Icon: HeartIcon, t: "Body", d: "Physical wellness through movement, yoga therapy, breathwork, and restorative practices." },
  { Icon: LeafIcon, t: "Spirit", d: "Holistic, integrative healing that nurtures meaning, connection, and renewal." },
];

const values = [
  "Client-centered, customized treatment plans",
  "Multidisciplinary team of industry leaders",
  "Full mind, body & spirit approach",
  "Modern, restorative Englewood facility",
  "Most major PPO & POS insurance accepted",
  "Compassionate, judgment-free care",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Garden Springs"
        title="Where healing meets innovation"
        intro="Garden Springs Wellness is led by a team of innovative, industry leaders on a mission to provide the most effective, personalized care for mental health conditions throughout the TriState area."
        image="/media/uploads/2026/04/garden-springs-wellness-38.webp"
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Mission */}
      <Section tone="white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal">
              <Eyebrow className="mb-4">Our Philosophy</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
                No two humans are alike — and neither is our care.
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                Our programming is rooted in client-centered, customized care built around each
                client&apos;s unique individual needs. Through our industry-leading approach to
                mental health treatment, we promise every client the individualized attention
                you deserve.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                We take a full mind, body, and spirit approach to mental health and wellness —
                combining evidence-based clinical treatment with holistic practices like yoga
                therapy and breathwork to offer both spiritual and physical healing.
              </p>
            </div>
            <div className="relative reveal" data-delay="120">
              <Image
                src="/media/uploads/2026/04/garden-springs-wellness-10-scaled-1.webp"
                alt="Inside of Garden Springs Wellness mental health center"
                width={720}
                height={540}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full rounded-3xl object-cover shadow-card"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Mind Body Spirit pillars */}
      <Section tone="forestGrad">
        <Container>
          <SectionHeading
            eyebrow="Our Integrative Approach"
            title="Healing the whole person"
            intro="True wellness reaches beyond symptoms. Our integrative model cares for every dimension of who you are."
            align="center"
            light
            className="mb-14"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-cream/15 bg-cream/5 p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-forest-950">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl text-cream">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Meet Beth Rivera */}
      <Section tone="cream">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="relative reveal">
              <Image
                src="/media/uploads/2025/11/AdobeStock_236113508.webp"
                alt="Beth Rivera, Clinical Director at Garden Springs Wellness"
                width={600}
                height={760}
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="w-full rounded-2xl object-cover shadow-card"
              />
            </div>
            <div className="reveal" data-delay="100">
              <Eyebrow className="mb-4">Meet Our Clinical Director</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">Beth Rivera, LCADC, CCS</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Bethsaida Rivera is a Licensed Certified Alcohol and Drug Counselor (LCADC) and
                Certified Clinical Supervisor (CCS) with nearly two decades of experience. She
                specializes in trauma recovery, emotional regulation, anxiety and mood disorders,
                and family systems — and is dedicated to shaping the next generation of clinicians.
              </p>
              <div className="mt-6">
                <Button href="/about-us/beth-rivera" variant="primary" icon>
                  Read Beth&apos;s full bio
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why choose us */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="mb-4">Why Garden Springs</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
                A new era of mental health treatment
              </h2>
              <p className="mt-4 text-muted">
                We&apos;ve assembled a team of multidisciplinary professionals to help you live
                your best life. You deserve a future free of trauma, depression, and anxiety —
                let us help you begin your journey today.
              </p>
              <div className="mt-6">
                <Button href="/treatment" variant="outline" icon>Explore our programs</Button>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 rounded-2xl border border-forest-900/10 bg-sand p-5 text-sm text-forest-900/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Facility teaser */}
      <Section tone="sand" className="!pb-24">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-forest-900 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <div>
              <h3 className="font-display text-2xl text-cream sm:text-3xl">See where healing happens</h3>
              <p className="mt-2 text-cream/70">Take a virtual tour of our modern Englewood facility.</p>
            </div>
            <Button href="/tour" variant="gold" size="lg" icon>
              Tour our facility
            </Button>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
