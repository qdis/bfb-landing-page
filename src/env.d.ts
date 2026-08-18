// ABOUTME: Ambient types for Astro and the Worker D1 plus email bindings.
// ABOUTME: Signup reads env.DB and env.EMAIL from cloudflare:workers.

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  EMAIL: SendEmail;
  NOTIFY_EMAIL: string;
  FROM_EMAIL: string;
}
