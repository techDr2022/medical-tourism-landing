/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/africa-contact": [
        "./public/services/medical-tourism-india-brochure.pdf",
      ],
      "/api/contact": ["./public/services/medical-tourism-india-brochure.pdf"],
    },
  },
  /**
   * Serve /neurology as an alias (HTTP 200) — do not 308-redirect.
   * Google Ads destination checkers fail or flag Final URLs / sitelinks that redirect.
   * Canonical in page metadata remains /neuro-care.
   */
  async rewrites() {
    return [
      { source: "/neurology", destination: "/neuro-care" },
      { source: "/neurology/thank-you", destination: "/neuro-care/thank-you" },
    ];
  },
};

export default nextConfig;
