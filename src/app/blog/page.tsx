import type { Metadata } from "next";
import Script from "next/script";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Blog | Mental Health News & Resources",
  description:
    "Insights, guidance, and resources on mental health and wellness from the clinical team at Garden Springs Wellness.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Resources"
        title="From the Garden Springs blog"
        intro="Insights and guidance from our clinical team to support your mental wellness journey."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <Section tone="white">
        <Container>
          {/* Blog posts render inside this element, managed by Clarion Labs. */}
          <div data-clarion-blog />
          <Script
            src="https://www.clarionlabs.ai/blog-embed.v1.js"
            data-site-key="cpx_VQ5hBCcgttbYesmhRRyyIIHQnp-LotQ2"
            data-api="https://api.clarionlabs.ai"
            strategy="afterInteractive"
          />
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
