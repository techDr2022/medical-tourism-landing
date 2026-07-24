import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_WHATSAPP_NUMBER,
  formatWhatsAppDisplay,
} from "@/lib/contact";
import { getBrochureAttachment } from "@/lib/brochureAttachment";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_MIN_SCORE = 0.5;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
const WHATSAPP_DISPLAY = formatWhatsAppDisplay(WHATSAPP_NUMBER);

type RateLimitEntry = { count: number; resetAt: number };
const ipRateLimits = new Map<string, RateLimitEntry>();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, entry] of Array.from(ipRateLimits.entries())) {
    if (now >= entry.resetAt) ipRateLimits.delete(key);
  }
  const entry = ipRateLimits.get(ip);
  if (!entry || now >= entry.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

async function verifyRecaptchaToken(
  token: string
): Promise<{ success: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return { success: false };
  }

  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = (await res.json()) as {
    success?: boolean;
    score?: number;
  };

  const score = data.score ?? 0;
  return { success: data.success === true && score >= RECAPTCHA_MIN_SCORE };
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      whatsapp,
      country,
      city,
      treatment,
      travelTimeline,
      reportStatus,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      recaptchaToken,
    } = body;

    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken || typeof recaptchaToken !== "string") {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 }
        );
      }
      const { success } = await verifyRecaptchaToken(recaptchaToken);
      if (!success) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    if (!name?.trim() || !email?.trim() || !whatsapp?.trim() || !country?.trim()) {
      return NextResponse.json(
        { error: "Name, email, WhatsApp, and country are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const fromEmail = process.env.RESEND_FROM?.trim();

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? "RESEND_API_KEY is missing. Add it to .env and restart the dev server."
              : "Email service is not configured. Please try WhatsApp or try again later.",
        },
        { status: 500 }
      );
    }

    if (!fromEmail) {
      console.error("RESEND_FROM is not set");
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? 'RESEND_FROM is missing. Add it to .env (e.g. "Medical Travel <onboarding@resend.dev>").'
              : "Email service is not configured. Please try WhatsApp or try again later.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const safeName = escapeHtml(String(name).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safeWhatsapp = escapeHtml(String(whatsapp).trim());
    const safeCountry = escapeHtml(String(country).trim());
    const safeCity = city ? escapeHtml(String(city).trim()) : "—";
    const safeTreatment = treatment
      ? escapeHtml(String(treatment).trim())
      : "Not specified";
    const safeTravel = travelTimeline
      ? escapeHtml(String(travelTimeline).trim())
      : "—";
    const safeReports = reportStatus
      ? escapeHtml(String(reportStatus).trim())
      : "—";
    const safeMessage = message
      ? escapeHtml(String(message).trim()).replace(/\n/g, "<br>")
      : "";

    const subject = `[Africa] New enquiry from ${String(name).trim()} (${String(country).trim()})`;
    const html = `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1c7c7f; border-bottom: 2px solid #1c7c7f; padding-bottom: 10px;">
          Africa landing page enquiry
        </h2>
        <div style="background:#f9fafb; padding:20px; border-radius:8px; margin:20px 0;">
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; font-weight:600; width:160px;">Name</td><td>${safeName}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Email</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">WhatsApp</td><td><a href="https://wa.me/${String(whatsapp).replace(/\D/g, "")}">${safeWhatsapp}</a></td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Country</td><td>${safeCountry}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">City</td><td>${safeCity}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Treatment</td><td>${safeTreatment}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Travel timeline</td><td>${safeTravel}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">Reports status</td><td>${safeReports}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">UTM source</td><td>${escapeHtml(String(utm_source || "—"))}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">UTM campaign</td><td>${escapeHtml(String(utm_campaign || "—"))}</td></tr>
            <tr><td style="padding:8px 0; font-weight:600;">UTM content</td><td>${escapeHtml(String(utm_content || utm_medium || utm_term || "—"))}</td></tr>
          </table>
        </div>
        ${
          safeMessage
            ? `<div style="background:#f0fdf4; padding:20px; border-radius:8px; border-left:4px solid #1c7c7f;">
                <h3 style="margin-top:0;">Message</h3>
                <p style="margin:0; line-height:1.6;">${safeMessage}</p>
              </div>`
            : ""
        }
        <p style="color:#6b7280; font-size:12px; margin-top:24px;">Submitted from /africa</p>
      </div>
    `;

    const text = `
Africa landing page enquiry

Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}
Country: ${country}
City: ${city || "—"}
Treatment: ${treatment || "Not specified"}
Travel timeline: ${travelTimeline || "—"}
Reports status: ${reportStatus || "—"}
UTM: ${utm_source || ""} / ${utm_campaign || ""} / ${utm_content || ""}

${message ? `Message:\n${message}` : ""}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      replyTo: String(email).trim(),
      subject,
      html,
      text,
    });

    if (error) {
      const errMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : String(error);
      console.error("Resend africa-contact error:", errMessage, error);
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? `Email failed: ${errMessage}`
              : "Failed to send email. Please try again or WhatsApp us.",
        },
        { status: 500 }
      );
    }

    const brochure = await getBrochureAttachment();

    const customerResult = await resend.emails.send({
      from: fromEmail,
      to: String(email).trim(),
      subject: "We received your enquiry — Medical Tours India",
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#1c7c7f;">Thank you, ${safeName}</h2>
          <p style="color:#374151; line-height:1.6;">
            We received your enquiry about treatment in India. A coordinator will follow up shortly
            with transparent pricing and next steps — including medical visa support if needed.
          </p>
          <p style="color:#374151; line-height:1.6;">
            ${
              brochure
                ? "We have attached our <strong>Medical Tourism India brochure</strong> for an overview of hospitals, treatments, and how we support international patients."
                : "Our team will also share our Medical Tourism India brochure with hospital and treatment details."
            }
          </p>
          <p style="color:#374151; line-height:1.6;">
            Prefer WhatsApp? Message us at
            <a href="https://wa.me/${WHATSAPP_NUMBER}" style="color:#1c7c7f;">${WHATSAPP_DISPLAY}</a>.
          </p>
          <p style="color:#374151; margin-top:24px;">
            Best regards,<br /><strong>Medical Tours India</strong>
          </p>
        </div>
      `,
      text: `Thank you, ${name}. We received your enquiry about treatment in India. A coordinator will follow up shortly.${brochure ? " Our Medical Tourism India brochure is attached." : ""} WhatsApp: ${WHATSAPP_DISPLAY}`,
      ...(brochure ? { attachments: [brochure] } : {}),
    });

    if (customerResult.error) {
      console.error("Africa confirmation email failed:", customerResult.error);
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error("africa-contact error:", errMessage, error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `Email failed: ${errMessage}`
            : "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
