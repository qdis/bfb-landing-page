// ABOUTME: Persists valid waitlist emails and builds the signup HTTP result.
// ABOUTME: Storage is injected so tests and the Worker share the same handler.

import { COPY } from "./copy";
import { isValidEmail, normalizeEmail } from "./email";

export type EmailStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

export type SignupResult = {
  status: number;
  body: {
    ok: boolean;
    created?: boolean;
    error?: string;
  };
};

export function signupKey(email: string): string {
  return `signup:${email}`;
}

export async function persistSignup(
  store: EmailStore,
  email: string,
): Promise<{ created: boolean; record: string }> {
  const key = signupKey(email);
  const existing = await store.get(key);
  if (existing) {
    return { created: false, record: existing };
  }
  const record = JSON.stringify({ email, createdAt: new Date().toISOString() });
  await store.put(key, record);
  return { created: true, record };
}

export async function handleSignupRequest(
  store: EmailStore,
  rawEmail: unknown,
): Promise<SignupResult> {
  if (typeof rawEmail !== "string" || rawEmail.trim() === "") {
    return { status: 400, body: { ok: false, error: COPY.signup.missing } };
  }
  if (!isValidEmail(rawEmail)) {
    return { status: 400, body: { ok: false, error: COPY.signup.invalid } };
  }
  const email = normalizeEmail(rawEmail);
  const persisted = await persistSignup(store, email);
  return {
    status: 200,
    body: { ok: true, created: persisted.created },
  };
}

export function mapStore(initial: Iterable<[string, string]> = []): EmailStore {
  const data = new Map(initial);
  return {
    async get(key) {
      return data.get(key) ?? null;
    },
    async put(key, value) {
      data.set(key, value);
    },
  };
}

const memory = new Map<string, string>();

export function memoryStore(): EmailStore {
  return {
    async get(key) {
      return memory.get(key) ?? null;
    },
    async put(key, value) {
      memory.set(key, value);
    },
  };
}

export function d1Store(db: D1Database): EmailStore {
  return {
    async get(key) {
      const email = key.startsWith("signup:") ? key.slice("signup:".length) : key;
      const row = await db
        .prepare("SELECT email, created_at FROM signups WHERE email = ?1")
        .bind(email)
        .first<{ email: string; created_at: string }>();
      if (!row) {
        return null;
      }
      return JSON.stringify({ email: row.email, createdAt: row.created_at });
    },
    async put(_key, value) {
      const parsed = JSON.parse(value) as { email: string; createdAt: string };
      await db
        .prepare(
          "INSERT INTO signups (email, created_at) VALUES (?1, ?2) ON CONFLICT(email) DO NOTHING",
        )
        .bind(parsed.email, parsed.createdAt)
        .run();
    },
  };
}

export function createSignupStore(env?: { DB?: D1Database }): EmailStore {
  if (env?.DB) {
    return d1Store(env.DB);
  }
  return memoryStore();
}
