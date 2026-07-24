"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  AFRICAN_COUNTRIES,
  COST_COUNTRIES,
  COST_PROCEDURES,
  NEUROLOGY_BENEFITS,
  NEUROLOGY_BRAND,
  NEUROLOGY_CONDITION_CARDS,
  NEUROLOGY_COSTS,
  NEUROLOGY_DOMAIN,
  NEUROLOGY_FAQ,
  NEUROLOGY_HERO,
  NEUROLOGY_SOCIAL_AVATARS,
  NEUROLOGY_STATS,
  NEUROLOGY_STEPS,
  NEUROLOGY_TESTIMONIALS,
  NEUROLOGY_WHATSAPP_MESSAGE,
  NEURO_CONDITIONS,
  type CostCountryKey,
  type CostProcedureKey,
} from "@/constants/neurology";
import {
  DEFAULT_WHATSAPP_NUMBER,
  formatWhatsAppDisplay,
} from "@/lib/contact";
import {
  getUtmParamsFromUrl,
  trackAfricaWhatsAppClick,
  trackNeurologyLeadSubmitAndWait,
} from "@/lib/adsTracking";
import { submitAfricaLeadEmail } from "@/lib/africaLeadSubmit";
import { HospitalsSection } from "@/components/sections/HospitalsSection";
import { redirectToNeurologyThankYou } from "@/lib/gclid";

const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
const WA_DISPLAY = formatWhatsAppDisplay(WA_NUMBER);

function waUrl(message: string) {
  return `https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function scrollToForm() {
  document.getElementById("neuro-lead-form")?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

export function NeurologyPage({
  conditionImages = {},
}: {
  conditionImages?: Record<string, string>;
}) {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcCountry, setCalcCountry] =
    useState<Exclude<CostCountryKey, "uk" | "us" | "india">>("nigeria");
  const [calcProcedure, setCalcProcedure] =
    useState<CostProcedureKey>("brain_tumor");

  const calc = useMemo(() => {
    const row = NEUROLOGY_COSTS[calcProcedure];
    const local = row[calcCountry];
    const india = row.india;
    const savingsPct = Math.round(((local - india) / local) * 100);
    const countryLabel =
      COST_COUNTRIES.find((c) => c.value === calcCountry)?.label ?? calcCountry;
    return { local, india, savingsPct, countryLabel };
  }, [calcCountry, calcProcedure]);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onWhatsApp = useCallback((source: string) => {
    trackAfricaWhatsAppClick({ source, page: "neurology" });
  }, []);

  return (
    <div className="neuro-page">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <symbol id="wa-icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </symbol>
      </svg>

      {/* 1. Announcement */}
      <div className="neuro-announce" role="banner">
        <div className="neuro-announce__inner">
          <p className="neuro-announce__text">
            🌍 Trusted by 5,000+ patients · Free expert opinion in 24 hours · Complete
            travel support
          </p>
          <a className="neuro-announce__phone" href={`tel:+${WA_NUMBER.replace(/\D/g, "")}`}>
            {WA_DISPLAY}
          </a>
        </div>
      </div>

      {/* 2. Sticky header */}
      <header className={`neuro-header${headerScrolled ? " scrolled" : ""}`}>
        <div className="neuro-header__inner">
          <a className="neuro-logo" href="#top" aria-label={`${NEUROLOGY_BRAND} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="neuro-logo__img"
              src="/logos/new-logo.png"
              alt={NEUROLOGY_BRAND}
              width={160}
              height={36}
              decoding="async"
              fetchPriority="high"
            />
          </a>
          <div className="neuro-header__actions">
            <a
              className="neuro-header__phone"
              href={`tel:+${WA_NUMBER.replace(/\D/g, "")}`}
            >
              {WA_DISPLAY}
            </a>
            <button
              type="button"
              className="neuro-btn neuro-btn--teal neuro-header__form"
              onClick={scrollToForm}
            >
              <span className="neuro-header__form-full">Get Free Plan</span>
              <span className="neuro-header__form-short">Get Plan</span>
            </button>
            <a
              className="neuro-btn neuro-btn--whatsapp"
              href={waUrl(NEUROLOGY_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onWhatsApp("header")}
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* 3. Hero — visible photo banner + offer copy (no form) */}
        <section className="neuro-hero" aria-labelledby="neuro-hero-heading">
          <div className="neuro-hero__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="neuro-hero__photo"
              src="/services/5576.jpg"
              alt="Neurology and brain care specialists treating international patients in India"
              width={1500}
              height={1000}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="neuro-hero__content">
            <div className="neuro-container">
              <p className="neuro-eyebrow">
                Neurology Treatment in India · For African Patients
              </p>
              <h1 id="neuro-hero-heading" data-speakable>
                Expert Brain &amp; Spine Care in{" "}
                <span className="neuro-india">India</span> — At 70% Less Cost
              </h1>
              <p className="neuro-hero__sub" data-speakable>
                {NEUROLOGY_HERO.subheadline}
              </p>
              <ul className="neuro-benefits">
                {NEUROLOGY_BENEFITS.map((item) => (
                  <li key={item}>
                    <span className="neuro-benefits__check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="neuro-hero__ctas">
                <button
                  type="button"
                  className="neuro-btn neuro-btn--teal"
                  onClick={scrollToForm}
                >
                  Get My Free Treatment Plan →
                </button>
                <a
                  className="neuro-btn neuro-btn--whatsapp neuro-hero__wa"
                  href={waUrl(NEUROLOGY_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onWhatsApp("hero_cta")}
                >
                  <WhatsAppIcon />
                  <span className="neuro-wa-label">Chat on WhatsApp</span>
                </a>
              </div>
              <div className="neuro-social-proof">
                <div className="neuro-avatars" aria-hidden="true">
                  {NEUROLOGY_SOCIAL_AVATARS.map((a) => (
                    <span key={a.initials} style={{ background: a.color }}>
                      {a.initials}
                    </span>
                  ))}
                </div>
                <p>Join 5,000+ patients who trusted us for treatment in India</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Lead form (own section) */}
        <section
          className="neuro-section neuro-section--cream neuro-form-section"
          id="neuro-lead-form"
          aria-labelledby="neuro-form-heading"
        >
          <div className="neuro-container neuro-form-section__inner">
            <div className="neuro-form-section__intro">
              <span className="neuro-label">Free Treatment Plan</span>
              <h2 id="neuro-form-heading">
                Get Your Personalised Neurology Plan in 24 Hours
              </h2>
              <p>
                Share your details below. Our team emails a hospital match, specialist
                recommendation, and cost breakdown — completely free.
              </p>
            </div>
            <LeadForm onWhatsApp={onWhatsApp} />
          </div>
        </section>

        {/* 5. Stats */}
        <section className="neuro-stats" aria-label="Key statistics">
          <div className="neuro-container">
            <div className="neuro-stats__row reveal">
              {NEUROLOGY_STATS.map((stat) => (
                <div key={stat.label} className="neuro-stat">
                  <div className="neuro-stat__value">{stat.value}</div>
                  <div className="neuro-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Conditions */}
        <section
          className="neuro-section neuro-section--white"
          id="conditions"
          aria-labelledby="neuro-conditions-heading"
        >
          <div className="neuro-container">
            <span className="neuro-label reveal">Neurological Conditions</span>
            <h2 id="neuro-conditions-heading" className="reveal" data-speakable>
              Every Major Neurological Condition — Treated in India
            </h2>
            <p className="neuro-section__intro reveal" data-speakable>
              From brain tumours and epilepsy surgery to Parkinson&apos;s DBS and
              spine care — African patients access JCI &amp; NABH accredited neurology
              hospitals in India with transparent pricing and full travel support.
            </p>
            <div className="neuro-conditions-grid">
              {NEUROLOGY_CONDITION_CARDS.map((card) => (
                <article key={card.slug} className="neuro-card reveal">
                  <ConditionImage
                    src={conditionImages[card.slug]}
                    emoji={card.emoji}
                    alt={`${card.name} treatment in India for African patients`}
                  />
                  <h3>{card.name}</h3>
                  <p>{card.description}</p>
                  <span className="neuro-savings">{card.savings}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Calculator */}
        <section className="neuro-section neuro-section--cream" id="calculator">
          <div className="neuro-container">
            <span className="neuro-label reveal">Cost Comparison</span>
            <h2 className="reveal">See Exactly How Much You&apos;d Save</h2>
            <div className="neuro-calc reveal">
              <div className="neuro-calc__header">
                <h3>Neurology Cost Savings Calculator</h3>
              </div>
              <div className="neuro-calc__body">
                <div className="neuro-calc__selects">
                  <div className="neuro-field">
                    <label htmlFor="calc-country">Your Country</label>
                    <select
                      id="calc-country"
                      value={calcCountry}
                      onChange={(e) =>
                        setCalcCountry(
                          e.target.value as typeof calcCountry
                        )
                      }
                    >
                      {COST_COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="neuro-field">
                    <label htmlFor="calc-procedure">Procedure</label>
                    <select
                      id="calc-procedure"
                      value={calcProcedure}
                      onChange={(e) =>
                        setCalcProcedure(e.target.value as CostProcedureKey)
                      }
                    >
                      {COST_PROCEDURES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="neuro-calc__compare">
                  <div className="neuro-calc__box neuro-calc__box--local">
                    <div className="neuro-calc__box-label">
                      Cost in {calc.countryLabel}
                    </div>
                    <div className="neuro-calc__amount">
                      ${calc.local.toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className="neuro-calc__save" aria-label={`Save ${calc.savingsPct} percent`}>
                    <strong>Save {calc.savingsPct}%</strong>
                    <span>→</span>
                  </div>
                  <div className="neuro-calc__box neuro-calc__box--india">
                    <div className="neuro-calc__box-label">Cost in India 🇮🇳</div>
                    <div className="neuro-calc__amount">
                      ${calc.india.toLocaleString("en-US")}
                    </div>
                  </div>
                </div>

                <p className="neuro-calc__disclaimer">
                  Figures are illustrative private-care averages in USD and may vary by
                  case complexity, hospital, and length of stay. Not a formal quote.
                </p>
                <button
                  type="button"
                  className="neuro-calc__cta"
                  onClick={scrollToForm}
                >
                  Get Your Exact Quote →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Process */}
        <section className="neuro-section neuro-section--navy" id="process">
          <div className="neuro-container">
            <div className="neuro-process-head">
              <span className="neuro-label">Your Medical Journey</span>
              <h2>From Search to Follow-up — We Handle Every Step</h2>
              <p className="neuro-process-lead">
                Follow the path below. One coordinator stays with you from your first
                message to recovery at home.
              </p>
            </div>

            <div className="neuro-journey">
              <div className="neuro-journey__phase">
                <p className="neuro-journey__phase-label">Phase 1 · Plan from home</p>
                <ol className="neuro-timeline">
                  {NEUROLOGY_STEPS.filter((s) => s.phase === "plan").map((step, i, arr) => (
                    <li key={step.step} className="neuro-timeline__item">
                      <div className="neuro-timeline__rail" aria-hidden="true">
                        <span className="neuro-timeline__dot">{step.step}</span>
                        {i < arr.length - 1 ? (
                          <span className="neuro-timeline__line" />
                        ) : null}
                      </div>
                      <div className="neuro-timeline__card">
                        <span className="neuro-timeline__icon" aria-hidden="true">
                          <ProcessIcon name={step.icon} />
                        </span>
                        <div className="neuro-timeline__copy">
                          <p className="neuro-timeline__step-label">
                            Step {step.step} of {NEUROLOGY_STEPS.length}
                          </p>
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="neuro-journey__phase">
                <p className="neuro-journey__phase-label">Phase 2 · Travel &amp; recover</p>
                <ol className="neuro-timeline">
                  {NEUROLOGY_STEPS.filter((s) => s.phase === "travel").map(
                    (step, i, arr) => (
                      <li key={step.step} className="neuro-timeline__item">
                        <div className="neuro-timeline__rail" aria-hidden="true">
                          <span className="neuro-timeline__dot">{step.step}</span>
                          {i < arr.length - 1 ? (
                            <span className="neuro-timeline__line" />
                          ) : null}
                        </div>
                        <div className="neuro-timeline__card">
                          <span className="neuro-timeline__icon" aria-hidden="true">
                            <ProcessIcon name={step.icon} />
                          </span>
                          <div className="neuro-timeline__copy">
                            <p className="neuro-timeline__step-label">
                              Step {step.step} of {NEUROLOGY_STEPS.length}
                            </p>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>

            <div className="neuro-journey__cta">
              <button
                type="button"
                className="neuro-btn neuro-btn--teal"
                onClick={scrollToForm}
              >
                Start with Step 1 — Get My Free Plan →
              </button>
            </div>
          </div>
        </section>

        {/* 8. Official hospital network (same as main page) */}
        <div className="neuro-hospitals-embed">
          <HospitalsSection />
        </div>

        {/* 9. Testimonials */}
        <section className="neuro-section neuro-section--white" id="testimonials">
          <div className="neuro-container">
            <span className="neuro-label reveal">Patient Stories</span>
            <h2 className="reveal">
              Patients Across Africa Who Found Hope in India
            </h2>
            <div className="neuro-testimonials-grid">
              {NEUROLOGY_TESTIMONIALS.map((t) => (
                <article key={t.name} className="neuro-testimonial reveal">
                  <div className="neuro-testimonial__quote-mark" aria-hidden="true">
                    “
                  </div>
                  <blockquote>{t.quote}</blockquote>
                  <div className="neuro-testimonial__author">
                    <div
                      className="neuro-testimonial__avatar"
                      style={{ background: t.avatarColor }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div className="neuro-testimonial__meta">
                      <strong>{t.name}</strong>
                      <span>
                        {t.flag} {t.location}
                      </span>
                    </div>
                  </div>
                  <div className="neuro-stars" aria-label={`${t.stars} out of 5 stars`}>
                    {"★".repeat(t.stars)}
                  </div>
                  <span className="neuro-testimonial__tag">{t.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="neuro-section neuro-section--cream" id="faq">
          <div className="neuro-container">
            <span className="neuro-label reveal">FAQ</span>
            <h2 className="reveal">Your Questions, Answered</h2>
            <div className="neuro-faq-list reveal">
              {NEUROLOGY_FAQ.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={item.question}
                    className={`neuro-faq-item${isOpen ? " open" : ""}`}
                  >
                    <button
                      type="button"
                      className="neuro-faq-btn"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span className="neuro-faq-icon" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div className="neuro-faq-panel">
                      <div className="neuro-faq-panel__inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. Final CTA */}
        <section className="neuro-final-cta" aria-labelledby="neuro-final-heading">
          <div className="neuro-container reveal">
            <h2 id="neuro-final-heading">
              Don&apos;t Let Distance Stop You From Getting the Best Care
            </h2>
            <p>
              Send us your reports today. Within 48 hours you&apos;ll have a hospital
              recommendation, specialist name, and full cost breakdown — completely
              free.
            </p>
            <div className="neuro-final-cta__actions">
              <button
                type="button"
                className="neuro-btn neuro-btn--teal"
                onClick={scrollToForm}
              >
                Get My Free Treatment Plan →
              </button>
              <a
                className="neuro-btn neuro-btn--whatsapp"
                href={waUrl(NEUROLOGY_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsApp("final_cta")}
              >
                <WhatsAppIcon />
                <span className="neuro-wa-label">Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 12. Footer */}
      <footer className="neuro-footer">
        <div className="neuro-container">
          <div className="neuro-footer__top">
            <div className="neuro-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="neuro-logo__img"
                src="/logos/new-logo.png"
                alt={NEUROLOGY_BRAND}
                width={140}
                height={32}
              />
            </div>
            <nav className="neuro-footer__links" aria-label="Footer">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
              <a href={`tel:+${WA_NUMBER.replace(/\D/g, "")}`}>Contact</a>
            </nav>
          </div>
          <div className="neuro-footer__bottom">
            <p className="neuro-footer__disclaimer">
              {NEUROLOGY_BRAND} is a medical travel coordination service and is not a
              hospital or clinic. Treatment outcomes vary. Cost figures on this page are
              illustrative estimates only. Always seek advice from a qualified physician
              for your individual medical condition.
            </p>
            <p className="neuro-footer__copy">
              © {new Date().getFullYear()} {NEUROLOGY_BRAND} · {NEUROLOGY_DOMAIN}
            </p>
          </div>
        </div>
      </footer>

      {/* 13. Floating WhatsApp */}
      <div className="neuro-float-wa">
        <span className="neuro-float-wa__ring" aria-hidden="true" />
        <a
          href={waUrl(NEUROLOGY_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp about neurology treatment in India"
          onClick={() => onWhatsApp("floating_button")}
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}

type LeadFormProps = {
  onWhatsApp: (source: string) => void;
};

function ProcessIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case "compare":
      return (
        <svg {...common}>
          <path d="M8 7h12M8 12h12M8 17h8" />
          <path d="M4 7h.01M4 12h.01M4 17h.01" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V5" />
          <path d="M8 9l4-4 4 4" />
          <path d="M5 19h14" />
        </svg>
      );
    case "opinion":
      return (
        <svg {...common}>
          <path d="M21 12a8.5 8.5 0 01-12.4 7.5L3 21l1.6-4.2A8.5 8.5 0 1121 12z" />
        </svg>
      );
    case "quote":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "travel":
      return (
        <svg {...common}>
          <path d="M10 20l-1-6-5-2 1-2 5 1 3-6 2 1-2 6 5 3-1 2-5-1-2 4z" />
        </svg>
      );
    case "treatment":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      );
    case "followup":
      return (
        <svg {...common}>
          <path d="M8 12l3 3 5-6" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    default:
      return null;
  }
}

function ConditionImage({
  src,
  emoji,
  alt,
}: {
  src?: string;
  emoji: string;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="neuro-card__media" aria-hidden="true">
        <span className="neuro-card__emoji">{emoji}</span>
      </div>
    );
  }

  return (
    <div className="neuro-card__media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function LeadForm({ onWhatsApp }: LeadFormProps) {
  const formId = useId();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const condition = String(data.get("condition") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Full name is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Valid email is required";
    }
    if (!country) nextErrors.country = "Please select your country";
    if (!whatsapp) nextErrors.whatsapp = "WhatsApp number is required";
    if (!condition) nextErrors.condition = "Please select a condition";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);

    const countryLabel =
      AFRICAN_COUNTRIES.find((c) => c.value === country)?.label ?? country;
    const conditionLabel =
      NEURO_CONDITIONS.find((c) => c.value === condition)?.label ?? condition;
    const utm = getUtmParamsFromUrl();

    try {
      let recaptchaToken: string | undefined;
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        if (!executeRecaptcha) {
          throw new Error("Security verification is loading. Please try again.");
        }
        recaptchaToken = await executeRecaptcha("neurology_submit");
      }

      await submitAfricaLeadEmail({
        name,
        email,
        whatsapp,
        country: countryLabel,
        treatment: `Neurology: ${conditionLabel}`,
        message: details
          ? `[Neurology LP]\nCondition: ${conditionLabel}\n\n${details}`
          : `[Neurology LP]\nCondition: ${conditionLabel}`,
        ...utm,
        ...(recaptchaToken && { recaptchaToken }),
      });

      // GTM lead event, then thank-you — Ads conversion fires on /neuro-care/thank-you
      await trackNeurologyLeadSubmitAndWait(undefined, {
        source: "neurology_hero_form",
        page: "/neuro-care",
      });
      redirectToNeurologyThankYou();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your request. Please try again or use WhatsApp."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="neuro-form-card">
      <div className="neuro-form-card__header">
        <h3>Get Your Free Neurology Treatment Plan</h3>
        <p>Personalised plan within 24 hours · 100% Confidential</p>
        <span className="neuro-urgency">⏱ 47 patients got plans this week</span>
      </div>
      <form className="neuro-form-card__body" onSubmit={handleSubmit} noValidate>
        <div className={`neuro-field${fieldErrors.name ? " neuro-field--error" : ""}`}>
          <label htmlFor={`${formId}-name`}>Full Name</label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            required
          />
          {fieldErrors.name ? (
            <div className="neuro-field__error">{fieldErrors.name}</div>
          ) : null}
        </div>

        <div className={`neuro-field${fieldErrors.email ? " neuro-field--error" : ""}`}>
          <label htmlFor={`${formId}-email`}>Email</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            required
          />
          {fieldErrors.email ? (
            <div className="neuro-field__error">{fieldErrors.email}</div>
          ) : null}
        </div>

        <div
          className={`neuro-field${fieldErrors.country ? " neuro-field--error" : ""}`}
        >
          <label htmlFor={`${formId}-country`}>Country</label>
          <select id={`${formId}-country`} name="country" required defaultValue="">
            <option value="" disabled>
              Select your country
            </option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {fieldErrors.country ? (
            <div className="neuro-field__error">{fieldErrors.country}</div>
          ) : null}
        </div>

        <div
          className={`neuro-field${fieldErrors.whatsapp ? " neuro-field--error" : ""}`}
        >
          <label htmlFor={`${formId}-whatsapp`}>WhatsApp Number</label>
          <input
            id={`${formId}-whatsapp`}
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            required
          />
          {fieldErrors.whatsapp ? (
            <div className="neuro-field__error">{fieldErrors.whatsapp}</div>
          ) : null}
        </div>

        <div
          className={`neuro-field${fieldErrors.condition ? " neuro-field--error" : ""}`}
        >
          <label htmlFor={`${formId}-condition`}>Neurological Condition</label>
          <select
            id={`${formId}-condition`}
            name="condition"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select condition
            </option>
            {NEURO_CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {fieldErrors.condition ? (
            <div className="neuro-field__error">{fieldErrors.condition}</div>
          ) : null}
        </div>

        <div className="neuro-field">
          <label htmlFor={`${formId}-details`}>Briefly describe</label>
          <textarea
            id={`${formId}-details`}
            name="details"
            rows={3}
            placeholder="Symptoms, diagnosis, or reports you can share…"
          />
        </div>

        {error ? (
          <p className="neuro-field__error" style={{ marginBottom: 12 }}>
            {error}
          </p>
        ) : null}

        <button type="submit" className="neuro-submit" disabled={submitting}>
          {submitting ? "Sending…" : "Get My Free Treatment Plan →"}
        </button>
        <p className="neuro-form-note">
          🔒 Your data is 100% confidential. We email your plan request to our medical
          team and never share patient information.
        </p>
        <a
          className="neuro-btn neuro-btn--whatsapp"
          href={waUrl(NEUROLOGY_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onWhatsApp("hero_form_side")}
          style={{ width: "100%", marginTop: 12, padding: "12px 16px" }}
        >
          <WhatsAppIcon />
          <span className="neuro-wa-label">Or chat on WhatsApp</span>
        </a>
      </form>
    </div>
  );
}
