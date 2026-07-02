export interface YoutubePatientTestimonial {
  id: string;
  /** Optional start offset in seconds (e.g. linked timestamp) */
  startSeconds?: number;
}

export const YOUTUBE_PATIENT_TESTIMONIALS: YoutubePatientTestimonial[] = [
  { id: "-MDocA3r87E" },
  { id: "TejDdo7mNAE", startSeconds: 3 },
  { id: "XLfVDUSjKTY" },
  { id: "-FL_m2Ypqrg" },
  { id: "DH3tD8LkZSc" },
  { id: "7_z2tRpPEmw" },
];

export function getYoutubeEmbedUrl(video: YoutubePatientTestimonial): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (video.startSeconds && video.startSeconds > 0) {
    params.set("start", String(video.startSeconds));
  }
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`;
}

export function getYoutubeWatchUrl(video: YoutubePatientTestimonial): string {
  const url = new URL(`https://www.youtube.com/watch?v=${video.id}`);
  if (video.startSeconds && video.startSeconds > 0) {
    url.searchParams.set("t", `${video.startSeconds}s`);
  }
  return url.toString();
}
