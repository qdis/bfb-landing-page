// ABOUTME: Tests that shipped landing copy contains every required claim phrase.
// ABOUTME: Asserts a single public page instead of a variant inventory.

import { describe, expect, it } from "vitest";
import {
  COPY,
  REQUIRED_PHRASES,
  SITE_DEFAULT_URL,
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

  it("publishes only the home page on bfb.sh", () => {
    expect(publicPagePaths()).toEqual(["/"]);
    expect(SITE_DEFAULT_URL).toBe("https://bfb.sh");
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

  it("keeps the death lines and the close shout in shipped copy", () => {
    const text = visibleCopyText();
    expect(text).toContain("JIRA IS DEAD");
    expect(text).toContain("SCRUM IS DEAD");
    expect(text).toContain("get on the BIG FAT BOARD");
    expect(text).toContain("BFB = BIG FAT BOARD");
    expect(text).toContain("AI-FIRST COMPANIES NEED BIG FAT BOARD");
    expect(text).toContain("You may sit.");
    expect(text).toContain("Enrolled devices run Claude Code, Codex, or Grok.");
    expect(text).not.toContain("Enrolled Macs");
    expect(text).toContain("5 projects. 10 live tasks. 50 agents.");
    expect(text).toContain("It is for builders of the future.");
    expect(text).not.toContain("cannot see the work");
  });

  it("does not give the masthead a signup label", () => {
    expect("cta" in COPY.nav).toBe(false);
  });
});
