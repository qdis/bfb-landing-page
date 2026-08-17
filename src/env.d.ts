// ABOUTME: Ambient types for Astro and the Worker SIGNUPS KV binding.
// ABOUTME: Signup reads env.SIGNUPS from cloudflare:workers, not locals.runtime.

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Env {
  SIGNUPS: KVNamespace;
}
