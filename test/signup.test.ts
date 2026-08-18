// ABOUTME: Tests the shipped signup handler against an injected store.
// ABOUTME: Valid addresses persist; invalid addresses are rejected with 4xx.

import { describe, expect, it } from "vitest";
import { COPY } from "../src/lib/copy";
import {
  createSignupStore,
  d1Store,
  handleSignupRequest,
  mapStore,
  persistSignup,
  signupKey,
} from "../src/lib/signup";

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

function mockD1() {
  const rows = new Map<string, { email: string; created_at: string }>();
  return {
    prepare(sql: string) {
      return {
        bind(...params: string[]) {
          return {
            async first() {
              if (sql.includes("SELECT")) {
                return rows.get(params[0]) ?? null;
              }
              return null;
            },
            async run() {
              if (sql.includes("INSERT")) {
                const [email, created_at] = params;
                if (rows.has(email)) {
                  return { meta: { changes: 0 } };
                }
                rows.set(email, { email, created_at });
                return { meta: { changes: 1 } };
              }
              return { meta: { changes: 0 } };
            },
          };
        },
      };
    },
  } as unknown as D1Database;
}

describe("d1Store", () => {
  it("writes a waitlist row and treats a second insert as already stored", async () => {
    const store = d1Store(mockD1());
    const first = await persistSignup(store, "seat@devplant.io");
    const again = await persistSignup(store, "seat@devplant.io");
    expect(first.created).toBe(true);
    expect(again.created).toBe(false);
    const record = JSON.parse((await store.get(signupKey("seat@devplant.io"))) ?? "{}") as {
      email?: string;
    };
    expect(record.email).toBe("seat@devplant.io");
  });

  it("prefers D1 when the Worker binding is present", async () => {
    const store = createSignupStore({ DB: mockD1() });
    const result = await handleSignupRequest(store, "board@devplant.io");
    expect(result.body.created).toBe(true);
    expect(await store.get(signupKey("board@devplant.io"))).toContain("board@devplant.io");
  });
});
