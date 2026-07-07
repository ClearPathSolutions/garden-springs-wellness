import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Eyebrow } from "@/components/ui";
import { LeadForm } from "@/components/forms/LeadForm";
import { InsuranceStrip } from "@/components/home/InsuranceStrip";
import { Check, ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Verify Your Insurance | Free Verification of Benefits",
  description:
    "Don't let financial burdens get in the way of your mental health treatment. Get a free, confidential verification of your insurance benefits today.",
  alternates: { canonical: "/verify-insurance" },
};

const steps = [
  { n: "01", t: "Submit your details", d: "Share your insurance information using the secure form — it takes about two minutes." },
  { n: "02", t: "We verify your benefits", d: "Our admissions team confirms your coverage directly with your provider, at no cost to you." },
  { n: "03", t: "Understand your options", d: "We'll walk you through exactly what's covered and recommend the right level of care." },
];

export default function VerifyInsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance Verification"
        title="Get a free verification of benefits"
        intro="At Garden Springs Wellness, we don't let financial barriers get in the way of your mental health. We work with most major commercial PPO & POS insurance plans — coverage can extend up to 100% of the cost of treatment."
        breadcrumbs={[{ label: "Verify Insurance" }]}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow className="mb-4">How It Works</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
                Simple, confidential, and free
              </h2>
              <div className="mt-8 space-y-5">
                {steps.map((s) => (
                  <div key={s.n} className="flex gap-5">
                    <span className="font-display text-3xl text-gold-500">{s.n}</span>
                    <div>
                      <h3 className="font-display text-xl text-forest-900">{s.t}</h3>
                      <p className="mt-1 text-sm text-muted">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-forest-900/10 bg-sand p-6">
                <p className="flex items-start gap-3 text-sm text-forest-900/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                  Don&apos;t see your insurance below? Don&apos;t worry — we work with many
                  providers and will happily check your specific plan.
                </p>
                <p className="mt-3 flex items-start gap-3 text-sm text-forest-900/85">
                  <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                  Please note: we are unable to accept Medicare or Medicaid plans at this time.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-display text-2xl text-forest-900">Verify your benefits</h3>
              <p className="mt-2 mb-6 text-sm text-muted">
                Complete the form and our team will confirm your coverage — usually the same day.
              </p>
              <LeadForm variant="insurance" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-14">
        <Container>
          <p className="mb-8 text-center">
            <span className="eyebrow text-gold-500">In-Network With</span>
          </p>
          <InsuranceStrip />
        </Container>
      </section>
    </>
  );
}
