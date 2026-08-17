// ABOUTME: Serves /llms.txt in the llmstxt.org markdown shape.
// ABOUTME: H1, blockquote, then the public page list from the shared source.

import type { APIRoute } from "astro";
import { generateLlmsTxt } from "../lib/llms";
import { siteUrl } from "../lib/site";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  return new Response(generateLlmsTxt(siteUrl(site)), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
};
