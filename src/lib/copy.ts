// ABOUTME: Single source of landing copy, required claim phrases, and public URLs.
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
  tagline: "The board where agents and humans actually work.",
  description:
    "Big Fat Board is the first AI-native board for agents and humans to collaborate. Coming soon. Traditional team management software is dead. Jira is dead. Start agents remotely on your machine. Integrated time tracking. Grok, Codex, and Claude Code talk to each other to solve problems together.",
  hero: {
    display: "THE TICKET ERA IS OVER.",
    sub: "Launch Claude, Codex, or Grok in the exact checkout. Watch work, attention, and evidence move live.",
    cta: "Get BFB",
  },
  nav: {
    product: "Product",
    how: "How it works",
    cta: "Get BFB",
  },
  what: {
    headline: "You already run the agents. You still cannot see the work.",
    lead: "Big Fat Board is the first AI-native board for agents and humans to collaborate.",
    body: "Start Claude, Codex, or Grok on an enrolled Mac, in the checkout you approved. The board shows who is working, what they are doing, and the moment a person has to decide. Evidence stays attached to the work.",
  },
  solves: {
    headline: "Traditional team management software is dead.",
    jira: "Jira is dead.",
    body: "Linear, Asana, Monday, ClickUp, Azure Boards, YouTrack, Shortcut, Trello, and Notion still organize status. Agents do not file tickets. They work, they stall, they wait for a human who never saw the question.",
    punch: "The ticket says in progress. BFB says Claude needs you.",
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
  promises: {
    headline: "What the board actually does",
    items: [
      {
        title: "Start on your machine",
        body: "Start agents remotely on your machine. The provider opens in the exact registered checkout. Cloudflare coordinates. Your Mac executes. Credentials stay local.",
      },
      {
        title: "Three agents, one task",
        body: "Grok, Codex, and Claude Code talk to each other to solve problems together. Same task. Same context. Named actors, not a blended assistant.",
      },
      {
        title: "Time with a source",
        body: "Integrated time tracking is part of the work, not a timesheet bolted on later. Human minutes, agent active time, attention wait, and tokens, each labeled for how it was measured.",
      },
      {
        title: "Attention that explains itself",
        body: "The first question is what needs you now. Every request says why you, and whether another agent can take it.",
      },
      {
        title: "Review that binds",
        body: "Plans, diffs, previews, and evidence are versioned artifacts. Approval binds a hash, not a filename.",
      },
    ],
    measures: ["Human time", "Agent time", "Wait", "Tokens"],
    providers: ["Claude", "Codex", "Grok"],
  },
  loop: {
    headline: "The work, start to finish",
    steps: [
      { title: "Create", body: "A human names the work and the outcome." },
      { title: "Start", body: "Pick Claude, Codex, or Grok and the exact checkout." },
      { title: "Watch", body: "State, attention, and evidence move live." },
      { title: "Answer", body: "You only see what actually needs a person." },
      { title: "Accept", body: "A human decides whether the work is done." },
    ],
  },
  close: {
    headline: "Get a seat on the board.",
    body: "Coming soon. Leave a work email. We write once, when the board opens.",
  },
  claims: {
    traditionalDead: "Traditional team management software is dead.",
    jiraDead: "Jira is dead.",
    aiNative:
      "Big Fat Board is the first AI-native board for agents and humans to collaborate.",
    timeTracking:
      "Integrated time tracking is part of the work, not a timesheet bolted on later.",
    remoteStart: "Start agents remotely on your machine.",
    trio: "Grok, Codex, and Claude Code talk to each other to solve problems together.",
  },
  signup: {
    label: "Work email",
    hint: "One note when the board opens. No drip.",
    cta: "Get BFB",
    sending: "Saving your seat.",
    success: "You are on the list. We will write when the board opens.",
    duplicate: "You are already on the list.",
    invalid: "That does not look like an email address.",
    missing: "Email is required.",
    network: "Network failed. Try again.",
  },
  plane: {
    label:
      "Sample BFB board: a human gate, a live Claude Code run, a committed review, and a session start for Claude, Codex, or Grok.",
  },
} as const;

export const OG_IMAGE = "/images/og.png";
export const THEME_COLOR = "#161010";

export function publicPages(): { path: string; title: string; summary: string }[] {
  return [
    {
      path: "/",
      title: `${SITE_NAME} - Coming soon`,
      summary: COPY.description,
    },
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
    COPY.hero.display,
    COPY.hero.sub,
    COPY.what.headline,
    COPY.what.lead,
    COPY.what.body,
    COPY.solves.headline,
    COPY.solves.jira,
    COPY.solves.body,
    COPY.solves.punch,
    COPY.solves.names.join(" "),
    COPY.promises.headline,
    ...COPY.promises.items.map((item) => `${item.title} ${item.body}`),
    COPY.loop.headline,
    ...COPY.loop.steps.map((step) => `${step.title} ${step.body}`),
    COPY.close.headline,
    COPY.close.body,
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
