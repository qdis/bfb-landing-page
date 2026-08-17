// ABOUTME: Single source of landing copy, required claim phrases, and variant inventory.
// ABOUTME: Pages, SEO files, and tests all read this module so claims cannot drift.

export const SITE_NAME = "Big Fat Board";
export const SITE_DEFAULT_URL = "https://bigfatboard.com";

export const REQUIRED_PHRASES = [
  "Coming soon",
  "Traditional team management software is dead",
  "Jira is dead",
  "first AI-native board for agents and humans to collaborate",
  "integrated time tracking",
  "start agents remotely on your machine",
  "Grok, Codex, and Claude Code talk to each other to solve problems together",
] as const;

export const COPY = {
  comingSoon: "Coming soon",
  name: SITE_NAME,
  shortName: "BFB",
  tagline: "The board for agents and humans.",
  description:
    "Big Fat Board is the first AI-native board for agents and humans to collaborate. Coming soon. Traditional team management software is dead. Jira is dead.",
  claims: {
    traditionalDead: "Traditional team management software is dead.",
    jiraDead: "Jira is dead.",
    aiNative:
      "Big Fat Board is the first AI-native board for agents and humans to collaborate.",
    timeTracking: "Integrated time tracking is part of the work, not a timesheet bolted on later.",
    remoteStart: "Start agents remotely on your machine.",
    trio: "Grok, Codex, and Claude Code talk to each other to solve problems together.",
  },
  signup: {
    label: "Work email",
    hint: "One note when the board opens. No drip. No deck.",
    cta: "Get a seat",
    sending: "Saving your seat.",
    success: "You are on the list. We will write when the board opens.",
    duplicate: "You are already on the list.",
    invalid: "That does not look like an email address.",
    missing: "Email is required.",
    network: "Network failed. Try again.",
  },
} as const;

export type VariantSlug = "obit" | "dispatch" | "stencil" | "split" | "tape";

export type Variant = {
  slug: VariantSlug;
  path: string;
  title: string;
  layout: string;
  type: string;
  color: string;
  themeColor: string;
  ogImage: string;
};

export const DEFAULT_VARIANT: VariantSlug = "obit";

export const VARIANTS: readonly Variant[] = [
  {
    slug: "obit",
    path: "/v/obit",
    title: "Obituary",
    layout: "broadsheet-death-notice",
    type: "source-serif-newsprint",
    color: "newsprint-ink-crimson-stamp",
    themeColor: "#d9d2c3",
    ogImage: "/images/og-obit.jpg",
  },
  {
    slug: "dispatch",
    path: "/v/dispatch",
    title: "Dispatch",
    layout: "horizontal-project-lanes",
    type: "schibsted-azeret-dispatch",
    color: "daylight-canvas-crimson",
    themeColor: "#f4f1ea",
    ogImage: "/images/og-dispatch.jpg",
  },
  {
    slug: "stencil",
    path: "/v/stencil",
    title: "Stencil",
    layout: "warehouse-safety-field",
    type: "barlow-condensed-stencil",
    color: "safety-yellow-black",
    themeColor: "#f0c400",
    ogImage: "/images/og-stencil.jpg",
  },
  {
    slug: "split",
    path: "/v/split",
    title: "Split",
    layout: "asymmetric-indictment-split",
    type: "geist-indictment",
    color: "charcoal-bone-oxide",
    themeColor: "#161616",
    ogImage: "/images/og-split.jpg",
  },
  {
    slug: "tape",
    path: "/v/tape",
    title: "Tape",
    layout: "physical-kraft-board",
    type: "archivo-figtree-studio",
    color: "charcoal-kraft-orange-tape",
    themeColor: "#1c1916",
    ogImage: "/images/og-tape.jpg",
  },
] as const;

export function variantBySlug(slug: string | undefined): Variant | undefined {
  return VARIANTS.find((variant) => variant.slug === slug);
}

export function publicPages(): { path: string; title: string; summary: string }[] {
  return [
    {
      path: "/",
      title: `${SITE_NAME} - Coming soon`,
      summary: COPY.description,
    },
    ...VARIANTS.map((variant) => ({
      path: variant.path,
      title: `${SITE_NAME} - ${variant.title}`,
      summary: COPY.description,
    })),
  ];
}

export function publicPagePaths(): string[] {
  return publicPages().map((page) => page.path);
}

export function visibleCopyText(): string {
  return [
    COPY.comingSoon,
    COPY.name,
    COPY.tagline,
    COPY.description,
    COPY.claims.traditionalDead,
    COPY.claims.jiraDead,
    COPY.claims.aiNative,
    COPY.claims.timeTracking,
    COPY.claims.remoteStart,
    COPY.claims.trio,
    COPY.signup.label,
    COPY.signup.hint,
    COPY.signup.cta,
  ].join("\n");
}

export function missingRequiredPhrases(text: string): string[] {
  const haystack = text.toLowerCase();
  return REQUIRED_PHRASES.filter((phrase) => !haystack.includes(phrase.toLowerCase()));
}
