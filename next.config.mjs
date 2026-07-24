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
  async redirects() {
    return [
      {
        source: "/neurology",
        destination: "/neuro-care",
        permanent: true,
      },
      {
        source: "/neurology/thank-you",
        destination: "/neuro-care/thank-you",
        permanent: true,
      },
      {
        source: "/neurology/:path*",
        destination: "/neuro-care/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
