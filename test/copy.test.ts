// ABOUTME: Tests that shipped landing copy contains every required claim phrase.
// ABOUTME: Also checks the five variants are distinct in layout, type, and color.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  COPY,
  REQUIRED_PHRASES,
  VARIANTS,
  missingRequiredPhrases,
  publicPagePaths,
  visibleCopyText,
} from "../src/lib/copy";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("landing copy", () => {
  it("exposes every required phrase through the shipped copy module", () => {
    const missing = missingRequiredPhrases(visibleCopyText());
    expect(missing).toEqual([]);
  });

  it("keeps required phrases as the source of the visible claim strings", () => {
    for (const phrase of REQUIRED_PHRASES) {
      const found = Object.values(COPY.claims)
        .concat(COPY.comingSoon, COPY.description)
        .some((value) => value.toLowerCase().includes(phrase.toLowerCase()));
      expect(found, phrase).toBe(true);
    }
  });

  it("lists home plus one path per variant", () => {
    const paths = publicPagePaths();
    expect(paths[0]).toBe("/");
    expect(paths.slice(1)).toEqual(VARIANTS.map((variant) => variant.path));
  });
});

describe("variant inventory", () => {
  it("ships distinct visual strategies for every variant", () => {
    expect(VARIANTS.length).toBeGreaterThanOrEqual(12);
    expect(new Set(VARIANTS.map((variant) => variant.slug)).size).toBe(VARIANTS.length);
    expect(new Set(VARIANTS.map((variant) => variant.layout)).size).toBe(VARIANTS.length);
    expect(new Set(VARIANTS.map((variant) => variant.type)).size).toBe(VARIANTS.length);
    expect(new Set(VARIANTS.map((variant) => variant.color)).size).toBe(VARIANTS.length);
  });

  it("names the ticket machines in the shared copy", () => {
    const text = visibleCopyText();
    for (const name of COPY.rivals.names) {
      expect(text).toContain(name);
    }
  });

  it("renders each variant from the shared copy module", () => {
    const rootSource = readFileSync(join(root, "src/components/VariantRoot.astro"), "utf8");
    expect(rootSource).toContain('from "../lib/copy"');
    for (const variant of VARIANTS) {
      const source = readFileSync(
        join(root, `src/variants/${capitalize(variant.slug)}.astro`),
        "utf8",
      );
      expect(source).toContain("copy.comingSoon");
      expect(source).toContain("copy.claims");
      expect(source).toContain("<SignupForm");
    }
  });
});

function capitalize(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
