/** Major AI crawlers and assistants — explicitly allowed to index and cite our content. */
export const AI_BOT_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Googlebot",
  "Applebot-Extended",
  "cohere-ai",
  "Bytespider",
  "CCBot",
  "FacebookBot",
  "meta-externalagent",
  "Diffbot",
  "YouBot",
  "Amazonbot",
  "DuckAssistBot",
  "AI2Bot",
  "TimpiBot",
] as const;

export const AI_CONTENT_PATHS = ["/llms.txt", "/llms-full.txt", "/ai.txt"] as const;

export const AI_DISALLOW_PATHS = ["/api/", "/thank-you"] as const;

export function aiTextFileHeaders(): HeadersInit {
  return {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
    "X-Robots-Tag": "all",
  };
}
