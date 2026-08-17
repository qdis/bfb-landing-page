// ABOUTME: Serves sitemap.xml generated from the shared public URL list.
// ABOUTME: Uses the configured Astro site origin so canonicals stay aligned.

import type { APIRoute } from "astro";
import { generateSitemap } from "../lib/sitemap";
import { siteUrl } from "../lib/site";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  return new Response(generateSitemap(siteUrl(site)), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
};
