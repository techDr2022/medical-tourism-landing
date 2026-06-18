import { aiTextFileHeaders } from "@/lib/ai-bots";
import { generateLlmsFullTxt } from "@/lib/llms";

/** Extended GEO documentation with full FAQ answers for AI answer engines */
export function GET() {
  return new Response(generateLlmsFullTxt(), {
    headers: aiTextFileHeaders(),
  });
}
