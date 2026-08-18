// ABOUTME: Client simulation for the hero board: live agent work and handoffs.
// ABOUTME: Updates real component state. Not a decorative CSS animation.

export type Provider = "Claude" | "Codex" | "Grok";

type Activity = "working" | "reviewing" | "waiting";

type Lane = {
  provider: Provider;
  title: string;
  checkout: string;
  seconds: number;
  activity: Activity;
};

type Attention = {
  title: string;
  why: string;
};

type Handoff = {
  from: Provider;
  to: Provider;
  title: string;
};

type Delivered = {
  title: string;
  by: string;
  secondsAgo: number;
};

export type BoardState = {
  attention: Attention | null;
  lanes: Lane[];
  handoff: Handoff | null;
  delivered: Delivered;
  active: Provider;
};

const TASKS = [
  "Approve runner wake on Timo's Mac Studio",
  "Replay live events after reconnect",
  "Block launch when checkout is occupied",
  "Compare review policy across providers",
  "Draft reconnect plan",
  "Run checkout lease tests",
  "Review artifact v3",
  "Sanitize hook journal gaps",
  "Pass failing checks to Grok",
];

const CHECKOUTS = [
  "bfb / Mac Studio / main@76ab1f9",
  "bfb / Core / feat/handoff@3c91aa2",
  "bfb / Cloud / fix/replay@a18e04c",
];

const PROVIDERS: Provider[] = ["Claude", "Codex", "Grok"];

function pick<T>(items: T[], avoid?: T): T {
  const pool = avoid === undefined ? items : items.filter((item) => item !== avoid);
  return pool[Math.floor(Math.random() * pool.length)] ?? items[0];
}

function otherProvider(current: Provider): Provider {
  return pick(PROVIDERS, current);
}

export function initialBoard(): BoardState {
  return {
    attention: {
      title: "Approve runner wake on Timo's Mac Studio",
      why: "You own this runner",
    },
    lanes: [
      {
        provider: "Claude",
        title: "Replay live events after reconnect",
        checkout: CHECKOUTS[0],
        seconds: 247,
        activity: "working",
      },
      {
        provider: "Codex",
        title: "Run checkout lease tests",
        checkout: CHECKOUTS[1],
        seconds: 94,
        activity: "reviewing",
      },
      {
        provider: "Grok",
        title: "Draft reconnect plan",
        checkout: CHECKOUTS[2],
        seconds: 38,
        activity: "working",
      },
    ],
    handoff: {
      from: "Claude",
      to: "Codex",
      title: "Compare review policy across providers",
    },
    delivered: {
      title: "Timo accepted artifact v3",
      by: "human",
      secondsAgo: 1240,
    },
    active: "Claude",
  };
}

function formatClock(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatAgo(total: number): string {
  if (total < 60) {
    return `${total}s ago`;
  }
  const minutes = Math.floor(total / 60);
  return `${minutes}m ago`;
}

function setText(root: HTMLElement, key: string, value: string) {
  const node = root.querySelector(`[data-${key}]`);
  if (node) {
    node.textContent = value;
  }
}

function setHidden(root: HTMLElement, key: string, hidden: boolean) {
  const node = root.querySelector(`[data-${key}]`);
  if (node instanceof HTMLElement) {
    node.hidden = hidden;
  }
}

function paint(root: HTMLElement, state: BoardState) {
  const working = state.lanes.filter((lane) => lane.activity === "working").length;
  const need = state.attention ? 1 : 0;
  setText(root, "stat-agents", String(working + (state.handoff ? 1 : 0)));
  setText(root, "stat-need", String(need));
  setText(root, "stat-handoff", state.handoff ? "1" : "0");

  setHidden(root, "attention-row", !state.attention);
  if (state.attention) {
    setText(root, "attention-title", state.attention.title);
    setText(root, "attention-why", state.attention.why);
  }

  state.lanes.forEach((lane, index) => {
    const bind = (field: string, value: string) => {
      const node = root.querySelector(`[data-lane-${field}="${index}"]`);
      if (node) {
        node.textContent = value;
      }
    };
    bind("provider", lane.provider);
    bind("activity", lane.activity);
    bind("title", lane.title);
    bind("checkout", lane.checkout);
    bind("clock", formatClock(lane.seconds));
  });

  setHidden(root, "handoff-row", !state.handoff);
  if (state.handoff) {
    setText(
      root,
      "handoff-line",
      `${state.handoff.from} passed this to ${state.handoff.to}`,
    );
    setText(root, "handoff-title", state.handoff.title);
  }

  setText(root, "delivered-title", state.delivered.title);
  setText(root, "delivered-ago", formatAgo(state.delivered.secondsAgo));

  for (const provider of PROVIDERS) {
    const chip = root.querySelector(`[data-start-provider="${provider}"]`);
    chip?.classList.toggle("on", state.active === provider);
  }
}

function tickClocks(state: BoardState) {
  for (const lane of state.lanes) {
    if (lane.activity === "working" || lane.activity === "reviewing") {
      lane.seconds += 1;
    }
  }
  state.delivered.secondsAgo += 1;
}

function step(state: BoardState): BoardState {
  const roll = Math.random();
  if (roll < 0.22) {
    const lane = pick(state.lanes);
    const from = lane.provider;
    const to = otherProvider(from);
    const title = lane.title;
    lane.provider = to;
    lane.activity = "working";
    lane.seconds = Math.floor(Math.random() * 18);
    lane.title = pick(TASKS, title);
    lane.checkout = pick(CHECKOUTS);
    state.handoff = { from, to, title };
    state.active = to;
    return state;
  }
  if (roll < 0.4) {
    state.attention = {
      title: pick(TASKS, state.attention?.title),
      why: pick(["You own this runner", "Policy needs a human", "Checkout is occupied"]),
    };
    return state;
  }
  if (roll < 0.52) {
    state.attention = null;
    return state;
  }
  if (roll < 0.7) {
    const lane = pick(state.lanes);
    lane.activity = pick(["working", "reviewing", "waiting"], lane.activity);
    if (lane.activity === "working") {
      lane.title = pick(TASKS, lane.title);
    }
    return state;
  }
  if (roll < 0.85) {
    const lane = pick(state.lanes);
    state.delivered = {
      title: `${pick(["Timo", "Ada", "Nico"])} accepted ${lane.title.toLowerCase()}`,
      by: "human",
      secondsAgo: 8 + Math.floor(Math.random() * 40),
    };
    return state;
  }
  state.active = pick(PROVIDERS, state.active);
  return state;
}

export function mountBoard(root: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let state = initialBoard();
  paint(root, state);

  const start = (provider: Provider) => {
    state.active = provider;
    const lane = state.lanes[0];
    lane.provider = provider;
    lane.activity = "working";
    lane.seconds = 0;
    lane.title = pick(TASKS, lane.title);
    paint(root, state);
  };

  const onClick = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const providerButton = target.closest("[data-start-provider]");
    if (providerButton instanceof HTMLElement) {
      const name = providerButton.dataset.startProvider;
      if (name === "Claude" || name === "Codex" || name === "Grok") {
        start(name);
      }
      return;
    }
    if (target.closest("[data-clear-attention]")) {
      if (state.attention) {
        const title = state.attention.title;
        state.attention = null;
        state.lanes[0] = {
          provider: state.active,
          title,
          checkout: pick(CHECKOUTS),
          seconds: 0,
          activity: "working",
        };
        paint(root, state);
      }
    }
  };

  root.addEventListener("click", onClick);

  if (reduce) {
    return () => root.removeEventListener("click", onClick);
  }

  const clocks = window.setInterval(() => {
    tickClocks(state);
    paint(root, state);
  }, 1000);

  const events = window.setInterval(() => {
    state = step(state);
    paint(root, state);
  }, 2400);

  return () => {
    window.clearInterval(clocks);
    window.clearInterval(events);
    root.removeEventListener("click", onClick);
  };
}
