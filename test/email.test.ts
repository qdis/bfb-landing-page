// ABOUTME: Tests the shipped email validator on valid and invalid addresses.
// ABOUTME: Calls isValidEmail and normalizeEmail directly.

import { describe, expect, it } from "vitest";
import {
  isValidEmail,
  normalizeEmail,
  notifyMail,
  sendSignupEmails,
  shouldSendWaitlistEmail,
  welcomeMail,
} from "../src/lib/email";

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

describe("waitlist mail", () => {
  it("skips reserved example addresses", () => {
    expect(shouldSendWaitlistEmail("launch@example.com")).toBe(false);
    expect(shouldSendWaitlistEmail("timo@devplant.ro")).toBe(true);
  });

  it("builds a confirmation and an operator note", () => {
    const welcome = welcomeMail("seat@devplant.io");
    expect(welcome.to).toBe("seat@devplant.io");
    expect(welcome.from.email).toBe("waitlist@bfb.sh");
    expect(welcome.subject).toContain("Seat saved");
    expect(welcome.text).toContain("No drip");
    expect(welcome.html).toContain("No drip");
    const note = notifyMail("seat@devplant.io", "timo@devplant.ro");
    expect(note.to).toBe("timo@devplant.ro");
    expect(note.subject).toContain("seat@devplant.io");
    expect(note.text).toContain("seat@devplant.io");
  });

  it("sends both messages for a real address and none for example.com", async () => {
    const sent: string[] = [];
    const sender = {
      async send(message: { to: string }) {
        sent.push(message.to);
      },
    };
    const live = await sendSignupEmails({
      sender,
      email: "  Seat@Devplant.io ",
      notifyTo: "timo@devplant.ro",
    });
    expect(live).toEqual({ welcome: true, notify: true });
    expect(sent).toEqual(["seat@devplant.io", "timo@devplant.ro"]);
    sent.length = 0;
    const skipped = await sendSignupEmails({
      sender,
      email: "launch@example.com",
      notifyTo: "timo@devplant.ro",
    });
    expect(skipped).toEqual({ welcome: false, notify: false });
    expect(sent).toEqual([]);
  });
});
