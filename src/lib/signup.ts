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

export function kvStore(kv: {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}): EmailStore {
  return {
    get: (key) => kv.get(key),
    put: (key, value) => kv.put(key, value),
  };
}

export function createSignupStore(env?: {
  SIGNUPS?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  };
}): EmailStore {
  if (env?.SIGNUPS) {
    return kvStore(env.SIGNUPS);
  }
  return memoryStore();
}
