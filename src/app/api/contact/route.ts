import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_MIN_SCORE = 0.3;

// Inquiries go here; set CONTACT_TO_EMAIL in env
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL?.trim() || "info@techdr.in";
// WhatsApp shown in customer confirmation email; set NEXT_PUBLIC_WHATSAPP_NUMBER (e.g. 919032292171)
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "919032292171";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function verifyRecaptchaToken(
  token: string
): Promise<{ success: boolean; score?: number; raw?: unknown }> {
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
    "error-codes"?: string[];
  };
  const score = data.score ?? 0;
  const passed = data.success === true && score >= RECAPTCHA_MIN_SCORE;
  if (!passed && process.env.NODE_ENV === "development") {
    console.warn("reCAPTCHA verify:", {
      success: data.success,
      score: data.score,
      "error-codes": data["error-codes"],
    });
  }
  return { success: passed, score: data.score, raw: data };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, country, outsideIndia, whatsapp, email, medicalCondition, files, recaptchaToken } = body;

    // Build attachments from uploaded files (base64 content)
    // Resend expects base64 string, not Buffer
    const attachments: { filename: string; content: string }[] = [];
    if (Array.isArray(files) && files.length > 0) {
      for (const f of files) {
        if (f && typeof f.name === "string" && typeof f.content === "string" && f.content.length > 0) {
          attachments.push({
            filename: f.name,
            content: f.content,
          });
        }
      }
    }

    // Verify reCAPTCHA v3 when secret is set and a token was sent
    if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken && typeof recaptchaToken === "string") {
      const { success } = await verifyRecaptchaToken(recaptchaToken);
      if (!success) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 }
        );
      }
    } else if (process.env.RECAPTCHA_SECRET_KEY && !recaptchaToken) {
      console.warn("RECAPTCHA_SECRET_KEY set but no token received; skipping verification");
    }

    // Validate required fields (country dropdown, outside India, and others filter junk leads)
    if (!name || !country || !outsideIndia || !whatsapp || !email || !medicalCondition) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (outsideIndia !== "yes" && outsideIndia !== "no") {
      return NextResponse.json(
        { error: "Please indicate whether you are currently outside India" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const fromEmail = process.env.RESEND_FROM?.trim();

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      const msg =
        process.env.NODE_ENV === "development"
          ? "RESEND_API_KEY is missing. Add it to .env and restart the dev server."
          : "Email service is not configured. Please contact the administrator.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    if (!fromEmail) {
      console.error("RESEND_FROM is not set (use a verified domain in Resend)");
      const msg =
        process.env.NODE_ENV === "development"
          ? "RESEND_FROM is missing. Add it to .env (e.g. \"Your Name <onboarding@resend.dev>\") and restart the dev server."
          : "Email service is not configured. Please contact the administrator.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const subject = `New Medical Travel Inquiry from ${name}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1c7c7f; border-bottom: 2px solid #1c7c7f; padding-bottom: 10px;">
            New Medical Travel Inquiry
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #171717; margin-top: 0;">Patient Information</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 150px;">Full Name:</td>
                <td style="padding: 8px 0; color: #171717;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Country:</td>
                <td style="padding: 8px 0; color: #171717;">${escapeHtml(country)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Currently outside India:</td>
                <td style="padding: 8px 0; color: #171717;">${outsideIndia === "yes" ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #171717;">
                  <a href="mailto:${email}" style="color: #1c7c7f; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">WhatsApp:</td>
                <td style="padding: 8px 0; color: #171717;">
                  <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #1c7c7f; text-decoration: none;">${whatsapp}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1c7c7f;">
            <h3 style="color: #171717; margin-top: 0;">Medical Condition</h3>
            <p style="color: #374151; line-height: 1.6; margin: 0;">${medicalCondition.replace(/\n/g, '<br>')}</p>
          </div>

          ${attachments.length > 0 ? `
            <div style="margin: 20px 0; padding: 16px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #1c7c7f;">
              <h3 style="color: #171717; margin-top: 0;">Attached Files (see email attachments)</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">${attachments.map((a) => `<li>${escapeHtml(a.filename)}</li>`).join("")}</ul>
            </div>
          ` : ""}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This inquiry was submitted through the Medical Travel to India contact form.
            </p>
          </div>
        </div>
      `;
    const text = `
New Medical Travel Inquiry

Patient Information:
- Full Name: ${name}
- Country: ${country}
- Currently outside India: ${outsideIndia === "yes" ? "Yes" : "No"}
- Email: ${email}
- WhatsApp: ${whatsapp}

Medical Condition:
${medicalCondition}

${attachments.length > 0 ? `\nAttached Files:\n${attachments.map((a) => `- ${a.filename}`).join("\n")}` : ""}
      `.trim();

    // 1. Send inquiry to the team (with attachments if any)
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      subject,
      html,
      text,
      ...(attachments.length > 0 && { attachments }),
    });

    if (error) {
      const errMessage = typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error);
      console.error("Resend error:", errMessage, error);
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

    // 2. Send thank-you confirmation to the customer
    const customerSubject = "Thank you for your inquiry – Medical Travel to India";
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1c7c7f; border-bottom: 2px solid #1c7c7f; padding-bottom: 10px;">
          Thank you for reaching out
        </h2>
        <p style="color: #374151; line-height: 1.6; font-size: 16px;">
          Dear ${name},
        </p>
        <p style="color: #374151; line-height: 1.6;">
          Thank you for submitting your medical travel inquiry. We have received your details and our team will connect with you shortly to discuss your requirements and next steps.
        </p>
        <p style="color: #374151; line-height: 1.6;">
          If you have any urgent questions, please reply to this email or WhatsApp us at <a href="https://wa.me/${WHATSAPP_NUMBER}" style="color: #1c7c7f; text-decoration: none;">+${WHATSAPP_NUMBER.length >= 12 ? `${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2)}` : WHATSAPP_NUMBER}</a>.
        </p>
        <p style="color: #374151; line-height: 1.6; margin-top: 24px;">
          Best regards,<br />
          <strong>Medical Travel to India Team</strong>
        </p>
      </div>
    `;
    const customerText = `
Thank you for reaching out, ${name}.

Thank you for submitting your medical travel inquiry. We have received your details and our team will connect with you shortly to discuss your requirements and next steps.

If you have any urgent questions, please reply to this email or WhatsApp us at +${WHATSAPP_NUMBER.length >= 12 ? `${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2)}` : WHATSAPP_NUMBER}.

Best regards,
Medical Travel to India Team
    `.trim();

    const customerResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: customerSubject,
      html: customerHtml,
      text: customerText,
    });

    if (customerResult.error) {
      console.error("Failed to send customer confirmation email:", customerResult.error);
      // Inquiry was already received by the team; don't fail the request
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error("Error sending email:", errMessage, error);
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
