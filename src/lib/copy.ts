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
  tagline: "The control plane for AI-first companies.",
  description:
    "Jira is dead. Scrum is dead. Traditional team management software is dead. Big Fat Board is the first AI-native board for agents and humans to collaborate. Coming soon. Start agents remotely on your machine. Integrated time tracking. Grok, Codex, and Claude Code talk to each other to solve problems together.",
  hero: {
    line1: "JIRA IS DEAD.",
    line2: "SCRUM IS DEAD.",
    line3: "AI-FIRST COMPANIES NEED A CONTROL PLANE.",
    sub: "No dailies. No story points. No shirt sizes. Agents and humans on one board.",
    cta: "Get BFB",
  },
  nav: {
    product: "Product",
    how: "Why BFB",
    cta: "Get BFB",
  },
  what: {
    headline: "Built for people running agents, not filing tickets.",
    lead: "Big Fat Board is the first AI-native board for agents and humans to collaborate. It is for AI-first companies. There is no time for dailies, story points, or t-shirt sizes.",
    body: "Agents hand work to other agents, including cross-handoff between Claude, Codex, and Grok. We track human attention, human interventions, and delivered results. Integrated time tracking is part of the work. Start agents remotely on your machine.",
  },
  solves: {
    headline: "Jira is dead. Scrum is dead.",
    jira: "Traditional team management software is dead.",
    body: "Linear, Asana, Monday, ClickUp, Azure Boards, YouTrack, Shortcut, Trello, and Notion still organize status. Claude Code remote and Codex remote keep you inside one vendor. Agents do not file tickets. They work, they stall, they wait for a human who never saw the question.",
    punch: "If you still estimate t-shirt sizes, this is not for you.",
    names: [
      "Jira",
      "Scrum",
      "Standups",
      "Story points",
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
  different: {
    headline: "Not another remote for one model.",
    body: "Claude Code remote and Codex remote are still one provider, one session, one silo. BFB is the handoff layer for hybrid teams and for people who use every agent they can get. Grok, Codex, and Claude Code talk to each other to solve problems together. We sync, schedule, and route work between people and AIs.",
  },
  promises: {
    headline: "On your machine. Across every agent.",
    items: [
      {
        title: "Your Mac executes",
        body: "Start agents remotely on your machine, in the exact checkout you approved. We coordinate. We never run the model in our cloud.",
      },
      {
        title: "Cross-provider handoff",
        body: "Grok, Codex, and Claude Code talk to each other to solve problems together. Same task. Named actors. Not a blended assistant.",
      },
      {
        title: "Attention is the metric",
        body: "Integrated time tracking labels human minutes, agent time, wait, and interventions. The first question is what needs you now.",
      },
      {
        title: "Five projects. Fifty agents.",
        body: "BFB is not for legacy teams. It is for people on several projects, a pile of live tasks, and a swarm of agents who need one board.",
      },
      {
        title: "No provider keys",
        body: "Keep your existing Claude, Codex, and Grok subscriptions. We never take API keys or provider tokens. MCP and the CLI move work. Confidential data stays on the device.",
      },
    ],
    measures: ["Human attention", "Interventions", "Agent time", "Delivered"],
    providers: ["Claude", "Codex", "Grok"],
  },
  loop: {
    headline: "The board is free. The work stays local.",
    steps: [
      { title: "Coordinate", body: "The cloud board routes work. It does not see your secrets." },
      { title: "Execute", body: "Enrolled Macs run Claude, Codex, or Grok on device." },
      { title: "Handoff", body: "One agent passes the same task to another provider." },
      { title: "Interrupt", body: "A human only sees what actually needs a person." },
      { title: "Keep it", body: "Use our board or host your own. Always free. Open source." },
    ],
  },
  close: {
    headline: "Get on the board.",
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
      "Live sample BFB board. Agents start work, hand tasks across Claude, Codex, and Grok, and raise human attention.",
  },
} as const;

export const OG_IMAGE = "/images/og.png";
export const THEME_COLOR = "#0a0808";

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
    COPY.hero.line1,
    COPY.hero.line2,
    COPY.hero.line3,
    COPY.hero.sub,
    COPY.what.headline,
    COPY.what.lead,
    COPY.what.body,
    COPY.solves.headline,
    COPY.solves.jira,
    COPY.solves.body,
    COPY.solves.punch,
    COPY.solves.names.join(" "),
    COPY.different.headline,
    COPY.different.body,
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
