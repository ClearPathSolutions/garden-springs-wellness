import { NextResponse } from "next/server";

// Lead intake endpoint.
// TODO: connect to your email provider / CRM (e.g. Resend, SendGrid, HubSpot,
// Salesforce, or a Vercel-hosted webhook). For now it validates and acknowledges
// the submission so the front-end flow works end-to-end.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data?.name ?? "").trim();
    const contact = String(data?.phone ?? data?.email ?? "").trim();

    if (!name || !contact) {
      return NextResponse.json(
        { ok: false, error: "Please include your name and a way to reach you." },
        { status: 400 }
      );
    }

    // e.g. await sendEmail({ to: "info@gardenspringswellness.com", subject: `New ${data.formType} lead`, body: JSON.stringify(data) })
    console.log("[lead]", JSON.stringify(data));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
