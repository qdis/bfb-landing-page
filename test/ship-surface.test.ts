// ABOUTME: Asserts the shipped hero, tokens, header, close, and demo card.
// ABOUTME: Reads the real source files so a broken surface cannot hide.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { COPY } from "../src/lib/copy";

const root = resolve(import.meta.dirname, "..");

function read(path: string): string {
  return readFileSync(resolve(root, path), "utf8");
}

describe("ship surface", () => {
  it("slashes the death lines and keeps them readable under reduced motion", () => {
    const hero = read("src/components/Hero.astro");
    expect(hero).toContain("line1");
    expect(hero).toContain("line2");
    expect(COPY.hero.line1).toContain("JIRA IS DEAD");
    expect(COPY.hero.line2).toContain("SCRUM IS DEAD");
    expect(hero).toContain("data-slash");
    expect(hero).toContain("blade");
    expect(hero).toContain("class=\"line\"");
    expect(hero).toContain("prefers-reduced-motion");
    expect(hero).toContain("cut-done");
    expect(hero).not.toContain("half top");
  });

  it("has no header signup control", () => {
    const nav = read("src/components/SiteNav.astro");
    expect(nav.toLowerCase()).not.toContain("#signup");
    expect(nav).not.toMatch(/Get BFB/i);
    expect(nav).not.toContain("class=\"cta\"");
  });

  it("closes on get on the BIG FAT BOARD", () => {
    expect(COPY.close.headline).toBe("get on the BIG FAT BOARD");
    expect(read("src/components/Close.astro")).toContain("COPY.close.headline");
  });

  it("darkens the canvas and raises the neon accent", () => {
    const base = read("src/layouts/Base.astro");
    const blackout = base.match(/--blackout:\s*oklch\(([\d.]+)/);
    const crimson = base.match(/--crimson:\s*oklch\(([\d.]+)\s+([\d.]+)/);
    expect(blackout?.[1]).toBeTruthy();
    expect(crimson?.[1]).toBeTruthy();
    expect(Number(blackout?.[1])).toBeLessThan(0.08);
    expect(Number(crimson?.[1])).toBeGreaterThan(0.42);
    expect(Number(crimson?.[2])).toBeGreaterThan(0.155);
  });

  it("cards the demo as a smaller embedded preview", () => {
    const demo = read("src/components/Demo.astro");
    expect(demo).toContain("preview");
    expect(demo).toContain("72rem");
    expect(demo).toContain("Embedded preview");
  });

  it("ships a surreal still on the page", () => {
    const solves = read("src/components/Solves.astro");
    expect(solves).toContain("/images/chair-outlet.jpg");
    expect(solves).toContain("<img");
  });

  it("points the Worker and SEO origin at bfb.sh", () => {
    expect(read("astro.config.mjs")).toContain('site: "https://bfb.sh"');
    expect(read("wrangler.jsonc")).toContain('"pattern": "bfb.sh"');
    expect(read("wrangler.jsonc")).toContain('"database_name": "bfb-signups"');
    expect(read("wrangler.jsonc")).toContain('"name": "EMAIL"');
  });

  it("injects Cloudflare Web Analytics", () => {
    const base = read("src/layouts/Base.astro");
    expect(base).toContain("static.cloudflareinsights.com/beacon.min.js");
    expect(base).toContain("WEB_ANALYTICS_TOKEN");
  });
});
