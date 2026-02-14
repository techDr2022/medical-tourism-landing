import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_MIN_SCORE = 0.3;
const CONTACT_TO_EMAIL = "info@techdr.in";

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
    const { name, country, whatsapp, email, medicalCondition, files, recaptchaToken } = body;

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

    // Validate required fields
    if (!name || !country || !whatsapp || !email || !medicalCondition) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    if (!fromEmail) {
      console.error("RESEND_FROM is not set (use a verified domain in Resend)");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `New Medical Travel Inquiry from ${name}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
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
                <td style="padding: 8px 0; color: #171717;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #171717;">
                  <a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">WhatsApp:</td>
                <td style="padding: 8px 0; color: #171717;">
                  <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #10b981; text-decoration: none;">${whatsapp}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #171717; margin-top: 0;">Medical Condition</h3>
            <p style="color: #374151; line-height: 1.6; margin: 0;">${medicalCondition.replace(/\n/g, '<br>')}</p>
          </div>

          ${files && files.length > 0 ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #171717;">Attached Files</h3>
              <p style="color: #374151;">${files.length} file(s) attached</p>
            </div>
          ` : ''}

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
- Email: ${email}
- WhatsApp: ${whatsapp}

Medical Condition:
${medicalCondition}

${files && files.length > 0 ? `\nAttached Files: ${files.length} file(s)` : ''}
      `.trim();

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      subject,
      html,
      text,
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
