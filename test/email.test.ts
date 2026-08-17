// ABOUTME: Tests the shipped email validator on valid and invalid addresses.
// ABOUTME: Calls isValidEmail and normalizeEmail directly.

import { describe, expect, it } from "vitest";
import { isValidEmail, normalizeEmail } from "../src/lib/email";

describe("isValidEmail", () => {
  it("accepts ordinary addresses", () => {
    expect(isValidEmail("timo@example.com")).toBe(true);
    expect(isValidEmail("  Timo.Bejan+bfb@devplant.io ")).toBe(true);
  });

  it("rejects empty, local-only, and malformed values", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("foo@")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("foo@localhost")).toBe(false);
    expect(isValidEmail("spaces emma@example.com")).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("trims and lowercases before storage", () => {
    expect(normalizeEmail("  Timo@Example.COM ")).toBe("timo@example.com");
  });
});
