"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";
import { ArrowRight, ShieldIcon } from "@/components/icons";
import { ProviderCombobox } from "@/components/forms/ProviderCombobox";

type Variant = "contact" | "insurance" | "callback";

const config: Record<
  Variant,
  { thankYou: string; submit: string; formType: string }
> = {
  contact: { thankYou: "/thank-you-contact", submit: "Send message", formType: "Contact" },
  insurance: { thankYou: "/thank-you-insurance", submit: "Verify my benefits", formType: "Insurance Verification" },
  callback: { thankYou: "/thank-you-callback", submit: "Request a call", formType: "Callback Request" },
};

const inputBase =
  "w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-900 outline-none transition-colors placeholder:text-forest-900/40 focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15";
const labelBase = "mb-1.5 block text-sm font-semibold text-forest-900";

export function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  // Controlled value for the provider combobox (insurance variant only).
  const [provider, setProvider] = useState("");
  const cfg = config[variant];

  // The insurance form is captured by Clarion's forms-capture.v1.js via the
  // data-clarion-form attribute, so it submits natively — we must NOT
  // preventDefault or run our own fetch, or Clarion never sees the submit.
  const isClarionCaptured = variant === "insurance";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.formType = cfg.formType;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please call us instead.");
      }
      router.push(cfg.thankYou);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again or call us.");
    }
  }

  return (
    <form
      {...(isClarionCaptured
        ? { "data-clarion-form": "insurance_verification" }
        : { onSubmit, noValidate: true })}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>Full name*</label>
          <input id="name" name="name" required autoComplete="name" className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>Phone*</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelBase}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={inputBase} placeholder="you@email.com" />
      </div>

      {variant === "insurance" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dob" className={labelBase}>Date of birth*</label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                autoComplete="bday"
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="memberId" className={labelBase}>Member ID</label>
              <input id="memberId" name="memberId" className={inputBase} placeholder="Optional" />
            </div>
          </div>

          <div>
            <label htmlFor="insurer" className={labelBase}>Insurance provider*</label>
            <ProviderCombobox
              id="insurer"
              name="insurer"
              required
              value={provider}
              onChange={setProvider}
              placeholder="Start typing, e.g. Aetna, Cigna, Horizon"
              className={inputBase}
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className={labelBase}>
          {variant === "insurance" ? "Anything else we should know?" : "How can we help?"}
        </label>
        <textarea id="message" name="message" rows={variant === "insurance" ? 3 : 4} className={inputBase} placeholder="Share as much or as little as you'd like — this is completely confidential." />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 px-7 py-4 font-semibold text-cream transition-colors hover:bg-forest-800 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : cfg.submit}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="flex items-center gap-2 pt-1 text-xs text-muted">
        <ShieldIcon className="h-3.5 w-3.5 text-forest-500" />
        Your information is 100% confidential. Prefer to talk now? Call{" "}
        <a href={site.phone.primaryHref} className="font-semibold text-forest-800 underline">
          {site.phone.primary}
        </a>
        .
      </p>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Submitting your request" : ""}
      </p>
      <input type="hidden" name="formType" value={cfg.formType} />
      <input type="hidden" name="_variant" value={variant} />
    </form>
  );
}
