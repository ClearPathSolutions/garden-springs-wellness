"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowRight, Check, PhoneIcon, ShieldIcon } from "@/components/icons";
import { ProviderCombobox } from "@/components/forms/ProviderCombobox";

type Variant = "contact" | "insurance" | "callback";

const config: Record<
  Variant,
  {
    submit: string;
    formType: string;
    clarionForm: string;
    successTitle: string;
    successBody: string;
  }
> = {
  contact: {
    submit: "Send message",
    formType: "Contact",
    clarionForm: "contact",
    successTitle: "Thank you for contacting us",
    successBody:
      "An admissions specialist will be reaching out to you shortly.",
  },
  insurance: {
    submit: "Verify my benefits",
    formType: "Insurance Verification",
    clarionForm: "insurance_verification",
    successTitle: "Thank you for submitting your insurance details",
    successBody:
      "We'll be running a verification of your insurance benefits. An admissions specialist will be reaching out to you shortly to walk you through your coverage and options.",
  },
  callback: {
    submit: "Request a call",
    formType: "Callback Request",
    clarionForm: "callback",
    successTitle: "Thank you for reaching out",
    successBody:
      "An admissions specialist will be reaching out to you shortly.",
  },
};

const inputBase =
  "w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-900 outline-none transition-colors placeholder:text-forest-900/40 focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15";
const labelBase = "mb-1.5 block text-sm font-semibold text-forest-900";

export function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  // Controlled value for the provider combobox (insurance variant only).
  const [provider, setProvider] = useState("");
  const cfg = config[variant];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // We own the submit UX (prevent the browser's native navigation/refresh
    // and show an inline confirmation). Clarion's forms-capture.v1.js listens
    // on the same submit event as a fire-and-forget side POST — it reads the
    // form's FormData synchronously before this preventDefault matters, so the
    // lead is still captured by Clarion. See data-clarion-form on the <form>.
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.formType = cfg.formType;

    try {
      // Backup server-side record (Clarion capture runs independently).
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please call us instead.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again or call us.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest-900/10 bg-forest-50 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-cream">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl text-forest-900">{cfg.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">{cfg.successBody}</p>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-forest-900">
          <ShieldIcon className="h-4 w-4 text-forest-600" />
          Prefer to talk now? Call{" "}
          <a href={site.phone.primaryHref} className="inline-flex items-center gap-1 font-semibold text-forest-800 underline" suppressHydrationWarning>
            <PhoneIcon className="h-3.5 w-3.5" />
            {site.phone.primary}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      data-clarion-form={cfg.clarionForm}
      onSubmit={onSubmit}
      noValidate
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
        <a href={site.phone.primaryHref} className="font-semibold text-forest-800 underline" suppressHydrationWarning>
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
