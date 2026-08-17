// ABOUTME: Worker route that accepts waitlist emails and persists valid ones.
// ABOUTME: JSON and form posts both go through the shared signup handler.

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
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
  const result = await handleSignupRequest(createSignupStore(env), await readEmail(request));
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};
