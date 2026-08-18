// ABOUTME: Scripted BFB board demo: Claude asks, Timo answers, Codex reviews.
// ABOUTME: Beats are predetermined. Clicks inspect, answer, pause, and unlock extras.

export type Actor = "Timo" | "Adina" | "Claude" | "Codex" | "Grok";
export type Activity =
  | "working"
  | "needs_human"
  | "reviewing"
  | "handoff"
  | "accepted"
  | "waiting";

export type Card = {
  id: string;
  project: "BFB CORE" | "BFB MAC" | "BFB CLOUD";
  pack: string;
  title: string;
  owner: Actor;
  previous: Actor | null;
  kind: "agent" | "human";
  activity: Activity;
  now: string;
  checkout: string;
  seconds: number;
  humanSeconds: number;
  agentSeconds: number;
};

export type LogLine = {
  actor: Actor;
  text: string;
};

export type Thread = {
  from: Actor;
  to: Actor;
  question: string;
  answer: string | null;
  typing: boolean;
};

export type PresenceMode =
  | "idle"
  | "needed"
  | "answering"
  | "working"
  | "waiting"
  | "reviewing"
  | "handoff";

export type Presence = {
  actor: Actor;
  mode: PresenceMode;
};

export type Attention = {
  kind: "needed" | "answering";
  from: Actor;
  to: Actor;
  pack: string;
  title: string;
  why: string;
};

export const PROJECTS = ["BFB CORE", "BFB MAC", "BFB CLOUD"] as const;

export const BEATS = [
  { id: "live", label: "Board is live" },
  { id: "wait", label: "Claude waits" },
  { id: "answer", label: "Timo answers" },
  { id: "handoff", label: "Handoff" },
  { id: "ship", label: "Adina ships" },
] as const;

export const BEAT_HINTS = [
  "Everyone is working. Click a card. Live keeps moving.",
  "Claude asked Timo. Answer as Timo, or wait.",
  "Timo is committing the bootstrap policy live.",
  "Same task. Same hash. Codex has the review.",
  "Adina accepted the CLI. Grok is on second read.",
] as const;

export const QUESTION =
  "A01 local MCP: which tools may the run see before the trusted session binds?";

export const TIMO_ANSWER =
  "Read-only bootstrap only. get_context. No mutations. No shell.";

export const WRONG_ANSWER = "Give it the full CLI.";

export type DemoState = {
  beat: number;
  cards: Card[];
  selected: string | null;
  thread: Thread | null;
  log: LogLine[];
  toast: string | null;
  live: boolean;
  waiting: boolean;
  typed: string;
  egg: "none" | "runner";
};

function card(
  partial: Omit<Card, "seconds" | "previous" | "humanSeconds" | "agentSeconds"> & {
    seconds?: number;
    previous?: Actor | null;
    humanSeconds?: number;
    agentSeconds?: number;
  },
): Card {
  const seconds = partial.seconds ?? 40;
  return {
    seconds,
    previous: partial.previous ?? null,
    humanSeconds: partial.kind === "human" ? seconds : 0,
    agentSeconds: partial.kind === "agent" ? seconds : 0,
    ...partial,
  };
}

export function snapshot(beat: number, egg: DemoState["egg"] = "none"): DemoState {
  const answered = beat >= 2;
  const handed = beat >= 3;
  const shipped = beat >= 4;

  const a01: Card = card({
    id: "a01",
    project: "BFB CORE",
    pack: "A01",
    title: "Local MCP context",
    owner: handed ? "Codex" : "Claude",
    previous: handed ? "Claude" : null,
    kind: "agent",
    activity: handed ? (shipped ? "reviewing" : "handoff") : beat === 1 ? "needs_human" : "working",
    now: handed
      ? shipped
        ? "Codex is reviewing the MCP contract. Grok is on second read."
        : "Claude handed the MCP review to Codex. Same hash."
      : beat === 1
        ? "Claude called request_human. Waiting on Timo."
        : beat >= 2
          ? "Claude resumed with Timo's bootstrap policy."
          : "Claude is wiring bfb mcp stdio. Read-only until the session binds.",
    checkout: "bfb / Mac Studio / main@76ab1f9",
    seconds: handed ? 26 : 188,
    humanSeconds: beat >= 2 ? 18 : 0,
    agentSeconds: handed ? 26 : 188,
  });

  const l01: Card = card({
    id: "l01",
    project: "BFB CORE",
    pack: "L01",
    title: "CLI kernel tests",
    owner: "Adina",
    kind: "human",
    activity: shipped ? "accepted" : "working",
    now: shipped
      ? "Adina accepted the CLI kernel. Tests are on the hash."
      : "Adina is running go test on the daemon kernel.",
    checkout: "bfb / Core / feat/cli@3c91aa2",
    seconds: 412,
    humanSeconds: 412,
    agentSeconds: 86,
  });

  const e02: Card = card({
    id: "e02",
    project: "BFB CLOUD",
    pack: "E02",
    title: "Browser realtime",
    owner: "Claude",
    kind: "agent",
    activity: handed ? "working" : "waiting",
    now: handed
      ? "Claude moved here after the handoff. Live events after reconnect."
      : "Queued. Claude is still on A01.",
    checkout: "bfb / Cloud / feat/mcp@a18e04c",
    seconds: handed ? 18 : 0,
  });

  const c05: Card = card({
    id: "c05",
    project: "BFB MAC",
    pack: "C05",
    title: "Device CLI credentials",
    owner: "Adina",
    kind: "human",
    activity: "working",
    now: "Adina is binding the human CLI to the enrolled Mac.",
    checkout: "bfb / Mac Studio / feat/cli@3c91aa2",
    seconds: 97,
  });

  const l02: Card = card({
    id: "l02",
    project: "BFB MAC",
    pack: "L02",
    title: "Checkout registry",
    owner: "Codex",
    kind: "agent",
    activity: beat >= 3 ? "waiting" : "reviewing",
    now:
      beat >= 3
        ? "L02 waits. Codex took the A01 review."
        : "Codex is checking exact-checkout occupancy.",
    checkout: "bfb / Mac Studio / main@76ab1f9",
    seconds: 64,
  });

  const x03a: Card = card({
    id: "x03a",
    project: "BFB CLOUD",
    pack: "X03A",
    title: "Remote MCP replay",
    owner: "Grok",
    kind: "agent",
    activity: beat >= 4 ? "reviewing" : "working",
    now:
      beat >= 4
        ? "Grok is the second reader on the MCP contract."
        : "Grok is replaying remote MCP events after reconnect.",
    checkout: "bfb / Cloud / feat/mcp@a18e04c",
    seconds: 51,
  });

  const runner: Card[] =
    egg === "runner"
      ? [
          card({
            id: "wake",
            project: "BFB MAC",
            pack: "L08",
            title: "Approve runner wake",
            owner: "Timo",
            kind: "human",
            activity: "needs_human",
            now: "You found the hidden runner. Claude cannot start until Timo wakes it.",
            checkout: "bfb / Mac Studio / main@76ab1f9",
            seconds: 4,
          }),
        ]
      : [];

  const log: LogLine[] = [{ actor: "Claude", text: "Opened A01. Binding stdio MCP." }];
  if (beat >= 1) {
    log.push({ actor: "Claude", text: "request_human: MCP bootstrap tools." });
  }
  if (beat >= 2) {
    log.push({ actor: "Timo", text: TIMO_ANSWER });
    log.push({ actor: "Claude", text: "Answer committed. Resuming A01." });
  }
  if (beat >= 3) {
    log.push({
      actor: "Claude",
      text: "Passed A01 review to Codex. Same task. Same hash.",
    });
    log.push({ actor: "Claude", text: "Picked up E02 browser realtime." });
  }
  if (beat >= 4) {
    log.push({ actor: "Codex", text: "Reviewing MCP contract. Grok is on second read." });
    log.push({ actor: "Adina", text: "Accepted L01 CLI kernel tests." });
  }
  if (egg === "runner") {
    log.push({ actor: "Timo", text: "Hidden runner wake is on the Mac lane." });
  }

  return {
    beat,
    cards: [a01, l01, e02, c05, l02, x03a, ...runner],
    selected: beat === 1 || beat === 2 ? "a01" : shipped ? "l01" : "a01",
    thread:
      beat >= 1
        ? {
            from: "Claude",
            to: "Timo",
            question: QUESTION,
            answer: answered ? TIMO_ANSWER : null,
            typing: false,
          }
        : null,
    log,
    toast: null,
    live: true,
    waiting: beat === 1,
    typed: answered ? TIMO_ANSWER : "",
    egg,
  };
}

export function presence(state: DemoState): Presence[] {
  const answering = state.beat === 2 && !state.thread?.answer;
  return [
    {
      actor: "Timo",
      mode: answering ? "answering" : state.beat === 1 ? "needed" : "idle",
    },
    { actor: "Adina", mode: "working" },
    {
      actor: "Claude",
      mode:
        state.beat === 1 ? "waiting" : state.beat === 3 ? "handoff" : "working",
    },
    {
      actor: "Codex",
      mode: state.beat >= 3 ? "reviewing" : "working",
    },
    {
      actor: "Grok",
      mode: state.beat >= 4 ? "reviewing" : "working",
    },
  ];
}

export function attention(state: DemoState): Attention | null {
  if (state.beat === 1) {
    return {
      kind: "needed",
      from: "Claude",
      to: "Timo",
      pack: "A01",
      title: "Claude is blocked on Timo.",
      why: "MCP bootstrap tools. You own the policy.",
    };
  }
  if (state.beat === 2 && !state.thread?.answer) {
    return {
      kind: "answering",
      from: "Claude",
      to: "Timo",
      pack: "A01",
      title: "Timo is answering Claude.",
      why: "Read-only bootstrap only.",
    };
  }
  return null;
}

export function cardsIn(state: DemoState, project: Card["project"]): Card[] {
  return state.cards.filter((item) => item.project === project);
}

export function formatClock(seconds: number): string {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const rest = Math.max(0, seconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export function boardSpend(cards: Card[]): { human: number; agent: number } {
  return cards.reduce(
    (sum, card) => {
      sum.human += card.humanSeconds;
      sum.agent += card.agentSeconds;
      return sum;
    },
    { human: 0, agent: 0 },
  );
}

export function tickWorkingCard(card: Card): void {
  if (card.activity !== "working" && card.activity !== "reviewing") {
    return;
  }
  card.seconds += 1;
  if (card.kind === "human") {
    card.humanSeconds += 1;
  } else {
    card.agentSeconds += 1;
  }
}

export function labelActivity(activity: Activity): string {
  return activity.replaceAll("_", " ");
}

export function dwellFor(beat: number): number {
  if (beat === 0) {
    return 3600;
  }
  if (beat === 1) {
    return 8000;
  }
  if (beat === 2) {
    return 5200;
  }
  return 4200;
}

export function nextBeat(beat: number): number {
  return beat >= BEATS.length - 1 ? BEATS.length - 1 : beat + 1;
}

export const INSPECT: Record<string, string> = {
  a01: "Local stdio MCP. One run. No cloud credential in the provider process.",
  l01: "Go daemon and human CLI. Adina owns the tests. A process exit is not done.",
  e02: "Browser live events after reconnect. Claude only moves here after the handoff.",
  c05: "Human CLI credentials on the enrolled Mac. Adina is binding them.",
  l02: "Exact checkout registry. Occupied means occupied. No silent branch switch.",
  x03a: "Remote MCP replay after reconnect. Grok is watching event gaps.",
  wake: "Hidden runner wake. You asked for it.",
};
