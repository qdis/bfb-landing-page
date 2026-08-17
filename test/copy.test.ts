// ABOUTME: Tests that shipped landing copy contains every required claim phrase.
// ABOUTME: Asserts a single public page instead of a variant inventory.

import { describe, expect, it } from "vitest";
import {
  COPY,
  REQUIRED_PHRASES,
  missingRequiredPhrases,
  publicPagePaths,
  visibleCopyText,
} from "../src/lib/copy";

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

  it("publishes only the home page", () => {
    expect(publicPagePaths()).toEqual(["/"]);
  });

  it("names the ticket machines in the shared copy", () => {
    const text = visibleCopyText();
    for (const name of COPY.solves.names) {
      expect(text).toContain(name);
    }
  });

  it("does not market GitHub or forking", () => {
    const text = visibleCopyText().toLowerCase();
    expect(text).not.toContain("github");
    expect(text).not.toContain("fork");
    expect(text).not.toContain("view source");
  });
});
