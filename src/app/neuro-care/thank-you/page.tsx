"use client";

import { useEffect } from "react";
import Link from "next/link";
import { publishGclidForConversion } from "@/lib/gclid";
import {
  DEFAULT_WHATSAPP_NUMBER,
  formatWhatsAppDisplay,
} from "@/lib/contact";
import {
  NEUROLOGY_BRAND,
  NEUROLOGY_WHATSAPP_MESSAGE,
} from "@/constants/neurology";
import { trackAfricaWhatsAppClick } from "@/lib/adsTracking";

const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
const WA_DISPLAY = formatWhatsAppDisplay(WA_NUMBER);
const WA_HREF = `https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(NEUROLOGY_WHATSAPP_MESSAGE)}`;

const NEXT_STEPS = [
  "Our neurology team reviews your reports within 24 hours",
  "You receive a free expert medical opinion and hospital match",
  "We share a transparent package quote with inclusions",
  "Visa, travel, and a dedicated coordinator are arranged for you",
];

export default function NeurologyThankYouPage() {
  useEffect(() => {
    const gclid = publishGclidForConversion();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "thank_you_page_view",
      source: "neurology",
      page: "/neuro-care/thank-you",
      ...(gclid ? { gclid } : {}),
    });
    window.dataLayer.push({
      event: "neurology_lead_thank_you",
      event_category: "neurology_lead_form",
      source: "neurology",
      page: "/neuro-care/thank-you",
      ...(gclid ? { gclid } : {}),
    });
  }, []);

  return (
    <div className="neuro-page neuro-thankyou">
      <header className="neuro-header">
        <div className="neuro-header__inner">
          <Link className="neuro-logo" href="/neuro-care" aria-label={NEUROLOGY_BRAND}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="neuro-logo__img"
              src="/logos/new-logo.png"
              alt={NEUROLOGY_BRAND}
              width={160}
              height={36}
            />
          </Link>
          <a
            className="neuro-btn neuro-btn--whatsapp"
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAfricaWhatsAppClick({ source: "neurology_thank_you_header" })
            }
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="neuro-thankyou__main">
        <div className="neuro-thankyou__card">
          <div className="neuro-thankyou__check" aria-hidden="true">
            ✓
          </div>
          <p className="neuro-thankyou__eyebrow">Neurology plan requested</p>
          <h1>Thank You for Your Submission</h1>
          <p className="neuro-thankyou__lead">
            We have received your neurology enquiry. Expect a free expert medical
            opinion and personalised treatment plan within 24 hours.
          </p>

          <div className="neuro-thankyou__next">
            <h2>What happens next</h2>
            <ol>
              {NEXT_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="neuro-thankyou__actions">
            <a
              className="neuro-btn neuro-btn--whatsapp"
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAfricaWhatsAppClick({ source: "neurology_thank_you" })
              }
            >
              Chat on WhatsApp · {WA_DISPLAY}
            </a>
            <Link className="neuro-btn neuro-btn--teal neuro-thankyou__back" href="/neuro-care">
              Back to Neurology
            </Link>
          </div>

          <p className="neuro-thankyou__note">
            A confirmation email has been sent to the address you provided.
          </p>
        </div>
      </main>
    </div>
  );
}
