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
    "Big Fat Board is the first AI-native board for agents and humans to collaborate. Coming soon. Traditional team management software is dead. Jira is dead. Linear, Asana, Monday, ClickUp, Azure Boards, YouTrack, Shortcut, Trello, and Notion boards are the same status-column machine.",
  claims: {
    traditionalDead: "Traditional team management software is dead.",
    jiraDead: "Jira is dead.",
    aiNative:
      "Big Fat Board is the first AI-native board for agents and humans to collaborate.",
    timeTracking: "Integrated time tracking is part of the work, not a timesheet bolted on later.",
    remoteStart: "Start agents remotely on your machine.",
    trio: "Grok, Codex, and Claude Code talk to each other to solve problems together.",
  },
  rivals: {
    heading: "Same machine, different skin",
    line: "Jira is dead. Linear, Asana, Monday, ClickUp, Azure Boards, YouTrack, Shortcut, Trello, and Notion boards are the same status-column machine.",
    names: [
      "Jira",
      "Linear",
      "Asana",
      "Monday",
      "ClickUp",
      "Azure Boards",
      "YouTrack",
      "Shortcut",
      "Trello",
      "Notion",
    ],
  },
  loop: {
    heading: "The loop",
    steps: [
      "A human creates or promotes a task.",
      "They pick an agent profile and an enrolled Mac, then press Start.",
      "That Mac opens Claude Code, Codex, or Grok in the exact registered checkout.",
      "Questions land in a cross-project attention inbox instead of a buried terminal.",
      "Plans, diffs, previews, and evidence are reviewed as immutable artifacts.",
      "The agent submits a result. A human decides whether the work is done.",
    ],
  },
  boundary:
    "Cloudflare coordinates. Enrolled Macs execute. The cloud never receives a local provider credential and never sends a shell command. Agents do not run on BFB compute.",
  scale: "Built for a small technical team: a few people, several repos, named agent profiles, more than one Mac.",
  features: [
    {
      title: "Attention first",
      body: "The home screen is what needs a person now. Inventory and status columns wait.",
    },
    {
      title: "Project lanes",
      body: "Horizontal lanes are projects. They never become workflow-state columns.",
    },
    {
      title: "Remote start",
      body: "Start agents remotely on your machine, in the exact registered checkout.",
    },
    {
      title: "Three providers",
      body: "Grok, Codex, and Claude Code talk to each other to solve problems together, on the same task and context contracts.",
    },
    {
      title: "Cloud coordinates",
      body: "The board lives on Cloudflare. The Mac does the work. No stolen tokens. No remote shell.",
    },
    {
      title: "Time with provenance",
      body: "Integrated time tracking: human minutes, agent active time, attention wait, and tokens, each labeled for how it was measured.",
    },
    {
      title: "Immutable review",
      body: "Plans, diffs, previews, and evidence are versioned artifacts. Approval binds a hash, not a filename.",
    },
    {
      title: "GitHub as evidence",
      body: "Pushes, pull requests, and checks attach as facts. BFB tasks stay canonical. No issue-sync theatre.",
    },
    {
      title: "MCP both ways",
      body: "Local run-scoped MCP for the agent on the Mac. Remote OAuth MCP for tools that must speak from outside.",
    },
    {
      title: "Same repo, two homes",
      body: "Managed BFB Cloud, or self-host into your own Cloudflare account from the same repository.",
    },
  ],
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

export type VariantSlug =
  | "obit"
  | "dispatch"
  | "stencil"
  | "split"
  | "tape"
  | "grid"
  | "chapter"
  | "notice"
  | "redline"
  | "sector"
  | "workmap"
  | "ledger";

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
    title: "Obit",
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
  {
    slug: "grid",
    path: "/v/grid",
    title: "Grid",
    layout: "swiss-modular-poster",
    type: "chivo-helvetica-grid",
    color: "white-black-signal-red",
    themeColor: "#f3f3f1",
    ogImage: "/images/og-grid.jpg",
  },
  {
    slug: "chapter",
    path: "/v/chapter",
    title: "Chapter",
    layout: "institutional-numbered-chapters",
    type: "manrope-sovereign-editorial",
    color: "stone-ink-oxblood",
    themeColor: "#efece6",
    ogImage: "/images/og-chapter.jpg",
  },
  {
    slug: "notice",
    path: "/v/notice",
    title: "Notice",
    layout: "public-notice-attached-board",
    type: "archivo-black-municipal",
    color: "paper-ink-notice-crimson",
    themeColor: "#f7f4ef",
    ogImage: "/images/og-notice.png",
  },
  {
    slug: "redline",
    path: "/v/redline",
    title: "Redline",
    layout: "night-ops-attached-board",
    type: "geologica-control-room",
    color: "near-black-oxblood-safelight",
    themeColor: "#120e0e",
    ogImage: "/images/og-redline.png",
  },
  {
    slug: "sector",
    path: "/v/sector",
    title: "Sector",
    layout: "crimson-switcher-stage",
    type: "anybody-onest-broadcast",
    color: "committed-crimson-chalk",
    themeColor: "#7a2420",
    ogImage: "/images/og-sector.png",
  },
  {
    slug: "workmap",
    path: "/v/workmap",
    title: "Workmap",
    layout: "daylight-dispatch-board",
    type: "schibsted-work-map",
    color: "canvas-ink-crimson",
    themeColor: "#f6f3ee",
    ogImage: "/images/og-workmap.png",
  },
  {
    slug: "ledger",
    path: "/v/ledger",
    title: "Ledger",
    layout: "proof-split-ledger",
    type: "archivo-machine-ledger",
    color: "paper-ink-acceptance-crimson",
    themeColor: "#f4f2ef",
    ogImage: "/images/og-ledger.png",
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
    COPY.rivals.line,
    COPY.rivals.names.join(" "),
    COPY.boundary,
    COPY.scale,
    ...COPY.loop.steps,
    ...COPY.features.map((feature) => `${feature.title} ${feature.body}`),
    COPY.signup.label,
    COPY.signup.hint,
    COPY.signup.cta,
  ].join("\n");
}

export function missingRequiredPhrases(text: string): string[] {
  const haystack = text.toLowerCase();
  return REQUIRED_PHRASES.filter((phrase) => !haystack.includes(phrase.toLowerCase()));
}
