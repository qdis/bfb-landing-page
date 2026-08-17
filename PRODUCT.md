# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Astro + `@astrojs/cloudflare` + Wrangler, chosen from the landing brief (Cloudflare Workers, Astro or similar) so the marketing origin matches the BFB control-plane host.

## Users

Inferred from `/Users/timo/work/tenira/bfb` and the landing brief: small technical teams (roughly three people, several Macs, several coding agents) who already run Claude Code, Codex, and Grok. They arrive to understand what Big Fat Board is and leave an email for launch. This file is the marketing surface, not the authenticated product.

## Product Purpose

Big Fat Board is an attention-first, provider-neutral board where humans and coding agents share work. This site is only the coming-soon landing: say the product exists, state the seed claims, and collect an email. Success is a visitor who can repeat the offer and join the list without a product tour.

## Positioning

Inferred: traditional team-management software is dead; Jira is dead. Big Fat Board is the first AI-native board for agents and humans to collaborate, with integrated time tracking, remote start of agents on your machine, and Grok, Codex, and Claude Code talking to each other to solve problems together. The sister architecture is explicit that v0.1 is not a Jira replacement and does not run agents in the cloud; this landing does not claim otherwise.

## Operating Context

Visitors meet the page from a link or an LLM citation. They compare it to Jira, Linear, and chat-thread agent workflows. They may read `/llms.txt` or `/sitemap.xml` before the HTML. Signup is stored by the Worker. No ESP, no blog, no docs, no pricing.

## Capabilities and Constraints

- Five visually distinct variants of one coming-soon page, plus SEO files.
- Email signup accepts a valid address and persists it; invalid addresses are rejected.
- No third-party newsletter, no production custom domain in this repo, no port of the BFB app.
- Copy is limited to the seed claims. No invented customers, benchmarks, or ship dates.

## Brand Commitments

Inferred from `apps/web/PRODUCT.md`: direct, irreverent, operational. Funny only when it stays clear. Binding anti-references: Jira-style workflow chrome; generic SaaS cards, glass, gradients, and soft shadows; terminal cosplay.

## Evidence on Hand

Read-only sister sources: `/Users/timo/work/tenira/bfb/README.md`, `ARCHITECTURE.md`, `apps/web/PRODUCT.md`, `apps/web/DESIGN.md`. No photography, logo lockup, or customer quotes exist for the marketing site. Generated atmosphere images on this landing are synthetic.

## Product Principles

1. One offer, one action: the claims plus an email field.
2. Do not invent product facts the sister repo does not support.
3. Variants change composition, not the contract.
4. Speak like a sharp teammate. No ceremony, no SaaS fog.

## Accessibility & Inclusion

WCAG 2.2 AA on the public pages: labeled fields, visible focus, useful errors, contrast, keyboard use, and reduced-motion support.
