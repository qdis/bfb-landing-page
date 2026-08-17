// ABOUTME: Tests the shipped signup handler against an injected store.
// ABOUTME: Valid addresses persist; invalid addresses are rejected with 4xx.

import { describe, expect, it } from "vitest";
import { COPY } from "../src/lib/copy";
import { handleSignupRequest, mapStore, signupKey } from "../src/lib/signup";

describe("handleSignupRequest", () => {
  it("persists a valid email and returns success", async () => {
    const store = mapStore();
    const result = await handleSignupRequest(store, "  Timo@Example.com ");
    expect(result.status).toBe(200);
    expect(result.body.ok).toBe(true);
    expect(result.body.created).toBe(true);
    const record = await store.get(signupKey("timo@example.com"));
    expect(record).toBeTruthy();
    const parsed = JSON.parse(record ?? "{}") as { email?: string };
    expect(parsed.email).toBe("timo@example.com");
  });

  it("rejects an invalid email without writing a record", async () => {
    const store = mapStore();
    const result = await handleSignupRequest(store, "not-an-email");
    expect(result.status).toBe(400);
    expect(result.body.ok).toBe(false);
    expect(result.body.error).toBe(COPY.signup.invalid);
    expect(await store.get(signupKey("not-an-email"))).toBeNull();
  });

  it("rejects a missing email", async () => {
    const store = mapStore();
    const result = await handleSignupRequest(store, "");
    expect(result.status).toBe(400);
    expect(result.body.error).toBe(COPY.signup.missing);
  });

  it("treats a second submit of the same address as already stored", async () => {
    const store = mapStore();
    await handleSignupRequest(store, "seat@example.com");
    const again = await handleSignupRequest(store, "seat@example.com");
    expect(again.status).toBe(200);
    expect(again.body.created).toBe(false);
  });
});
