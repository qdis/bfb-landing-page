# Design System: Big Fat Board coming soon

One darkroom waitlist. Near-black canvas. Unbounded death lines. A live simulated board on the right. The page is theme-locked dark.

## Creative direction

A night operations room under one photographic safelight. Full-width death lines first. The scripted board is the next object. The only signup action is Get BFB.

**Dials:** variance 8, motion 6, density 5.

## Color

| Token | Value | Role |
| --- | --- | --- |
| Blackout | `oklch(0.035 0.01 26)` | page canvas |
| Chamber | `oklch(0.065 0.014 27)` | board and raised sections |
| Raised | `oklch(0.1 0.02 27)` | selected controls |
| Bone | `oklch(0.94 0.008 80)` | primary text |
| Smoke | `oklch(0.62 0.014 35)` | supporting text |
| Crimson | `oklch(0.66 0.29 23)` | neon action, slash, human gate |
| Safelight | `oklch(0.74 0.27 22)` | hover and death-line heat |
| Hairline | `oklch(0.18 0.02 27)` | structural rules |
| Oxblood | `oklch(0.07 0.09 26)` | committed field |

Crimson is scarce. It marks an action, a human gate, or hover. It does not decorate empty corners.

## Typography

Unbounded for display death lines. Anybody for body. Azeret Mono for checkout, clocks, and measured labels. No Inter. Display tracking sits at `-0.045em`. Body measure stays near 62ch.

## Shape

Controls are 4px. The outer plane is 8px. No pills.

## Components

- Sticky 64px masthead: BFB, Coming soon, Demo, Product, Why BFB. No signup in the header.
- Hero: slashed death lines, loud neon signup, Watch the demo.
- Demo: smaller carded preview of the scripted board.
- Close: get on the BIG FAT BOARD plus the same loud signup.
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
