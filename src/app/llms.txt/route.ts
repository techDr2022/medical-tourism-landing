import { aiTextFileHeaders } from "@/lib/ai-bots";
import { generateLlmsTxt } from "@/lib/llms";

export function GET() {
  return new Response(generateLlmsTxt(), {
    headers: aiTextFileHeaders(),
  });
}
