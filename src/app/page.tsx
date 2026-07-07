import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, Eyebrow, SectionHeading, Section } from "@/components/ui";
import { CTASection } from "@/components/CTASection";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { InsuranceStrip } from "@/components/home/InsuranceStrip";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { CategoryCard } from "@/components/CategoryCard";
import { site } from "@/lib/site";
import { allPosts } from "@/lib/content";
import {
  PhoneIcon,
  ShieldIcon,
  ArrowRight,
  Check,
  BrainIcon,
  HeartIcon,
  LeafIcon,
  UsersIcon,
  MapPin,
  ClockIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "New Jersey Mental Health Treatment | Garden Springs Wellness",
  description: site.description,
  alternates: { canonical: "/" },
};

const programs = [
  {
    name: "Partial Care Program",
    tag: "PHP",
    href: "/treatment/partial-hospitalization",
    img: "/media/uploads/2024/11/AdobeStock_469905414-scaled.webp",
    desc: "Our most structured outpatient level of care — full days of intensive, supportive therapy while you return home each evening.",
  },
  {
    name: "Intensive Outpatient",
    tag: "IOP",
    href: "/treatment/intensive-outpatient-iop",
    img: "/media/uploads/2024/11/AdobeStock_459642217-scaled.webp",
    desc: "A flexible step-down that balances meaningful clinical support with the demands of work, school, and family life.",
  },
  {
    name: "Outpatient Program",
    tag: "OP",
    href: "/treatment/outpatient-program",
    img: "/media/uploads/2026/04/adobestock_512935761.webp",
    desc: "Ongoing individual and group therapy designed to sustain your progress and protect your long-term wellness.",
  },
];

const conditions = [
  { label: "Depression", href: "/conditions/depression", Icon: LeafIcon },
  { label: "Anxiety", href: "/conditions/anxiety-treatment", Icon: HeartIcon },
  { label: "Bipolar Disorder", href: "/conditions/bipolar-disorder", Icon: BrainIcon },
  { label: "PTSD & Trauma", href: "/conditions/ptsd-trauma", Icon: ShieldIcon },
  { label: "OCD", href: "/conditions/ocd", Icon: BrainIcon },
  { label: "Panic Disorder", href: "/conditions/panic-disorder", Icon: HeartIcon },
  { label: "Grief & Loss", href: "/conditions/grief-and-loss", Icon: LeafIcon },
  { label: "Stress Management", href: "/conditions/stress-management", Icon: LeafIcon },
];

const amenities = [
  "Newly-renovated, calming group rooms",
  "Soundproofed private therapy suites",
  "Yoga, meditation & mindfulness programming",
  "Sound therapy & wellness-driven activities",
  "Built-in aromatherapy throughout the facility",
  "Easy access from major North Jersey highways",
];

const specialized = [
  { name: "Women's Program", desc: "Dedicated mental health programming for women in North Jersey.", href: "/womens-mental-health" },
  { name: "For Professionals", desc: "Flexible, discreet care built around demanding careers.", href: "/who-we-help/executives" },
  { name: "Veterans", desc: "Trauma-informed support honoring those who served.", href: "/who-we-help/veterans" },
  { name: "First Responders", desc: "Confidential care for those who answer the call.", href: "/who-we-help/first-responders" },
];

const faqs = [
  {
    q: "Do you offer a higher level of care, like residential inpatient?",
    a: "For those in need of a higher level of care, such as residential inpatient, we can help. We work with a number of vetted and trusted partners in the TriState area to provide you with personalized solutions that meet your individual needs.",
  },
  {
    q: "Will my insurance cover treatment?",
    a: "Yes — in most cases your health insurance can help cover up to 100% of the costs associated with treatment at Garden Springs Wellness Center. To find out your personalized options, start with our free verification of benefits and let us help you determine what treatment options are best for you.",
  },
  {
    q: "Is treatment confidential?",
    a: "No one will know you are in treatment unless you give explicit, written permission. Your employer, loved ones, school, and others will not be notified without your consent.",
  },
  {
    q: "Is housing available during treatment?",
    a: "In some instances, supportive housing is available for clients participating in our partial hospitalization program. Contact our admissions team to learn more.",
  },
];

export default function Home() {
  const posts = allPosts().slice(0, 3);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-forest-900 text-cream">
        <div className="absolute inset-0" aria-hidden>
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/92 via-forest-900/72 to-forest-900/40" />
          <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        </div>

        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5 text-gold-400">{site.tagline}</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.03] sm:text-6xl lg:text-7xl">
              Premier Mental Health Treatment in New Jersey
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">
              Where bespoke treatment meets integrative care. Compassionate, evidence-based
              mental health programs designed for lasting wellness — in the heart of
              Englewood, New Jersey.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phone.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-base font-semibold text-forest-950 shadow-soft transition-colors hover:bg-gold-400"
              >
                <PhoneIcon className="h-5 w-5" />
                Call {site.phone.primary}
              </a>
              <Button href="/verify-insurance" variant="light" size="lg" icon>
                Verify Your Insurance
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/70">
              {["PHP · IOP · Outpatient", "Most major PPO & POS insurance", "Englewood, NJ"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold-400" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- WELCOME ---------- */}
      <Section tone="white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal">
              <Eyebrow className="mb-4">Welcome to Garden Springs</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl lg:text-[2.75rem]">
                Where bespoke treatment meets integrative care.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Through evidence-based approaches and compassionate, client-centered
                philosophies, Garden Springs Wellness Center offers New Jersey residents
                access to high-quality, personalized mental health treatment at our Englewood
                facilities.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Our program was hand-crafted by top mental health professionals in the TriState
                area, combining traditional treatment with cutting-edge therapies to deliver an
                in-depth, transformative experience in mental healthcare.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about-us" variant="primary" icon>About Our Center</Button>
                <Button href="/treatment" variant="outline">Explore Programs</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal" data-delay="120">
              {[
                { Icon: BrainIcon, t: "Evidence-Based", d: "CBT, DBT, EMDR & more, tailored to you." },
                { Icon: HeartIcon, t: "Whole-Person", d: "Care for the mind, body, and spirit." },
                { Icon: UsersIcon, t: "Expert Team", d: "Doctors, clinicians & specialists." },
                { Icon: LeafIcon, t: "Restorative Setting", d: "A calm, modern healing environment." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="rounded-2xl border border-forest-900/10 bg-sand p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forest-900 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg text-forest-900">{t}</h3>
                  <p className="mt-1 text-sm text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- PROGRAMS ---------- */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="Levels of Care"
            title="Treatment built around your life"
            intro="From our most structured Partial Care program to flexible outpatient support, we meet you exactly where you are — and walk with you every step forward."
            align="center"
            className="mb-14"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((p, i) => (
              <Link
                key={p.name}
                href={p.href}
                className="group reveal flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                data-delay={i * 100}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold tracking-wider text-forest-900">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-forest-900">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-500">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- CONDITIONS ---------- */}
      <Section tone="white">
        <Container>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Conditions We Treat"
              title="Specialized, compassionate care"
              intro="We treat the full spectrum of mental health conditions with individualized, integrative treatment plans."
            />
            <Button href="/conditions" variant="outline">View all conditions</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {conditions.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-4 rounded-2xl border border-forest-900/10 bg-sand p-5 transition-all hover:border-forest-900/20 hover:bg-forest-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-forest-700 shadow-soft transition-colors group-hover:bg-forest-900 group-hover:text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-forest-900">{label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- APPROACH (dark) ---------- */}
      <Section tone="forestGrad">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal">
              <Eyebrow className="mb-4 text-gold-400">Advanced Therapeutic Solutions</Eyebrow>
              <h2 className="font-display text-3xl text-cream sm:text-4xl lg:text-[2.75rem]">
                Innovating, customized behavioral healthcare
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/75">
                Our interventional approach combines traditional treatments with cutting-edge
                therapies to provide the most effective mental health care available in the
                TriState area — delivered by an expert team of doctors, clinicians, and mental
                health professionals dedicated to your journey.
              </p>
              <div className="mt-8">
                <Button href="/therapy" variant="gold" icon>Explore our therapies</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 reveal" data-delay="120">
              {[
                { t: "CBT", d: "Cognitive Behavioral Therapy", href: "/therapy/cbt" },
                { t: "DBT", d: "Dialectical Behavior Therapy", href: "/therapy/dbt" },
                { t: "EMDR", d: "Trauma reprocessing therapy", href: "/therapy/emdr-therapy" },
                { t: "Holistic", d: "Yoga, mindfulness & more", href: "/therapy/holistic-therapy" },
              ].map((x) => (
                <Link
                  key={x.t}
                  href={x.href}
                  className="group rounded-2xl border border-cream/15 bg-cream/5 p-6 transition-colors hover:border-gold-400/50 hover:bg-cream/10"
                >
                  <p className="font-display text-2xl text-gold-300">{x.t}</p>
                  <p className="mt-1 text-sm text-cream/70">{x.d}</p>
                  <ArrowRight className="mt-4 h-4 w-4 text-cream/50 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- FACILITY ---------- */}
      <Section tone="cream">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 reveal">
              <div className="space-y-4">
                <Image src="/media/uploads/2026/04/garden-springs-wellness-3-scaled-1.webp" alt="Inside a New Jersey mental health clinic" width={600} height={800} sizes="(max-width: 1024px) 45vw, 22vw" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-card" />
                <Image src="/media/uploads/2026/04/garden-springs-wellness-39.webp" alt="Garden Springs Wellness seating area" width={600} height={450} sizes="(max-width: 1024px) 45vw, 22vw" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
              </div>
              <div className="space-y-4 pt-8">
                <Image src="/media/uploads/2026/04/garden-springs-wellness-16-scaled-1.webp" alt="Lobby of the treatment center" width={600} height={450} sizes="(max-width: 1024px) 45vw, 22vw" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
                <Image src="/media/uploads/2026/04/thais-varela-zykqvkdkjgm-unsplash-scaled-1.webp" alt="Woman practicing yoga during mental health treatment" width={600} height={800} sizes="(max-width: 1024px) 45vw, 22vw" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-card" />
              </div>
            </div>
            <div className="reveal" data-delay="120">
              <Eyebrow className="mb-4">Our Facility</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
                A modern, restorative space to heal
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Our newly-renovated Englewood facility was designed from the ground up to promote
                calm and wellness at every turn — a place where you can focus fully on healing.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {amenities.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-forest-900/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/tour" variant="primary" icon>Take a tour</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- SPECIALIZED PROGRAMS ---------- */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Unique, Specialized Programs"
            title="Care designed around who you are"
            intro="Tailored programming that recognizes every person's story, background, and path to wellness is different."
            align="center"
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialized.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="group flex flex-col rounded-2xl border border-forest-900/10 bg-sand p-6 transition-all hover:-translate-y-1 hover:border-forest-900/20 hover:shadow-soft"
              >
                <h3 className="font-display text-xl text-forest-900">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.desc}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- INSURANCE ---------- */}
      <Section tone="sand">
        <Container>
          <div className="rounded-3xl border border-forest-900/10 bg-white p-8 shadow-soft sm:p-12">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <Eyebrow className="mb-4 justify-center">In-Network Coverage</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
                We work with most major insurance
              </h2>
              <p className="mt-4 text-muted">
                We accept most commercial PPO &amp; POS plans, which can cover up to 100% of the
                cost of treatment. Get a free, confidential verification of your benefits.
              </p>
              <div className="mt-6">
                <Button href="/verify-insurance" variant="primary" size="lg" icon>
                  Verify your benefits free
                </Button>
              </div>
            </div>
            <InsuranceStrip />
          </div>
        </Container>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="FAQs"
            title="You have questions. We have answers."
            intro="Guidance through the most common questions about mental health treatment at Garden Springs Wellness."
            align="center"
            className="mb-12"
          />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      {/* ---------- BLOG TEASER ---------- */}
      {posts.length > 0 && (
        <Section tone="sand">
          <Container>
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Latest News & Resources"
                title="From our blog"
                intro="Insights and guidance from our clinical team to support your mental wellness."
              />
              <Button href="/blog" variant="outline">Visit the blog</Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <CategoryCard key={p.urlPath} entry={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ---------- CONTACT STRIP ---------- */}
      <Section tone="forest" className="!py-14">
        <Container>
          <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">
            <a href={site.phone.primaryHref} className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/10 text-gold-400"><PhoneIcon className="h-5 w-5" /></span>
              <span>
                <span className="eyebrow block text-gold-400">Call Us</span>
                <span className="text-cream">{site.phone.primary}</span>
              </span>
            </a>
            <a href={site.address.mapsHref} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/10 text-gold-400"><MapPin className="h-5 w-5" /></span>
              <span>
                <span className="eyebrow block text-gold-400">Visit Us</span>
                <span className="text-cream">{site.address.full}</span>
              </span>
            </a>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/10 text-gold-400"><ClockIcon className="h-5 w-5" /></span>
              <span>
                <span className="eyebrow block text-gold-400">Hours</span>
                <span className="block text-sm text-cream/85">{site.hours.weekdays}</span>
                <span className="block text-sm text-cream/85">{site.hours.weekends}</span>
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection title="Restore your balance. Transform your life." />
    </>
  );
}
