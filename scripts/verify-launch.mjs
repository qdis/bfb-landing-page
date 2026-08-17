#!/usr/bin/env node
// ABOUTME: Hits the live Worker and asserts copy, SEO files, and signup behavior.
// ABOUTME: Used for launch proofs; writes a log to stdout.

const base = process.argv[2] ?? "http://127.0.0.1:8787";

const phrases = [
  "Coming soon",
  "Traditional team management software is dead",
  "Jira is dead",
  "first AI-native board for agents and humans to collaborate",
  "integrated time tracking",
  "start agents remotely on your machine",
  "Grok, Codex, and Claude Code talk to each other to solve problems together",
];

const pages = ["/"];

async function read(path, init) {
  const url = new URL(path, base);
  const response = await fetch(url, init);
  const text = await response.text();
  return {
    url: url.href,
    status: response.status,
    text,
    contentType: response.headers.get("content-type"),
  };
}

function requirePhrases(label, text) {
  const missing = phrases.filter((phrase) => !text.toLowerCase().includes(phrase.toLowerCase()));
  if (missing.length > 0) {
    throw new Error(`${label} missing phrases: ${missing.join(" | ")}`);
  }
}

const stamp = new Date().toISOString();
console.log(`verify-launch ${stamp} base=${base}`);

for (const path of pages) {
  const page = await read(path);
  console.log(`GET ${page.url} -> ${page.status} ${page.text.length}b`);
  if (page.status !== 200) {
    throw new Error(`${path} returned ${page.status}`);
  }
  requirePhrases(path, page.text);
  if (!page.text.includes('name="email"') && !page.text.includes('type="email"')) {
    throw new Error(`${path} has no email signup control`);
  }
  const lower = page.text.toLowerCase();
  if (lower.includes("github.com") || lower.includes("view source") || lower.includes("fork it")) {
    throw new Error(`${path} still markets GitHub or forking`);
  }
}

const sitemap = await read("/sitemap.xml");
console.log(`GET ${sitemap.url} -> ${sitemap.status}`);
if (sitemap.status !== 200) {
  throw new Error(`sitemap returned ${sitemap.status}`);
}
if (!sitemap.text.includes("https://bigfatboard.com/")) {
  throw new Error("sitemap missing home");
}

const llms = await read("/llms.txt");
console.log(`GET ${llms.url} -> ${llms.status}`);
if (llms.status !== 200) {
  throw new Error(`llms.txt returned ${llms.status}`);
}
if (!llms.text.startsWith("# ")) {
  throw new Error("llms.txt missing H1");
}
if (!llms.text.includes("\n> ")) {
  throw new Error("llms.txt missing blockquote");
}
if (!llms.text.includes("/")) {
  throw new Error("llms.txt missing home");
}

const robots = await read("/robots.txt");
console.log(`GET ${robots.url} -> ${robots.status}`);
if (!robots.text.includes("Sitemap:")) {
  throw new Error("robots.txt missing sitemap");
}

const validEmail = `launch-${Date.now()}@example.com`;
const accepted = await read("/api/signup", {
  method: "POST",
  headers: { "content-type": "application/json", accept: "application/json" },
  body: JSON.stringify({ email: validEmail }),
});
console.log(`POST valid ${accepted.status} ${accepted.text}`);
if (accepted.status < 200 || accepted.status > 299) {
  throw new Error(`valid signup rejected: ${accepted.status} ${accepted.text}`);
}
const acceptedBody = JSON.parse(accepted.text);
if (!acceptedBody.ok) {
  throw new Error(`valid signup body not ok: ${accepted.text}`);
}

const rejected = await read("/api/signup", {
  method: "POST",
  headers: { "content-type": "application/json", accept: "application/json" },
  body: JSON.stringify({ email: "not-an-email" }),
});
console.log(`POST invalid ${rejected.status} ${rejected.text}`);
if (rejected.status < 400 || rejected.status > 499) {
  throw new Error(`invalid signup not rejected: ${rejected.status} ${rejected.text}`);
}

console.log("verify-launch OK");
