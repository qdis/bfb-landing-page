// ABOUTME: Tests sitemap, llms.txt, and robots generation from the shared URL list.
// ABOUTME: Asserts structure and page membership without hardcoding output blobs.

import { describe, expect, it } from "vitest";
import { SITE_NAME, publicPages } from "../src/lib/copy";
import { generateLlmsTxt } from "../src/lib/llms";
import { generateRobots } from "../src/lib/robots";
import { generateSitemap } from "../src/lib/sitemap";
import { absoluteUrl } from "../src/lib/site";

const origin = "https://seo.test";

describe("generateSitemap", () => {
  it("lists every public page URL from the shared page list", () => {
    const xml = generateSitemap(origin);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain("<urlset");
    for (const page of publicPages()) {
      expect(xml).toContain(`<loc>${absoluteUrl(page.path, origin)}</loc>`);
    }
  });
});

describe("generateLlmsTxt", () => {
  it("matches the llmstxt.org shape and links public pages", () => {
    const txt = generateLlmsTxt(origin);
    const lines = txt.split("\n");
    expect(lines[0]).toBe(`# ${SITE_NAME}`);
    const quote = lines.find((line) => line.startsWith("> "));
    expect(quote).toBeTruthy();
    expect(txt).toContain("## Pages");
    for (const page of publicPages()) {
      expect(txt).toContain(`[${page.title}](${absoluteUrl(page.path, origin)})`);
    }
  });
});

describe("generateRobots", () => {
  it("allows crawlers and points at the sitemap URL", () => {
    const robots = generateRobots(origin);
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${absoluteUrl("/sitemap.xml", origin)}`);
  });
});
