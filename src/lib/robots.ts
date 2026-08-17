// ABOUTME: Builds robots.txt that points crawlers at the generated sitemap.
// ABOUTME: Origin comes from the same site helper used by sitemap and llms.txt.

import { absoluteUrl } from "./site";

export function generateRobots(origin: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml", origin)}
`;
}
