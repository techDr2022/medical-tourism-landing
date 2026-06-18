import { aiTextFileHeaders } from "@/lib/ai-bots";
import { generateLlmsFullTxt } from "@/lib/llms";

export function GET() {
  return new Response(generateLlmsFullTxt(), {
    headers: aiTextFileHeaders(),
  });
}
