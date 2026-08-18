// ABOUTME: Worker route that accepts waitlist emails and persists valid ones.
// ABOUTME: New seats go to D1, then a confirmation and an operator note go out.

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import {
  DEFAULT_FROM_EMAIL,
  DEFAULT_NOTIFY_EMAIL,
  normalizeEmail,
  sendSignupEmails,
} from "../../lib/email";
import { createSignupStore, handleSignupRequest } from "../../lib/signup";

export const prerender = false;

async function readEmail(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { email?: unknown };
    return body.email;
  }
  const form = await request.formData();
  return form.get("email");
}

export const POST: APIRoute = async ({ request }) => {
  const raw = await readEmail(request);
  const result = await handleSignupRequest(createSignupStore(env), raw);
  if (result.body.ok && result.body.created && env.EMAIL) {
    await sendSignupEmails({
      sender: env.EMAIL,
      email: normalizeEmail(String(raw)),
      notifyTo: env.NOTIFY_EMAIL ?? DEFAULT_NOTIFY_EMAIL,
      fromEmail: env.FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
    });
  }
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};
