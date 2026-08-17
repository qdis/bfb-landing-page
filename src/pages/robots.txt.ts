// ABOUTME: Serves robots.txt that points at the generated sitemap.
// ABOUTME: Allows public crawlers on the coming-soon pages.

import type { APIRoute } from "astro";
import { generateRobots } from "../lib/robots";
import { siteUrl } from "../lib/site";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  return new Response(generateRobots(siteUrl(site)), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
};
