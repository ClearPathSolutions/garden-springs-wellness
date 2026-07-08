import type { Metadata } from "next";
import Script from "next/script";
import { PageHero } from "@/components/PageHero";
import { Container, Eyebrow } from "@/components/ui";
import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/lib/site";
import { PhoneIcon, MailIcon, MapPin, ClockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us | Mental Health Treatment in New Jersey",
  description:
    "Contact Garden Springs Wellness to get started on your mental health treatment. Call us today to learn more about your treatment options.",
  alternates: { canonical: "/contact-us" },
};

const details = [
  { Icon: PhoneIcon, label: "Call Us", value: site.phone.primary, href: site.phone.primaryHref },
  { Icon: MailIcon, label: "Email Us", value: site.email, href: `mailto:${site.email}` },
  { Icon: MapPin, label: "Visit Us", value: site.address.full, href: site.address.mapsHref },
];

export default function ContactPage() {
  return (
    <>
      {/* Clarion Labs form capture — intercepts the contact form's submit
          (matched via data-clarion-form="contact"). */}
      <Script
        src="https://www.clarionlabs.ai/forms-capture.v1.js"
        data-site-key="cpx_VQ5hBCcgttbYesmhRRyyIIHQnp-LotQ2"
        data-api="https://api.clarionlabs.ai"
        strategy="afterInteractive"
      />

      <PageHero
        eyebrow="Get in Touch"
        title="Contact Garden Springs Wellness"
        intro="We're here to help, day or night. Reach out to learn more about our boutique mental health treatment services — every conversation is free and completely confidential."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* Info column */}
            <div>
              <Eyebrow className="mb-4">We&apos;re Here For You</Eyebrow>
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">
                Speak with our compassionate team
              </h2>
              <p className="mt-4 text-muted">
                Whether you&apos;re seeking help for yourself or a loved one, we&apos;ll walk you
                through your options with patience and care — no pressure, no judgment.
              </p>

              <div className="mt-8 space-y-4">
                {details.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-2xl border border-forest-900/10 bg-sand p-5 transition-colors hover:border-forest-900/20 hover:bg-forest-50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-gold-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="eyebrow block text-gold-500">{label}</span>
                      <span className="mt-1 block font-medium text-forest-900">{value}</span>
                    </span>
                  </a>
                ))}
                <div className="flex items-start gap-4 rounded-2xl border border-forest-900/10 bg-sand p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-gold-400">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="eyebrow block text-gold-500">Hours</span>
                    <span className="mt-1 block font-medium text-forest-900">{site.hours.weekdays}</span>
                    <span className="block font-medium text-forest-900">{site.hours.weekends}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-display text-2xl text-forest-900">Send us a message</h3>
              <p className="mt-2 mb-6 text-sm text-muted">
                Fill out the form and a member of our team will reach out shortly.
              </p>
              <LeadForm variant="contact" />
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-sand pb-16">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-forest-900/10 shadow-soft">
            <iframe
              title="Garden Springs Wellness location map"
              src="https://www.google.com/maps?q=285+Grand+Avenue+Englewood+NJ+07631&output=embed"
              className="h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
