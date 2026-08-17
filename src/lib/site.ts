// ABOUTME: Resolves the public site origin used by canonical, sitemap, and llms.txt.
// ABOUTME: Prefers Astro's configured site, then falls back to the product default.

import { SITE_DEFAULT_URL } from "./copy";

export function siteUrl(site?: URL | string | undefined): string {
  const raw = site ? String(site) : SITE_DEFAULT_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string, site?: URL | string | undefined): string {
  const origin = siteUrl(site);
  if (path === "/") {
    return `${origin}/`;
  }
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
