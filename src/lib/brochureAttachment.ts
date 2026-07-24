import { readFile } from "fs/promises";
import path from "path";

export const BROCHURE_FILENAME = "medical-tourism-india-brochure.pdf";
export const BROCHURE_PUBLIC_PATH = `/services/${BROCHURE_FILENAME}`;

export type ResendAttachment = {
  filename: string;
  content: Buffer;
};

async function readBrochureFromDisk(): Promise<Buffer | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "services",
      BROCHURE_FILENAME
    );
    return await readFile(filePath);
  } catch {
    return null;
  }
}

/** Fallback for hosts where public/ is not in the serverless filesystem. */
async function fetchBrochureFromPublicUrl(): Promise<Buffer | null> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (!base) return null;

  const origin = base.startsWith("http") ? base : `https://${base}`;
  try {
    const res = await fetch(`${origin}${BROCHURE_PUBLIC_PATH}`);
    if (!res.ok) return null;
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  }
}

/** Load the India medical tourism brochure for Resend email attachments. */
export async function getBrochureAttachment(): Promise<ResendAttachment | null> {
  const content =
    (await readBrochureFromDisk()) ?? (await fetchBrochureFromPublicUrl());

  if (!content) {
    console.error("Failed to load brochure PDF for email attachment");
    return null;
  }

  return {
    filename: BROCHURE_FILENAME,
    content,
  };
}
