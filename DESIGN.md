# Design System: Big Fat Board coming soon

One darkroom waitlist. Near-black canvas. Unbounded death lines. A live simulated board on the right. The page is theme-locked dark.

## Creative direction

A night operations room under one photographic safelight. The product plane is the largest object. The only action is Get BFB.

**Dials:** variance 8, motion 6, density 5.

## Color

| Token | Value | Role |
| --- | --- | --- |
| Blackout | `oklch(0.08 0.006 26)` | page canvas |
| Chamber | `oklch(0.12 0.012 27)` | board and raised sections |
| Raised | `oklch(0.16 0.018 27)` | selected controls |
| Bone | `oklch(0.93 0.008 80)` | primary text |
| Smoke | `oklch(0.6 0.012 35)` | supporting text |
| Crimson | `oklch(0.42 0.155 26)` | action, human gate |
| Safelight | `oklch(0.58 0.175 27)` | hover and active |
| Hairline | `oklch(0.22 0.018 27)` | structural rules |
| Oxblood | `oklch(0.13 0.05 26)` | committed field |

Crimson is scarce. It marks an action, a human gate, or hover. It does not decorate empty corners.

## Typography

Unbounded for display death lines. Anybody for body. Azeret Mono for checkout, clocks, and measured labels. No Inter. Display tracking sits at `-0.045em`. Body measure stays near 62ch.

## Shape

Controls are 4px. The outer plane is 8px. No pills.

## Components

- Sticky 64px masthead: BFB, Coming soon, Product, How it works, Get BFB.
- Hero: two-line manifesto, one crimson button, perspective operational plane.
- Product: left stacked manifesto.
- Solves: type plus safelight still. Ticket machines as struck names.
- Promises: oxblood lead band plus a 2x2 operational surface.
- Loop: five verbs, not numbered stages.
- Close: oxblood field and the only email form.

## Motion

Hero exposure and rise. Working-row spinner. Button hover and press. Reduced motion collapses all of it.

## Assets

- `/images/og.png` is the official mockup.
- `/images/safelight-desk.jpg` is a synthetic night-ops still. Both carry embedded provenance.

## Accessibility

WCAG 2.2 AA target. Skip link, labeled email field, live status, visible focus, section scroll-margin under the sticky nav.
