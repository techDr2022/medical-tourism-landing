# Medical Travel to India

Premium landing page for medical travel coordination services. Built with Next.js 14 (App Router) and Material UI.

## Tech Stack

- Next.js 14 (App Router)
- Material UI (MUI) v6
- TypeScript

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/        # Header, Footer, MobileStickyCta, AuroraBackground
│   ├── sections/      # Page sections (Hero, Hospitals, etc.)
│   └── ui/            # Reusable UI (GlassCard, SectionContainer)
├── constants/
│   └── index.ts       # HOSPITALS, PROCESS_STEPS
└── theme/
    ├── theme.ts       # MUI theme (dark, cyan/indigo accents)
    └── ThemeRegistry.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Email Configuration (Resend)

The contact form sends emails to `info@techdr.in` via [Resend](https://resend.com). To enable email:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get a Resend API key from [Resend API Keys](https://resend.com/api-keys) and add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   RESEND_FROM=Medical Travel <noreply@yourdomain.com>
   ```

3. **From address:** `RESEND_FROM` must use a domain you've verified in the [Resend Dashboard](https://resend.com/domains). You can use a display name, e.g. `"Medical Travel <noreply@yourdomain.com>"`.

**Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## reCAPTCHA v3 (optional)

To reduce fake form submissions, add Google reCAPTCHA v3:

1. Create a reCAPTCHA v3 site at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin).
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```
3. If these are not set, the form still works; the API simply skips captcha verification.
