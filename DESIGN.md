# Design System: Big Fat Board coming soon

This marketing surface ships five visual worlds over one copy contract. It is not the authenticated BFB work map. Sister product tokens (Schibsted, Azeret, crimson, daylight canvas) appear only in the Dispatch variant.

## Creative direction

A coming-soon page with one job: say the old software is dead, name the board, take an email. Each variant is a different physical object from that claim, not a theme swap.

| Variant | World | Type | Color | Layout |
| --- | --- | --- | --- | --- |
| Obit | Broadsheet death notice | Source Serif 4 + Source Sans 3 | Newsprint and ink, crimson stamp | Centered masthead, two columns, classified plate |
| Dispatch | Daylight dispatch floor | Schibsted Grotesk + Azeret Mono | Canvas, copper, crimson | Split hero, horizontal project lanes |
| Stencil | Warehouse safety field | Barlow Condensed + Barlow | Safety yellow and black | Stacked stencil type, black dock plate |
| Split | Indictment wall | Geist | Charcoal and bone, oxide accent | 58/42 split, charge sheet |
| Tape | Studio kraft board | Archivo + Figtree | Charcoal, kraft, orange tape | Board on wall, tape strips |
| Grid | Swiss International Style | Chivo | White, black, signal red | Modular poster, rival index |
| Chapter | Institutional manifesto | Manrope | Stone, ink, oxblood | Numbered chapters after Aleph Alpha |
| Notice | BFB Public Notice from `origin/design/landing-directions` | Archivo Black + Archivo | Paper, municipal ink, notice crimson | Declaration over an edge-attached project board |

Home `/` uses Obit. `/v/{slug}` serves each world.

## Color roles

One accent per world. No mid-page theme flip except Split, which is a single two-field composition.

- Obit: `#d9d2c3` field, `#1b1814` ink, `#7a1d1d` action
- Dispatch: `#f3eee6` field, `#221b16` ink, `#9a2b24` action
- Stencil: `#f0c400` field, `#111` ink, yellow-on-black plate
- Split: `#161616` / `#efece6`, `#b54a2d` action
- Tape: `#1c1916` studio, `#c9a56a` board, `#e25a12` tape
- Grid: `#f3f3f1` field, `#111` ink, `#d00000` signal
- Chapter: `#efece6` stone, `#1c1b19` ink, `#8a2a24` oxblood
- Notice: `oklch(0.985 0.005 70)` paper, `oklch(0.145 0.012 25)` ink, `oklch(0.464 0.169 26.9)` crimson

## Typography

Self-hosted via fontsource. No Inter. Display faces stay inside their world. Body measure stays short. Italic descenders keep extra leading on Split.

## Components

- Shared signup: label above field, hint under, status live region, 48px targets.
- Variant switch is a one-line nav, under 80px.
- Corners follow the world: 0 on Obit/Stencil/Tape, 4-8px on Dispatch, 2px on Split.

## Motion

CSS hover and active only. Reduced motion collapses transitions.

## Assets

Atmosphere photographs in `public/images/` are synthetic. Prompts are embedded in the JPEGs.

## Accessibility

WCAG 2.2 AA target. Focus rings, skip link, labeled email field, contrast against each field color.
