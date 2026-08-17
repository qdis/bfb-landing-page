// ABOUTME: Builds sitemap.xml from the shared public URL list.
// ABOUTME: Tests and the /sitemap.xml route both call this function.

import { publicPages } from "./copy";
import { absoluteUrl } from "./site";

export function generateSitemap(origin: string): string {
  const urls = publicPages()
    .map((page) => {
      const loc = absoluteUrl(page.path, origin);
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
